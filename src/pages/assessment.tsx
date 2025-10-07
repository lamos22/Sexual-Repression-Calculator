/**
 * 评估页面 - 问卷系统主界面
 * 负责管理整个评估流程，包括知情同意、人口学信息、量表问卷等
 */

import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {Card} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {AlertTriangle, ArrowLeft, Brain, CheckCircle, Home} from 'lucide-react';
import {AssessmentSession, Demographics, Response} from '@/types';
import {calculateAssessmentResults} from '@/lib/calculator';
import {saveAssessmentSession} from '@/lib/storage';
import {ConsentForm} from '@/components/assessment/consent-form';
import {DemographicsForm} from '@/components/assessment/demographics-form';
import {QuestionnaireSection} from '@/components/assessment/questionnaire-section';

type AssessmentStep = 'consent' | 'demographics' | 'questionnaire' | 'processing' | 'completed';

export default function Assessment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // 获取评估类型
  const assessmentType = (searchParams.get('type') as 'quick' | 'full') || 'quick';
  
  // 状态管理
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('consent');
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [demographics, setDemographics] = useState<Demographics | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);
  const [session, setSession] = useState<AssessmentSession | null>(null);
  const [pendingProgress, setPendingProgress] = useState<{
    demographics?: Demographics;
    responses: Response[];
  } | null>(null);
  const [showProgressDialog, setShowProgressDialog] = useState(false);
  const [hasCheckedProgress, setHasCheckedProgress] = useState(false);
  const closingProgressDialogRef = useRef(false);
  const [resumeToken, setResumeToken] = useState<number | null>(null);

  useEffect(() => {
    if (hasCheckedProgress) {
      return;
    }

    const savedProgress = localStorage.getItem('sri_assessment_progress');
    if (!savedProgress) {
      setHasCheckedProgress(true);
      return;
    }

    try {
      const data = JSON.parse(savedProgress);
      if (data.type !== assessmentType) {
        setHasCheckedProgress(true);
        return;
      }

      const savedDemographics = data.demographics as Demographics | undefined;
      type RawResponse = { questionId: string; value: number; timestamp: string };
      const rawResponses: RawResponse[] = Array.isArray(data.responses) ? data.responses : [];
      const restoredResponses: Response[] = rawResponses.map(item => ({
        questionId: item.questionId,
        value: item.value,
        timestamp: new Date(item.timestamp),
      }));

      if (!savedDemographics && restoredResponses.length === 0) {
        setHasCheckedProgress(true);
        return;
      }

      setPendingProgress({
        demographics: savedDemographics,
        responses: restoredResponses,
      });
      setShowProgressDialog(true);
      closingProgressDialogRef.current = false;
      setHasCheckedProgress(true);
    } catch (error) {
      console.error('检查保存的进度时出错:', error);
      setHasCheckedProgress(true);
    }
  }, [assessmentType, hasCheckedProgress]);

const handleContinueProgress = () => {
    if (!pendingProgress) {
      closingProgressDialogRef.current = false;
      setShowProgressDialog(false);
      return;
    }

    closingProgressDialogRef.current = true;

    const baseSession: AssessmentSession = session ?? {
      id: sessionId,
      type: assessmentType,
      demographics: pendingProgress.demographics ?? ({} as Demographics),
      responses: [],
      startTime: new Date(),
      completed: false,
    };

    if (pendingProgress.demographics) {
      setDemographics(pendingProgress.demographics);
    }

    setResponses(pendingProgress.responses);

    const updatedSession: AssessmentSession = {
      ...baseSession,
      demographics: pendingProgress.demographics ?? baseSession.demographics,
      responses: pendingProgress.responses,
      completed: false,
      endTime: undefined,
    };

    setSession(updatedSession);
    saveAssessmentSession(updatedSession);

    setCurrentStep('questionnaire');
    setPendingProgress(null);
    setShowProgressDialog(false);
    setResumeToken(Date.now());
    setHasCheckedProgress(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [currentStep]);

  useEffect(() => {
    if (hasCheckedProgress) {
      return;
    }

    const savedProgress = localStorage.getItem('sri_assessment_progress');
    if (!savedProgress) {
      setHasCheckedProgress(true);
      return;
    }

    try {
      const data = JSON.parse(savedProgress);
      if (data.type !== assessmentType) {
        setHasCheckedProgress(true);
        return;
      }

      const savedDemographics = data.demographics as Demographics | undefined;
      type RawResponse = { questionId: string; value: number; timestamp: string };
      const rawResponses: RawResponse[] = Array.isArray(data.responses) ? data.responses : [];
      const restoredResponses: Response[] = rawResponses.map((item) => ({
        questionId: item.questionId,
        value: item.value,
        timestamp: new Date(item.timestamp),
      }));

      if (!savedDemographics && restoredResponses.length === 0) {
        setHasCheckedProgress(true);
        return;
      }

      setPendingProgress({
        demographics: savedDemographics,
        responses: restoredResponses,
      });
      setShowProgressDialog(true);
      setHasCheckedProgress(true);
    } catch (error) {
      console.error('检查保存的进度时出错:', error);
      setHasCheckedProgress(true);
    }
  }, [assessmentType, hasCheckedProgress]);


const handleDiscardProgress = () => {
    closingProgressDialogRef.current = true;
    localStorage.removeItem('sri_assessment_progress');
    setPendingProgress(null);
    setShowProgressDialog(false);
    setHasCheckedProgress(true);
    setDemographics(null);
    setResponses([]);
    setCurrentStep('consent');
    setResumeToken(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (session) {
      setSession({
        ...session,
        demographics: {} as Demographics,
        responses: [],
        startTime: new Date(),
        completed: false,
        endTime: undefined,
      });
    }
  };

const handleProgressDialogOpenChange = (open: boolean) => {
    if (!open) {
      if (closingProgressDialogRef.current) {
        closingProgressDialogRef.current = false;
        setShowProgressDialog(false);
        return;
      }

      if (pendingProgress) {
        setShowProgressDialog(true);
        return;
      }
    }

    setShowProgressDialog(open);
  };

  // 初始化会话
  useEffect(() => {
    const newSession: AssessmentSession = {
      id: sessionId,
      type: assessmentType,
      demographics: {} as Demographics,
      responses: [],
      startTime: new Date(),
      completed: false
    };
    setSession(newSession);
  }, [sessionId, assessmentType]);

  // 检测是否为未成年人
  const isMinorUser = demographics?.age === '0'; // 14-17岁年龄段

  // 处理知情同意
  const handleConsent = (consented: boolean) => {
    if (!consented) {
      navigate('/');
      return;
    }
    setCurrentStep('demographics');
    // 滚动到顶部以显示完整的人口学信息表单
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 处理人口学信息提交
  const handleDemographicsSubmit = (demographicsData: Demographics) => {
    setDemographics(demographicsData);
    if (session) {
      const updatedSession = {
        ...session,
        demographics: demographicsData
      };
      setSession(updatedSession);
      saveAssessmentSession(updatedSession);
    }
    setCurrentStep('questionnaire');
    // 滚动到顶部以显示问卷开始部分
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 处理问卷回答更新
  const handleResponseUpdate = (newResponses: Response[]) => {
    setResponses(newResponses);
    if (session) {
      const updatedSession = {
        ...session,
        responses: newResponses
      };
      setSession(updatedSession);
      saveAssessmentSession(updatedSession);
    }
  };

  // 处理问卷完成
  const handleQuestionnaireComplete = async () => {
    if (!session || !demographics) return;

    setCurrentStep('processing');

    try {
      // 计算结果
      const results = calculateAssessmentResults(responses, sessionId);
      
      // 更新会话
      const completedSession: AssessmentSession = {
        ...session,
        responses,
        results,
        endTime: new Date(),
        completed: true
      };

      setSession(completedSession);
      saveAssessmentSession(completedSession);

      // 跳转到结果页面
      setTimeout(() => {
        navigate(`/results?sessionId=${sessionId}`);
      }, 2000);

    } catch (error) {
      console.error('Error calculating results:', error);
      alert('计算结果时发生错误，请重试。');
      setCurrentStep('questionnaire');
    }
  };

  // 获取步骤进度
  const getStepProgress = () => {
    const steps = ['consent', 'demographics', 'questionnaire', 'processing'];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  // 返回上一步
  const handleBack = () => {
    switch (currentStep) {
      case 'demographics':
        setCurrentStep('consent');
        break;
      case 'questionnaire':
        setCurrentStep('demographics');
        break;
      default:
        navigate('/');
        return;
    }
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-psychology-calm via-white to-psychology-warm">
      <AlertDialog open={showProgressDialog} onOpenChange={handleProgressDialogOpenChange}>
        <AlertDialogContent className="max-w-[calc(100%-2rem)] sm:max-w-sm rounded-xl p-6 space-y-6">
          <AlertDialogHeader className="space-y-3 text-center">
            <AlertDialogTitle className="text-xl font-semibold">
              检测到未完成的评估
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground">
              检测到本地保存的未完成评估，已回答 {pendingProgress?.responses.length ?? 0} 道题。请选择继续作答或重新开始。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center gap-2">
            <AlertDialogCancel
              onClick={handleDiscardProgress}
              className="w-full sm:w-auto transition-transform hover:scale-[1.02]"
            >
              重新开始
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleContinueProgress}
              className="w-full sm:w-auto bg-psychology-primary hover:bg-psychology-primary/90 transition-transform hover:scale-[1.02]"
            >
              继续作答
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* 顶部导航 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-muted">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground"
              >
                <Home className="w-4 h-4 mr-2" />
                首页
              </Button>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-psychology-primary" />
                <span className="font-semibold text-psychology-primary">
                  {assessmentType === 'quick' ? '快速测评' : '完整测评'}
                </span>
              </div>
            </div>

            {currentStep !== 'processing' && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleBack}
                className="text-muted-foreground hidden sm:flex"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回
              </Button>
            )}
            {currentStep !== 'processing' && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleBack}
                className="text-muted-foreground sm:hidden"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* 总体进度条 */}
          {currentStep !== 'consent' && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">整体进度</span>
                <span className="text-sm font-medium">{Math.round(getStepProgress())}%</span>
              </div>
              <Progress value={getStepProgress()} className="h-2" />
            </div>
          )}
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="container mx-auto px-4 py-8">
        {/* 知情同意书 */}
        {currentStep === 'consent' && (
          <ConsentForm 
            onConsent={handleConsent}
            isMinor={isMinorUser}
          />
        )}

        {/* 人口学信息表单 */}
        {currentStep === 'demographics' && (
          <DemographicsForm
            onSubmit={handleDemographicsSubmit}
            onBack={handleBack}
            initialData={demographics || undefined}
          />
        )}

        {/* 问卷主界面 */}
        {currentStep === 'questionnaire' && demographics && (
          <QuestionnaireSection
            type={assessmentType}
            demographics={demographics}
            responses={responses}
            onResponseUpdate={handleResponseUpdate}
            onComplete={handleQuestionnaireComplete}
            resumeToken={resumeToken}
            onBack={handleBack}
          />
        )}

        {/* 处理中状态 */}
        {currentStep === 'processing' && (
          <div className="max-w-2xl mx-auto text-center">
            <Card className="sri-card p-12">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-psychology-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-8 h-8 text-psychology-primary animate-pulse" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-psychology-primary mb-2">
                    正在分析您的回答
                  </h2>
                  <p className="text-muted-foreground">
                    我们正在使用科学算法计算您的性压抑指数，请稍候...
                  </p>
                </div>

                <div className="space-y-3">
                  <Progress value={100} className="h-2" />
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>应用多维度标准化算法</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>生成个性化分析报告</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>保护您的隐私数据</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* 底部提示 */}
      {currentStep === 'questionnaire' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-muted p-3 sm:p-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">您的所有回答都会安全地保存在本地设备上</span>
                <span className="sm:hidden">数据安全保存</span>
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                已回答: {responses.length} 题
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
