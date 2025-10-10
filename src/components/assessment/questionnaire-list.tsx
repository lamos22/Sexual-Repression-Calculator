import React, {useEffect, useRef, useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Label} from '@/components/ui/label';
import {Badge} from '@/components/ui/badge';
import {Progress} from '@/components/ui/progress';
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,} from '@/components/ui/dialog';
import {AlertCircle, ArrowLeft, ArrowUp, BarChart3, CheckCircle, ChevronLeft, ChevronRight} from 'lucide-react';
import {Demographics, Question, Response} from '@/types';
import {ALL_SCALES, getAdaptiveFullScales, getAdaptiveScales, getUserGroupDescription, getUserGroupDescriptionEn} from '@/lib/scales';
import { getLocalizedScale } from '@/lib/scales/i18n'; // 添加国际化支持
import { useTranslation } from 'react-i18next'; // 添加国际化支持

interface QuestionnaireListProps {
  type: 'quick' | 'full';
  demographics: Demographics;
  responses: Response[];
  onResponseUpdate: (responses: Response[]) => void;
  onComplete: () => void;
  onBack?: () => void;
  resumeToken?: number | null;
}

// 分页导航组件 - 统一的翻页组件，支持快捷翻页
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function PaginationNav({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const goToPrev = () => {
    if (canGoPrev) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  };

  // 当前页变化时，自动滚动到可视区域
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeButton = container.querySelector(`[data-page="${currentPage}"]`) as HTMLElement;

      if (activeButton) {
        // 计算按钮相对于容器的位置
        const containerWidth = container.clientWidth;
        const buttonLeft = activeButton.offsetLeft;
        const buttonWidth = activeButton.offsetWidth;

        // 滚动到按钮居中位置
        container.scrollTo({
          left: buttonLeft - containerWidth / 2 + buttonWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [currentPage]);

  return (
    <div className="flex items-center justify-between gap-2 sm:gap-4">
      <Button
        variant="outline"
        onClick={goToPrev}
        disabled={!canGoPrev}
        className="flex items-center gap-1 sm:gap-2 transition-all hover:scale-105 disabled:hover:scale-100 shrink-0 h-9 px-2 sm:px-4"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline text-sm">
          {localStorage.getItem('language') === 'en' ? 'Previous' : '上一页'}
        </span>
      </Button>

      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-xs sm:text-sm text-muted-foreground shrink-0 hidden md:inline">
          {currentPage + 1} / {totalPages}
        </span>
        {/* 快捷翻页按钮 - 横向滚动容器 */}
        <div
          ref={scrollContainerRef}
          className="flex gap-1 overflow-x-auto overflow-y-hidden flex-1 py-1"
          style={{ scrollbarWidth: 'thin' }}
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              data-page={i}
              onClick={() => onPageChange(i)}
              className={`
                w-8 h-8 rounded text-xs font-medium transition-all duration-200 shrink-0
                ${i === currentPage
                  ? 'bg-psychology-primary text-white scale-110 shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                }
              `}
              aria-label={`${localStorage.getItem('language') === 'en' ? 'Page' : '第'} ${i + 1} ${localStorage.getItem('language') === 'en' ? '' : '页'}`}
              aria-current={i === currentPage ? 'page' : undefined}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        onClick={goToNext}
        disabled={!canGoNext}
        className="flex items-center gap-1 sm:gap-2 transition-all hover:scale-105 disabled:hover:scale-100 shrink-0 h-9 px-2 sm:px-4"
      >
        <span className="hidden sm:inline text-sm">
          {localStorage.getItem('language') === 'en' ? 'Next' : '下一页'}
        </span>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

export function QuestionnaireList({
  type,
  demographics,
  responses,
  onResponseUpdate,
  onComplete,
  onBack,
  resumeToken
}: QuestionnaireListProps) {
  const { t, i18n } = useTranslation(); // 使用 useTranslation hook
  
  // 根据用户特征选择适应性量表
  const getScalesForUser = () => {
    if (type === 'quick') {
      return getAdaptiveScales(demographics);
    } else {
      return getAdaptiveFullScales(demographics);
    }
  };

  const scaleIds = getScalesForUser();
  const userGroup = i18n.language === 'en' ? getUserGroupDescriptionEn(demographics) : getUserGroupDescription(demographics);
  
  // 显示选中的量表信息
  console.log(`用户群体: ${userGroup}, 选中量表:`, scaleIds);
  const allQuestions = scaleIds.flatMap(scaleId => {
    const scale = ALL_SCALES[scaleId];
    return scale ? scale.questions : [];
  });

  const [scrollToQuestionId, setScrollToQuestionId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showBackConfirm, setShowBackConfirm] = useState(false);

  // 自动保存功能 - 使用debounced保存避免频繁操作
  useEffect(() => {
    if (responses.length > 0) {
      const saveTimer = setTimeout(() => {
        try {
          const saveData = {
            type,
            demographics,
            responses,
            currentPage,
            timestamp: new Date().toISOString()
          };
          localStorage.setItem('sri_assessment_progress', JSON.stringify(saveData));
          setLastSaved(new Date());
        } catch (error) {
          console.error('保存进度失败:', error);
        }
      }, 1000); // 1秒延迟保存

      return () => clearTimeout(saveTimer);
    }
  }, [responses, type, demographics, currentPage]);

  // 组件初始化时恢复进度
  useEffect(() => {
    const saved = localStorage.getItem('sri_assessment_progress');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.type === type) {
          setCurrentPage(data.currentPage || 0);
          // 注意：responses由父组件管理，这里只恢复页面状态
        }
      } catch (error) {
        console.error('恢复保存的进度时出错:', error);
      }
    }
  }, [type]);
  
  // 分页设置 - 完整版采用分页模式
  const usesPagination = type === 'full';
  const questionsPerPage = usesPagination ? 15 : allQuestions.length;
  const totalPages = usesPagination ? Math.ceil(allQuestions.length / questionsPerPage) : 1;
  
  // 获取当前页的题目
  const getCurrentPageQuestions = () => {
    if (!usesPagination) return allQuestions;
    const startIndex = currentPage * questionsPerPage;
    return allQuestions.slice(startIndex, startIndex + questionsPerPage);
  };
  
  const currentPageQuestions = getCurrentPageQuestions();
  useEffect(() => {
    if (!scrollToQuestionId) {
      return;
    }

    const timer = window.setTimeout(() => {
      const targetElement = document.getElementById(`question-${scrollToQuestionId}`);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
      setScrollToQuestionId(null);
    }, usesPagination ? 250 : 150);

    return () => window.clearTimeout(timer);
  }, [scrollToQuestionId, usesPagination, currentPage]);
  const resumeHandledRef = useRef<number | null>(null);

  useEffect(() => {
    if (!resumeToken || resumeHandledRef.current === resumeToken) {
      return;
    }

    resumeHandledRef.current = resumeToken;

    const firstUnanswered = allQuestions.find(question =>
      !responses.some(response => response.questionId === question.id)
    );

    if (!firstUnanswered) {
      return;
    }

    let targetPage = currentPage;
    if (usesPagination) {
      const questionIndex = allQuestions.findIndex(question => question.id === firstUnanswered.id);
      if (questionIndex !== -1) {
        targetPage = Math.floor(questionIndex / questionsPerPage);
      }
    }

    if (targetPage !== currentPage) {
      setCurrentPage(targetPage);
    }

    setScrollToQuestionId(firstUnanswered.id);
  }, [resumeToken, responses, allQuestions, usesPagination, questionsPerPage, currentPage]);

  // 获取指定题目的回答
  const getResponseForQuestion = (questionId: string) => {
    return responses.find(r => r.questionId === questionId);
  };

  // 处理回答
  const handleAnswer = (questionId: string, value: number) => {
    const response: Response = {
      questionId,
      value,
      timestamp: new Date()
    };

    const updatedResponses = responses.filter(r => r.questionId !== questionId);
    updatedResponses.push(response);
    onResponseUpdate(updatedResponses);
  };

  // 获取回答统计
  const getAnswerStats = () => {
    const answered = responses.length;
    const unanswered = allQuestions.length - answered;
    const requiredUnanswered = allQuestions
      .filter(q => q.required)
      .filter(q => !responses.some(r => r.questionId === q.id))
      .length;
    
    return { answered, unanswered, requiredUnanswered };
  };

  // 完成评估
  const handleComplete = () => {
    const stats = getAnswerStats();
    if (stats.requiredUnanswered > 0) {
      // 滚动到第一个未回答的必答题
      const firstUnanswered = allQuestions.find(q => 
        q.required && !responses.some(r => r.questionId === q.id)
      );
      if (firstUnanswered) {
        // 如果是分页模式，先跳转到对应页面
        if (usesPagination) {
          const questionIndex = allQuestions.findIndex(q => q.id === firstUnanswered.id);
          const targetPage = Math.floor(questionIndex / questionsPerPage);
          if (targetPage !== currentPage) {
            setCurrentPage(targetPage);
            setTimeout(() => {
              document.getElementById(`question-${firstUnanswered.id}`)?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
              });
            }, 100);
            return;
          }
        }
        
        document.getElementById(`question-${firstUnanswered.id}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
      
      alert(localStorage.getItem('language') === 'en' ? 
        `There are still ${stats.requiredUnanswered} required questions unanswered. Please continue filling them out.` : 
        `还有 ${stats.requiredUnanswered} 道必答题未完成，请继续填写。`);
      return;
    }
    
    // 清除保存的进度
    localStorage.removeItem('sri_assessment_progress');
    onComplete();
  };

  // 按量表分组题目 - 根据分页模式调整
  const questionsByScale = scaleIds.reduce((acc, scaleId) => {
    const scale = getLocalizedScale(scaleId) || ALL_SCALES[scaleId]; // 使用国际化后的量表
    if (scale) {
      if (usesPagination) {
        // 分页模式：只显示当前页的题目
        const scaleQuestionsOnPage = scale.questions.filter(q => 
          currentPageQuestions.some(pq => pq.id === q.id)
        );
        if (scaleQuestionsOnPage.length > 0) {
          acc[scaleId] = scaleQuestionsOnPage;
        }
      } else {
        acc[scaleId] = scale.questions;
      }
    }
    return acc;
  }, {} as Record<string, Question[]>);

  // 分页导航函数
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // 只在顶部导航栏切换时才自动滚动到顶部
    // 底部切换时不滚动，让用户自己决定
  };

  const stats = getAnswerStats();
  const progress = (stats.answered / allQuestions.length) * 100;

  // 返回上一步 - 二次确认
  const handleBack = () => {
    if (responses.length > 0) {
      setShowBackConfirm(true);
    } else {
      onBack?.();
    }
  };

  const confirmBack = () => {
    setShowBackConfirm(false);
    onBack?.();
  };

  // 获取当前语言
  const currentLanguage = localStorage.getItem('language') || 'zh';

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* 顶部进度概览 */}
      <Card className="sri-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-psychology-primary" />
                {currentLanguage === 'en' ? 'Questionnaire Progress' : '问卷评估进度'}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="text-psychology-primary">
                  {userGroup}
                </Badge>
                <Badge variant="outline">
                  {type === 'quick' ? 
                    (currentLanguage === 'en' ? 'Quick Version' : '快测版') : 
                    (currentLanguage === 'en' ? 'Full Version' : '完整版')}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-psychology-primary border-psychology-primary">
                {stats.answered} / {allQuestions.length} {currentLanguage === 'en' ? 'Completed' : '已完成'}
              </Badge>
              {lastSaved && (
                <Badge variant="secondary" className="text-xs">
                  {currentLanguage === 'en' ? 'Saved' : '已保存'} {lastSaved.toLocaleTimeString()}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={progress} className="h-2" />
          
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.answered}</div>
              <div className="text-sm text-green-600">
                {currentLanguage === 'en' ? 'Answered' : '已回答'}
              </div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{stats.unanswered}</div>
              <div className="text-sm text-yellow-600">
                {currentLanguage === 'en' ? 'Unanswered' : '未回答'}
              </div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{stats.requiredUnanswered}</div>
              <div className="text-sm text-red-600">
                {currentLanguage === 'en' ? 'Required Incomplete' : '必答未完成'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 分页导航 - 仅在完整版显示 */}
      {usesPagination && (
        <Card className="sri-card">
          <CardContent className="p-4">
            <PaginationNav
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                handlePageChange(page);
                // 顶部导航时自动滚动到顶部
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* 按量表分组显示题目 */}
      {Object.entries(questionsByScale).map(([scaleId, questions]) => {
        const scale = getLocalizedScale(scaleId) || ALL_SCALES[scaleId]; // 使用国际化后的量表
        const scaleResponses = responses.filter(r => 
          questions.some(q => q.id === r.questionId)
        );
        const scaleProgress = (scaleResponses.length / questions.length) * 100;

        return (
          <Card key={scaleId} className="sri-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{scale?.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {scale?.description}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">
                    {scaleResponses.length} / {questions.length}
                  </Badge>
                  <Progress value={scaleProgress} className="h-1 w-20 mt-2" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.map((question, index) => {
                const currentResponse = getResponseForQuestion(question.id);
                const isAnswered = !!currentResponse;
                
                return (
                  <div 
                    key={question.id}
                    id={`question-${question.id}`}
                    className={`
                      p-6 rounded-lg border-2 transition-all duration-200
                      ${isAnswered 
                        ? 'bg-green-50 border-green-200' 
                        : question.required 
                          ? 'bg-red-50 border-red-200'
                          : 'bg-gray-50 border-gray-200'
                      }
                    `}
                  >
                    {/* 题目头部 */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {index + 1}
                          </Badge>
                          {question.required && (
                            <Badge variant="destructive" className="text-xs">
                              {currentLanguage === 'en' ? 'Required' : '必答'}
                            </Badge>
                          )}
                          {isAnswered && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <h3 className="text-base font-medium text-foreground leading-relaxed">
                          {question.text}
                        </h3>
                        {question.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {question.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 横向选项布局 */}
                    <RadioGroup
                      value={currentResponse?.value.toString() || ''}
                      onValueChange={(value) => handleAnswer(question.id, parseInt(value))}
                      className="mt-4"
                    >
                      <div className="grid grid-cols-1 gap-3 sm:gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
                        {question.options.map((option) => {
                          const isSelected = currentResponse?.value === option.value;
                          
                          return (
                            <div 
                              key={option.value}
                              onClick={() => handleAnswer(question.id, option.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  handleAnswer(question.id, option.value);
                                }
                              }}
                              role="radio"
                              aria-checked={isSelected}
                              tabIndex={0}
                              className={`
                                flex items-center p-2 sm:p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:bg-white/50 select-none active:scale-[0.98]
                                ${isSelected 
                                  ? 'bg-white border-psychology-primary shadow-sm' 
                                  : 'bg-white/30 border-gray-300 hover:border-gray-400'
                                }
                              `}
                            >
                              <RadioGroupItem 
                                value={option.value.toString()} 
                                id={`${question.id}-option-${option.value}`}
                                className="shrink-0"
                              />
                              <Label 
                                htmlFor={`${question.id}-option-${option.value}`}
                                className="ml-2 sm:ml-3 cursor-pointer text-xs sm:text-sm font-medium flex-1 leading-tight"
                              >
                                {option.label}
                              </Label>
                            </div>
                          );
                        })}
                      </div>
                    </RadioGroup>

                    {/* 必答题提醒 */}
                    {question.required && !isAnswered && (
                      <div className="flex items-center gap-2 mt-3 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">
                          {currentLanguage === 'en' ? 'This question is required' : '此题为必答题'}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );
      })}

      {/* 底部操作区域 */}
      <Card className="sri-card">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* 分页导航 - 底部也使用相同组件，支持快捷翻页 */}
            {usesPagination && (
              <div className="pb-4 border-b">
                <PaginationNav
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}

            {/* 主要操作按钮 */}
            <div className="flex justify-between items-center flex-wrap gap-4">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2 transition-all hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4" />
                {currentLanguage === 'en' ? 'Back' : '返回上一步'}
              </Button>

              <div className="text-center flex-1">
                {usesPagination && stats.requiredUnanswered > 0 && (
                  <p className="text-sm text-amber-600 mb-2">
                    {currentLanguage === 'en' ? 
                      'There are unanswered questions, please continue filling or check other pages' : 
                      '还有未完成的题目，请继续填写或查看其他页面'}
                  </p>
                )}
                {!usesPagination && (
                  <p className="text-sm text-muted-foreground mb-2">
                    {currentLanguage === 'en' ? 
                      'Please make sure all required questions are completed' : 
                      '请确保所有必答题都已完成'}
                  </p>
                )}
                <Button
                  onClick={handleComplete}
                  disabled={stats.requiredUnanswered > 0}
                  className="bg-psychology-primary hover:bg-psychology-primary/90 px-8 transition-all hover:scale-105"
                  size="lg"
                >
                  {currentLanguage === 'en' ? 'Complete Assessment and View Results' : '完成评估并查看结果'}
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {currentLanguage === 'en' ? 'Progress' : '进度'}: {Math.round(progress)}%
                </p>
                <p className="text-xs text-muted-foreground">
                  {stats.requiredUnanswered > 0
                    ? (currentLanguage === 'en' ? 
                        `There are ${stats.requiredUnanswered} required questions` : 
                        `还有 ${stats.requiredUnanswered} 道必答题`)
                    : (currentLanguage === 'en' ? 
                        'All required questions completed' : 
                        '所有必答题已完成')
                  }
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 返回确认对话框 */}
      <Dialog open={showBackConfirm} onOpenChange={setShowBackConfirm}>
        <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-sm">
          <DialogHeader>
            <DialogDescription className="text-center text-base pt-4">
              {currentLanguage === 'en' ? 
                'Are you sure you want to leave the questionnaire area?' : 
                '您确定要离开答题区域吗？'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setShowBackConfirm(false)}
              className="transition-all hover:scale-105"
            >
              {currentLanguage === 'en' ? 'Cancel' : '取消'}
            </Button>
            <Button
              onClick={confirmBack}
              className="bg-psychology-primary hover:bg-psychology-primary/90 transition-all hover:scale-105"
            >
              {currentLanguage === 'en' ? 'Confirm' : '确认'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 底部说明 */}
      <div className="text-center py-4">
        <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
          {currentLanguage === 'en' ? 
            'Please select the option that best matches your true feelings. All responses will be kept strictly confidential and used only to generate your personal assessment report. You can modify your previous answers at any time.' : 
            '请根据您的真实感受选择最符合的选项。所有回答都将被严格保密，仅用于生成您的个人评估报告。您可以随时修改之前的回答。'}
        </p>
      </div>
    </div>
  );
}