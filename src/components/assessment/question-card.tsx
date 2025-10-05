/**
 * 单题卡片组件 - 展示单个问卷题目和选项
 * 提供清晰的交互界面和视觉反馈
 */

import React, {useState} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Label} from '@/components/ui/label';
import {Badge} from '@/components/ui/badge';
import {AlertCircle, SkipForward} from 'lucide-react';
import {Question, QuestionOption, Response} from '@/types';
import {ALL_SCALES} from '@/lib/scales';

interface QuestionCardProps {
  question: Question;
  currentResponse?: Response;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (response: Response) => void;
  onSkip?: () => void;
  allowSkip?: boolean;
}

export function QuestionCard({
  question,
  currentResponse,
  questionNumber,
  totalQuestions,
  onAnswer,
  onSkip,
  allowSkip = false
}: QuestionCardProps) {
  const [selectedValue, setSelectedValue] = useState<string>(
    currentResponse?.value.toString() || ''
  );
  const [showValidation, setShowValidation] = useState(false);

  // 获取量表信息
  const scale = ALL_SCALES[question.scale];
  const scaleName = scale?.name || question.scale;

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    setShowValidation(false);
    
    // 立即提交回答，但不自动跳转
    const response: Response = {
      questionId: question.id,
      value: parseInt(value),
      timestamp: new Date()
    };
    onAnswer(response);
  };

  const handleSkip = () => {
    if (question.required && !allowSkip) {
      setShowValidation(true);
      return;
    }
    onSkip?.();
  };

  const getOptionColorClass = (option: QuestionOption, isSelected: boolean) => {
    if (!isSelected) return 'hover:bg-muted/50';
    
    // 根据选项值设置不同颜色
    const value = option.value;
    if (value <= 2) return 'bg-green-100 border-green-300 text-green-800';
    if (value === 3) return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    return 'bg-red-100 border-red-300 text-red-800';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="sri-card shadow-lg">
        <CardContent className="p-8">
          {/* 题目头部信息 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-psychology-primary border-psychology-primary">
                {questionNumber} / {totalQuestions}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {scaleName}
              </Badge>
            </div>
            {question.required && (
              <Badge variant="destructive" className="text-xs">
                必答
              </Badge>
            )}
          </div>

          {/* 题目文本 */}
          <div className="mb-8">
            <h2 className="text-xl font-medium leading-relaxed text-foreground">
              {question.text}
            </h2>
            {question.description && (
              <p className="text-sm text-muted-foreground mt-2">
                {question.description}
              </p>
            )}
          </div>

          {/* 选项区域 */}
          <div className="space-y-4">
            <RadioGroup
              value={selectedValue}
              onValueChange={handleValueChange}
              className="space-y-3"
            >
              {question.options.map((option) => {
                const isSelected = selectedValue === option.value.toString();
                const colorClass = getOptionColorClass(option, isSelected);
                
                return (
                  <div 
                    key={option.value} 
                    className={`
                      flex items-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
                      ${colorClass}
                      ${isSelected ? 'border-current' : 'border-muted'}
                    `}
                  >
                    <RadioGroupItem 
                      value={option.value.toString()} 
                      id={`option-${option.value}`}
                      className="text-current"
                    />
                    <Label 
                      htmlFor={`option-${option.value}`}
                      className="ml-4 cursor-pointer flex-1 font-medium"
                    >
                      {option.label}
                      {option.description && (
                        <span className="block text-sm font-normal opacity-80 mt-1">
                          {option.description}
                        </span>
                      )}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {/* 验证提示 */}
          {showValidation && question.required && !selectedValue && (
            <div className="flex items-center gap-2 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-600">请选择一个选项后继续</span>
            </div>
          )}

          {/* 跳过按钮 */}
          {allowSkip && (
            <div className="flex justify-center mt-6">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleSkip}
                className="text-muted-foreground hover:text-foreground"
              >
                <SkipForward className="w-4 h-4 mr-2" />
                跳过此题
              </Button>
            </div>
          )}

          {/* 选择状态提示 */}
          {selectedValue && (
            <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
              <p className="text-sm text-green-600 font-medium">
                ✓ 已选择答案，请点击"下一题"继续
              </p>
            </div>
          )}

          {/* 底部说明 */}
          <div className="mt-6 pt-4 border-t border-muted text-center">
            <p className="text-xs text-muted-foreground">
              请根据您的真实感受选择最符合的选项。您的回答将被严格保密。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}