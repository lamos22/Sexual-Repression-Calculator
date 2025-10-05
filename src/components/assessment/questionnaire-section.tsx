/**
 * 问卷主界面组件 - 管理整个问卷流程
 * 包括题目展示、进度跟踪、答案保存等核心功能
 */

import React from 'react';
import {Demographics, Response} from '@/types';
import {QuestionnaireList} from './questionnaire-list';

interface QuestionnaireSectionProps {
  type: 'quick' | 'full';
  demographics: Demographics;
  responses: Response[];
  onResponseUpdate: (responses: Response[]) => void;
  onComplete: () => void;
  onBack?: () => void;
  resumeToken?: number | null;
}

export function QuestionnaireSection({
  type,
  demographics,
  responses,
  onResponseUpdate,
  onComplete,
  resumeToken,
  onBack
}: QuestionnaireSectionProps) {
  // 使用新的列表模式显示问卷
  return (
    <QuestionnaireList
      type={type}
      demographics={demographics}
      responses={responses}
      onResponseUpdate={onResponseUpdate}
      onComplete={onComplete}
      onBack={onBack}
      resumeToken={resumeToken}
    />
  );

  // 以下是原有的单题模式代码（暂时保留作为备用）
  /*
  // 获取当前评估类型的所有题目
  const scaleIds = type === 'quick' ? QUICK_ASSESSMENT_SCALES : QUICK_ASSESSMENT_SCALES;
  const allQuestions = scaleIds.flatMap(scaleId => {
    const scale = ALL_SCALES[scaleId];
    return scale ? scale.questions : [];
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestion = allQuestions[currentQuestionIndex];
  const totalQuestions = allQuestions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // 获取当前题目的回答
  const getCurrentResponse = () => {
    return responses.find(r => r.questionId === currentQuestion?.id);
  };

  // 处理回答
  const handleAnswer = (response: Response) => {
    const updatedResponses = responses.filter(r => r.questionId !== response.questionId);
    updatedResponses.push(response);
    onResponseUpdate(updatedResponses);
    
    // 不再自动跳转，等待用户手动点击下一题
  };

  // 跳过题目
  const handleSkip = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  // 导航到指定题目
  const navigateToQuestion = (index: number) => {
    if (index >= 0 && index < totalQuestions) {
      setCurrentQuestionIndex(index);
      setShowSummary(false);
    }
  };

  // 获取回答统计
  const getAnswerStats = () => {
    const answered = responses.length;
    const unanswered = totalQuestions - answered;
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
      alert(`还有 ${stats.requiredUnanswered} 道必答题未完成，请继续填写。`);
      return;
    }
    onComplete();
  };

  if (showSummary) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="sri-card">
          <CardContent className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-2">问卷完成</h2>
              <p className="text-muted-foreground">
                恭喜您完成了所有问卷题目！我们正在为您计算结果。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{getAnswerStats().answered}</div>
                <div className="text-sm text-green-600">已回答</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{totalQuestions}</div>
                <div className="text-sm text-blue-600">总题数</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{getAnswerStats().unanswered}</div>
                <div className="text-sm text-yellow-600">未回答</div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setShowSummary(false)}
              >
                继续检查
              </Button>
              <Button 
                onClick={handleComplete}
                className="bg-psychology-primary hover:bg-psychology-primary/90"
                disabled={getAnswerStats().requiredUnanswered > 0}
              >
                查看结果
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="sri-card">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">题目概览</h3>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {allQuestions.map((question, index) => {
                const hasResponse = responses.some(r => r.questionId === question.id);
                return (
                  <button
                    key={question.id}
                    onClick={() => navigateToQuestion(index)}
                    className={`
                      w-10 h-10 rounded text-sm font-medium transition-colors
                      ${hasResponse 
                        ? 'bg-green-500 text-white' 
                        : question.required 
                          ? 'bg-red-100 text-red-600 border border-red-300'
                          : 'bg-gray-100 text-gray-600'
                      }
                      hover:opacity-80
                    `}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>已回答</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                <span>必答未回答</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-100 rounded"></div>
                <span>可选未回答</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">加载中...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProgressIndicator
        current={currentQuestionIndex + 1}
        total={totalQuestions}
        progress={progress}
        scaleName={ALL_SCALES[currentQuestion.scale]?.name || ''}
      />

      <QuestionCard
        question={currentQuestion}
        currentResponse={getCurrentResponse()}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        onAnswer={handleAnswer}
        onSkip={handleSkip}
        allowSkip={!currentQuestion.required}
      />

      <div className="flex justify-between max-w-4xl mx-auto">
        <Button 
          variant="outline"
          onClick={() => {
            if (currentQuestionIndex > 0) {
              setCurrentQuestionIndex(prev => prev - 1);
            } else {
              onBack?.();
            }
          }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {currentQuestionIndex > 0 ? '上一题' : '返回'}
        </Button>

        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setShowSummary(true)}
          >
            <Flag className="w-4 h-4 mr-2" />
            完成概览
          </Button>
          
          {currentQuestionIndex < totalQuestions - 1 ? (
            <Button 
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              disabled={currentQuestion.required && !getCurrentResponse()}
              className="bg-psychology-primary hover:bg-psychology-primary/90"
            >
              下一题
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={() => setShowSummary(true)}
              disabled={currentQuestion.required && !getCurrentResponse()}
              className="bg-psychology-primary hover:bg-psychology-primary/90"
            >
              完成问卷
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
  */
}
