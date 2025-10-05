/**
 * 人口学信息表单组件 - 收集必要的背景信息用于结果分析
 * 遵循最小化数据收集原则，保护用户隐私
 */

import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Label} from '@/components/ui/label';
import {ArrowLeft, ArrowRight, Users} from 'lucide-react';
import {Demographics} from '@/types';
import {DEMOGRAPHICS_QUESTIONS} from '@/lib/scales';

interface DemographicsFormProps {
  onSubmit: (demographics: Demographics) => void;
  onBack?: () => void;
  initialData?: Partial<Demographics>;
}

export function DemographicsForm({ onSubmit, onBack, initialData }: DemographicsFormProps) {
  const [formData, setFormData] = useState<Partial<Demographics & Record<string, any>>>({
    consentToParticipate: true,
    ...initialData
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (questionId: string, value: string) => {
    setFormData(prev => ({ ...prev, [questionId]: value }));
    // 清除错误
    if (errors[questionId]) {
      setErrors(prev => ({ ...prev, [questionId]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // 检查必填字段
    const requiredQuestions = DEMOGRAPHICS_QUESTIONS.filter(q => q.required);
    
    for (const question of requiredQuestions) {
      if (!formData[question.id as keyof Demographics]) {
        newErrors[question.id] = '请选择一个选项';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    // 构建完整的Demographics对象
    const demographics: Demographics = {
      age: formData.age || '',
      gender: formData.gender || '',
      relationshipStatus: (formData.relationshipStatus || '') as string,
      sexualActivity: (formData.sexualActivity || '') as string,
      religiousCultural: (formData.religiousCultural) as string | undefined,
      consentToParticipate: true
    };

    onSubmit(demographics);
  };

  const getLabelByValue = (questionId: string, value: string) => {
    const question = DEMOGRAPHICS_QUESTIONS.find(q => q.id === questionId);
    const option = question?.options.find(opt => opt.value.toString() === value);
    return option?.label || value;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* 标题 */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-psychology-primary mb-2">
          基本信息
        </h1>
        <p className="text-muted-foreground">
          请提供一些基本信息，这将帮助我们提供更准确的结果分析
        </p>
      </div>

      {/* 表单内容 */}
      <Card className="sri-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-psychology-primary" />
            人口学信息
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {DEMOGRAPHICS_QUESTIONS.map((question) => {
            const currentValue = formData[question.id as keyof Demographics]?.toString() || '';
            const hasError = !!errors[question.id];
            
            return (
              <div key={question.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">
                    {question.text}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  {!question.required && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      可选
                    </span>
                  )}
                </div>
                
                <RadioGroup
                  value={currentValue}
                  onValueChange={(value) => handleChange(question.id, value)}
                  className="grid grid-cols-1 gap-3"
                >
                  {question.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3">
                      <RadioGroupItem 
                        value={option.value.toString()} 
                        id={`${question.id}-${option.value}`}
                        className="text-psychology-primary"
                      />
                      <Label 
                        htmlFor={`${question.id}-${option.value}`}
                        className="text-sm font-normal cursor-pointer flex-1 p-2 rounded hover:bg-muted/50 transition-colors"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                
                {hasError && (
                  <p className="text-sm text-red-500">{errors[question.id]}</p>
                )}
              </div>
            );
          })}

          {/* 隐私提醒 */}
          <div className="bg-muted/30 p-4 rounded-lg border border-muted">
            <h4 className="font-medium text-sm mb-2">隐私保护</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              以上信息仅用于提供个性化的结果分析，所有数据均在您的设备本地处理，
              不会上传到任何服务器。您可以随时删除这些数据。
            </p>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-between pt-4 border-t">
            {onBack && (
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回
              </Button>
            )}
            <Button 
              onClick={handleSubmit}
              className="bg-psychology-primary hover:bg-psychology-primary/90 ml-auto"
            >
              继续评估
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 进度提示 */}
      <div className="text-center text-sm text-muted-foreground">
        第 1 步，共 3 步：基本信息收集
      </div>
    </div>
  );
}