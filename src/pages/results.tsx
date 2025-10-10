/**
 * 结果页面 - 显示SRI指数计算结果和详细分析
 * 提供专业的心理测评结果展示和个性化建议
 */

import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 添加国际化支持
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Progress} from '@/components/ui/progress';
import {Separator} from '@/components/ui/separator';
import {
    AlertCircle,
    AlertTriangle,
    BarChart3,
    Brain,
    CheckCircle,
    Clock,
    Download,
    FileText,
    Home,
    Info,
    RefreshCw,
    Shield,
    TrendingUp
} from 'lucide-react';
import {AssessmentSession, SRI_LEVELS, Scale} from '@/types';
import {diagnoseStorage, downloadAsJSON, getAssessmentSession} from '@/lib/storage';
import {ALL_SCALES} from '@/lib/scales';
import {getLocalizedScale} from '@/lib/scales/i18n'; // 添加国际化支持
import {ShareButtonMobile, ShareResult, SocialShareFloating} from '@/components/common';
import {useIsMobile} from '@/hooks/use-mobile';
import {decodeShareData} from '@/lib/share-utils';
import LanguageSwitcher from '@/components/common/language-switcher'; // 导入语言切换组件
import { generateInterpretation, generateRecommendations } from '@/lib/calculator'; // 导入生成解释和建议的函数

export default function Results() {
  const { t, i18n } = useTranslation(); // 使用国际化
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // 支持多种参数名称以提高兼容性
  const sessionId = searchParams.get('sessionId') || searchParams.get('session') || searchParams.get('id');
  const isShared = searchParams.get('shared') === 'true'; // 检测是否为分享链接
  const shareData = searchParams.get('data'); // 分享数据
  const isMobile = useIsMobile();
  
  const [session, setSession] = useState<AssessmentSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 加载会话数据
  useEffect(() => {
    // 如果是分享链接，尝试从URL参数解码数据
    if (isShared && shareData) {
      try {
        const decoded = decodeShareData(shareData);
        if (decoded) {
          // 创建虚拟的session对象用于显示
          const virtualSession: AssessmentSession = {
            id: 'shared-session',
            type: decoded.type as 'quick' | 'full',
            demographics: {
              age: '',
              gender: '',
              relationshipStatus: '',
              sexualActivity: '',
              consentToParticipate: true
            },
            responses: [],
            results: {
              sessionId: 'shared-session',
              sri: {
                totalScore: decoded.sri.totalScore || 0,
                zScore: 0,
                percentile: 0,
                level: decoded.sri.level as keyof typeof SRI_LEVELS,
                dimensionScores: decoded.sri.dimensionScores || {
                  sosReversed: 0,
                  sexGuilt: 0,
                  sexualShame: 0,
                  sisOverSes: 0
                },
                scaleScores: []
              },
              interpretation: [t('results.shared.interpretation')],
              recommendations: [t('results.shared.recommendations')],
              calculatedAt: new Date(decoded.completedAt)
            },
            startTime: new Date(decoded.completedAt),
            endTime: new Date(decoded.completedAt),
            completed: true
          };
          
          setSession(virtualSession);
          setLoading(false);
          return;
        } else {
          setError(t('results.shared.invalid'));
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error('Error decoding share data:', err);
        setError(t('results.shared.error'));
        setLoading(false);
        return;
      }
    }

    // 普通会话ID加载
    if (!sessionId) {
      console.log('URL parameters:', Object.fromEntries(searchParams.entries()));
      // 运行存储诊断
      const diagnosis = diagnoseStorage();
      console.log('Storage diagnosis:', diagnosis);
      setError(t('results.session.notFound'));
      setLoading(false);
      return;
    }

    console.log('Loading session with ID:', sessionId);
    // 运行存储诊断
    const diagnosis = diagnoseStorage();
    console.log('Storage diagnosis:', diagnosis);

    try {
      const assessmentSession = getAssessmentSession(sessionId);
      console.log('Found session:', assessmentSession ? 'Yes' : 'No');
      
      if (!assessmentSession) {
        setError(t('results.session.notFoundWithId', { id: sessionId }));
        setLoading(false);
        return;
      }

      if (!assessmentSession.results) {
        setError(t('results.session.incomplete'));
        setLoading(false);
        return;
      }

      console.log('Session loaded successfully');
      setSession(assessmentSession);
    } catch (err) {
      console.error('Error loading session:', err);
      const errorMessage = err instanceof Error ? err.message : t('results.error.unknown');
      setError(t('results.error.loading', { error: errorMessage }));
    } finally {
      setLoading(false);
    }
  }, [sessionId, isShared, shareData]);

  // 下载结果
  const handleDownload = () => {
    if (!session || !sessionId) return;
    
    const exportData = {
      sessionId: session.id,
      timestamp: new Date().toISOString(),
      type: session.type,
      demographics: session.demographics,
      results: session.results,
      responses: session.responses.reduce((acc, response) => {
        acc[response.questionId] = response.value;
        return acc;
      }, {} as Record<string, number>)
    };
    
    downloadAsJSON(exportData, `${t('results.download.filename')}_${new Date().toISOString().split('T')[0]}.json`);
  };

  // 重新测评
  const handleRetake = () => {
    navigate(`/assessment?type=${session?.type || 'quick'}`);
  };

  // 获取等级信息
  const getLevelInfo = (level: keyof typeof SRI_LEVELS) => {
    return SRI_LEVELS[level];
  };

  // 获取等级颜色类
  const getLevelColorClass = (level: keyof typeof SRI_LEVELS) => {
    const levelInfo = getLevelInfo(level);
    switch (level) {
      case 'very-low':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'very-high':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-psychology-calm via-white to-psychology-warm flex items-center justify-center">
        <Card className="w-full max-w-md p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-psychology-primary/10 rounded-full flex items-center justify-center mx-auto">
              <RefreshCw className="w-8 h-8 text-psychology-primary animate-spin" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">{t('results.loading.title')}</h2>
              <p className="text-muted-foreground">{t('results.loading.description')}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (error || !session || !session.results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-psychology-calm via-white to-psychology-warm flex items-center justify-center p-4">
        <Card className="w-full max-w-lg p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 text-red-600">{t('results.error.title')}</h2>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {error || t('results.error.notFound')}
              </p>
              
              {/* 调试信息（开发环境） */}
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-gray-50 p-3 rounded-lg text-left text-xs text-gray-600 mb-4">
                  <div><strong>{t('results.error.debugInfo')}:</strong></div>
                  <div>{t('results.error.sessionId')}: {sessionId || t('results.error.none')}</div>
                  <div>URL {t('results.error.parameters')}: {JSON.stringify(Object.fromEntries(searchParams.entries()))}</div>
                  <div>{t('results.error.hasSession')}: {session ? t('results.error.yes') : t('results.error.no')}</div>
                  <div>{t('results.error.hasResults')}: {session?.results ? t('results.error.yes') : t('results.error.no')}</div>
                </div>
              )}
              
              {/* 解决建议 */}
              <div className="bg-blue-50 p-4 rounded-lg mb-4 text-left">
                <h3 className="font-semibold text-blue-800 mb-2">{t('results.error.solutions.title')}:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• {t('results.error.solutions.1')}</li>
                  <li>• {t('results.error.solutions.2')}</li>
                  <li>• {t('results.error.solutions.3')}</li>
                  <li>• {t('results.error.solutions.4')}</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" onClick={() => navigate('/history')}>
                  <Clock className="w-4 h-4 mr-2" />
                  {t('navigation.history')}
                </Button>
                <Button variant="outline" onClick={() => navigate('/')}>
                  <Home className="w-4 h-4 mr-2" />
                  {t('navigation.home')}
                </Button>
                <Button onClick={() => navigate('/assessment')}>
                  <Brain className="w-4 h-4 mr-2" />
                  {t('results.error.retake')}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const sri = session.results.sri;
  const levelInfo = getLevelInfo(sri.level);

  return (
    <div className="min-h-screen bg-gradient-to-br from-psychology-calm via-white to-psychology-warm">
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
                {t('navigation.home')}
              </Button>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-psychology-primary" />
                <span className="font-semibold text-psychology-primary">
                  {t('results.title')}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <LanguageSwitcher />
              {/* 分享按钮 */}
              {isMobile ? (
                <ShareButtonMobile session={session} />
              ) : (
                <ShareResult session={session} />
              )}
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="text-muted-foreground hidden sm:flex"
              >
                <Download className="w-4 h-4 mr-2" />
                {t('results.export')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="text-muted-foreground sm:hidden"
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetake}
                className="text-muted-foreground hidden sm:flex"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {t('results.restart')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetake}
                className="text-muted-foreground sm:hidden"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* 主要结果卡片 */}
        <Card className="sri-card border-2 border-psychology-primary/20">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-psychology-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-10 h-10 text-psychology-primary" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-psychology-primary mb-2">
              {t('results.sriIndex')}
            </CardTitle>
            <div className="text-4xl sm:text-6xl font-bold text-psychology-primary mb-4">
              {Math.round(sri.totalScore)}
            </div>
            <Badge 
              className={`text-lg flex justify-center px-6 py-2 ${getLevelColorClass(sri.level)}`}
              variant="outline"
            >
              {t(`results.level.${sri.level.replace('-', '')}`)}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 分数解释 */}
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                {t('results.scoreExplanation', { 
                  score: Math.round(sri.totalScore), 
                  level: t(`results.level.${sri.level.replace('-', '')}`)
                })}
              </p>
              <div className="max-w-2xl mx-auto">
                <Progress value={sri.totalScore} className="h-3 mb-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0 ({t('results.scoreRange.low')})</span>
                  <span>50 ({t('results.scoreRange.medium')})</span>
                  <span>100 ({t('results.scoreRange.high')})</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* 结果解释 */}
            {session.results && (
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-psychology-primary" />
                  {t('results.interpretation.title')}
                </h3>
                <div className="space-y-2">
                  {generateInterpretation(session.results.sri).map((text, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed">
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* 个性化建议 */}
            {session.results && (
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-psychology-accent" />
                  {t('results.recommendations.title')}
                </h3>
                <div className="grid gap-3">
                  {generateRecommendations(session.results.sri).map((text, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-psychology-primary/5 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-psychology-primary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* 四维度分析 */}
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-psychology-secondary" />
                {t('results.dimensions.title')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(sri.dimensionScores).map(([dimension, score]) => (
                  <Card key={dimension} className="border-psychology-primary/10">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-foreground">
                          {t(`results.dimensions.${dimension}`)}
                        </span>
                        <span className="text-sm font-semibold text-psychology-primary">
                          {Math.round(score)}
                        </span>
                      </div>
                      <Progress value={score} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0</span>
                        <span>100</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 量表得分详情 */}
            {sri.scaleScores && sri.scaleScores.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-psychology-accent" />
                  {t('results.scaleScores.title')}
                </h3>
                <div className="space-y-3">
                  {sri.scaleScores.map((scaleScore, index) => {
                    // 查找量表信息并进行国际化处理
                    const scaleId = scaleScore.scaleId;
                    const localizedScale = getLocalizedScale(scaleId);
                    return (
                      <Card key={index} className="border-psychology-secondary/10">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <h4 className="font-medium text-foreground">
                                {localizedScale ? localizedScale.name : scaleId}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {localizedScale ? localizedScale.description : ''}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-psychology-secondary">
                                {scaleScore.rawScore.toFixed(2)}
                              </div>
                              {scaleScore.zScore !== undefined && (
                                <div className="text-xs text-muted-foreground">
                                  z = {scaleScore.zScore.toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 评估信息 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-muted/30 p-3 rounded-lg">
                <div className="text-muted-foreground mb-1">{t('results.info.assessmentType')}</div>
                <div className="font-medium">
                  {session.type === 'quick' ? t('assessment.type.quick') : t('assessment.type.full')}
                </div>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg">
                <div className="text-muted-foreground mb-1">{t('results.info.completedAt')}</div>
                <div className="font-medium">
                  {session.results.calculatedAt.toLocaleString(i18n.language === 'zh' ? 'zh-CN' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg">
                <div className="text-muted-foreground mb-1">{t('results.info.sessionId')}</div>
                <div className="font-mono text-xs font-medium break-all">
                  {session.id.substring(0, 8)}...
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 注意事项 */}
        <Card className="sri-card border-psychology-warning/20 bg-psychology-warning/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-psychology-warning mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-psychology-warning mb-2">
                  {t('results.disclaimer.title')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('results.disclaimer.description')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* 社交分享浮动按钮 (桌面端) */}
      {!isMobile && !isShared && (
        <SocialShareFloating session={session} />
      )}
    </div>
  );
}