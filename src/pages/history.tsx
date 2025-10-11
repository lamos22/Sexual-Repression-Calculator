/**
 * 历史记录页面 - 查看和管理过往测评结果
 * 提供评估历史浏览、结果对比、数据导出等功能
 */

import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 添加国际化支持
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
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
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import {
    AlertCircle,
    BarChart3,
    Calendar,
    Clock,
    Download,
    Eye,
    FileText,
    Home,
    RefreshCw,
    Trash2,
    TrendingUp,
    Users
} from 'lucide-react';
import {AssessmentSession, SRI_LEVELS} from '@/types';
import {
    clearAllSessions,
    deleteAssessmentSession,
    downloadAsCSV,
    downloadAsJSON,
    exportAllSessionsData,
    getAllAssessmentSessions
} from '@/lib/storage';
import {formatDemographicsForDisplay} from '@/lib/demographics-utils';
import LanguageSwitcher from '@/components/common/language-switcher'; // 导入语言切换组件

export default function History() {
  const { t, i18n } = useTranslation(); // 使用国际化
  const [sessions, setSessions] = useState<AssessmentSession[]>([]);
  const [loading, setLoading] = useState(true);

  // 加载历史记录
  useEffect(() => {
    try {
      const allSessions = getAllAssessmentSessions();
      setSessions(allSessions);
    } catch (error) {
      console.error(t('history.error.loading'), error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 删除单个记录
  const handleDeleteSession = (sessionId: string) => {
    try {
      deleteAssessmentSession(sessionId);
      setSessions(prev => prev.filter(s => s.id !== sessionId));
    } catch (error) {
      console.error(t('history.error.deleting'), error);
    }
  };

  // 清除所有记录
  const handleClearAll = () => {
    try {
      clearAllSessions();
      setSessions([]);
    } catch (error) {
      console.error(t('history.error.clearing'), error);
    }
  };

  // 导出数据
  const handleExportAll = (format: 'json' | 'csv') => {
    try {
      const data = exportAllSessionsData();
      const timestamp = new Date().toISOString().split('T')[0];
      
      if (format === 'json') {
        downloadAsJSON(data, `${t('history.export.filename')}-${timestamp}.json`);
      } else {
        downloadAsCSV(data, `${t('history.export.filename')}-${timestamp}.csv`);
      }
    } catch (error) {
      console.error(t('history.error.exporting'), error);
    }
  };

  // 获取SRI等级信息
  const getSRILevelInfo = (score: number) => {
    for (const [level, info] of Object.entries(SRI_LEVELS)) {
      if (score >= info.min && score < info.max) {
        return { level: level as keyof typeof SRI_LEVELS, ...info };
      }
    }
    return { level: 'moderate' as const, ...SRI_LEVELS.moderate };
  };

  // 统计信息
  const stats = {
    total: sessions.length,
    completed: sessions.filter(s => s.completed).length,
    quick: sessions.filter(s => s.type === 'quick').length,
    full: sessions.filter(s => s.type === 'full').length,
    avgScore: sessions.filter(s => s.results).length > 0 
      ? Math.round(sessions.filter(s => s.results).reduce((sum, s) => sum + (s.results?.sri.totalScore || 0), 0) / sessions.filter(s => s.results).length)
      : 0
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-psychology-calm to-psychology-warm flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-psychology-primary" />
          <p className="text-lg text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-psychology-calm to-psychology-warm">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-psychology-primary rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{t('history.title')}</h1>
                <p className="text-sm text-muted-foreground">{t('history.subtitle')}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <LanguageSwitcher />
              <Button asChild variant="outline">
                <Link to="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  {t('navigation.home')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {sessions.length === 0 ? (
          // 空状态
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-psychology-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-psychology-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t('history.empty.title')}</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              {t('history.empty.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-psychology-primary hover:bg-psychology-primary/90">
                <Link to="/assessment?type=quick" className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  {t('home.quickStart')}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/assessment?type=full" className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {t('home.fullVersion')}
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 统计面板 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('history.stats.total')}</p>
                      <p className="text-2xl font-bold text-psychology-primary">{stats.total}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-psychology-primary/60" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('history.stats.completed')}</p>
                      <p className="text-2xl font-bold text-psychology-success">{stats.completed}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-psychology-success/60" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('history.stats.average')}</p>
                      <p className="text-2xl font-bold text-psychology-accent">{stats.avgScore}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-psychology-accent/60" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('history.stats.types')}</p>
                      <p className="text-sm">
                        <span className="text-psychology-primary font-semibold">{stats.quick}</span> {t('assessment.type.quick')} / 
                        <span className="text-psychology-secondary font-semibold">{stats.full}</span> {t('assessment.type.full')}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-muted-foreground/60" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 操作按钮 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  {t('history.management.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={() => handleExportAll('json')}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    {t('history.management.exportJson')}
                  </Button>
                  <Button 
                    onClick={() => handleExportAll('csv')}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    {t('history.management.exportCsv')}
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        {t('history.management.clearAll')}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t('history.management.confirmClear.title')}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t('history.management.confirmClear.description')}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClearAll}>{t('common.confirm')}</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>

            {/* 历史记录列表 */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {t('history.records.title')}
              </h2>
              
              {sessions.map((session) => {
                const sriInfo = session.results ? getSRILevelInfo(session.results.sri.totalScore) : null;
                const duration = session.endTime && session.startTime 
                  ? Math.round((session.endTime.getTime() - session.startTime.getTime()) / 60000) 
                  : null;
                
                // 格式化人口学信息为可读文字
                const formattedDemographics = formatDemographicsForDisplay(session.demographics);
                
                return (
                  <Card key={session.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        {/* 基本信息 */}
                        <div className="lg:col-span-2">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge 
                                  variant={session.type === 'quick' ? 'default' : 'secondary'}
                                  className={session.type === 'quick' 
                                    ? 'bg-psychology-primary text-white' 
                                    : 'bg-psychology-secondary text-white'
                                  }
                                >
                                  {session.type === 'quick' ? t('assessment.type.quick') : t('assessment.type.full')}
                                </Badge>
                                {session.completed ? (
                                  <Badge variant="outline" className="text-psychology-success border-psychology-success">
                                    {t('history.records.completed')}
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-psychology-warning border-psychology-warning">
                                    {t('history.records.incomplete')}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {session.startTime.toLocaleString(i18n.language === 'zh' ? 'zh-CN' : 'en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                              {duration && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {t('history.records.duration', { minutes: duration })}
                                </p>
                              )}
                            </div>
                            
                            <div className="flex gap-2">
                              {session.completed && session.results ? (
                                <Button asChild size="sm" variant="outline">
                                  <Link to={`/results?sessionId=${session.id}`}>
                                    <Eye className="w-4 h-4 mr-1" />
                                    {t('history.records.view')}
                                  </Link>
                                </Button>
                              ) : (
                                <Button asChild size="sm" variant="outline">
                                  <Link to={`/assessment?type=${session.type}`}>
                                    {t('history.records.continue')}
                                  </Link>
                                </Button>
                              )}
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>{t('history.records.confirmDelete.title')}</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      {t('history.records.confirmDelete.description')}
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteSession(session.id)}>
                                      {t('common.delete')}
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                          
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>{t('assessment.demographics.age')}: {formattedDemographics.age}</p>
                            <p>{t('assessment.demographics.gender.label')}: {formattedDemographics.gender}</p>
                            <p>{t('assessment.demographics.relationship.label')}: {formattedDemographics.relationshipStatus}</p>
                          </div>
                        </div>
                        
                        {/* 结果展示 */}
                        <div className="lg:col-span-1">
                          {session.results && sriInfo ? (
                            <div className="text-center">
                              <div className="mb-3">
                                <div className="text-3xl font-bold text-psychology-primary mb-1">
                                  {session.results.sri.totalScore}
                                </div>
                                <div className="text-xs text-muted-foreground">{t('results.sriIndex')}</div>
                              </div>
                              <Badge 
                                variant="outline" 
                                className={`text-${sriInfo.color} border-${sriInfo.color}`}
                              >
                                {t(`results.level.${sriInfo.level.replace('-', '')}`)}
                              </Badge>
                              <div className="mt-3">
                                <Progress 
                                  value={session.results.sri.totalScore} 
                                  className="h-2" 
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="text-center text-muted-foreground">
                              <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                              <p className="text-sm">{t('history.records.incomplete')}</p>
                            </div>
                          )}
                        </div>
                        
                        {/* 操作按钮 */}
                        <div className="lg:col-span-1">
                          <div className="flex flex-col gap-2">
                            {session.completed && session.results ? (
                              <Button 
                                asChild 
                                size="sm" 
                                className="flex items-center gap-2"
                              >
                                <Link to={`/results?sessionId=${session.id}`}>
                                  <Eye className="w-4 h-4" />
                                  {t('history.records.view')}
                                </Link>
                              </Button>
                            ) : (
                              <Button 
                                asChild 
                                size="sm" 
                                variant="outline"
                                className="flex items-center gap-2"
                              >
                                <Link to={`/assessment?type=${session.type}`}>
                                  <RefreshCw className="w-4 h-4" />
                                  {t('history.records.continue')}
                                </Link>
                              </Button>
                            )}
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="outline" className="flex items-center gap-2">
                                  <Trash2 className="w-4 h-4" />
                                  {t('common.delete')}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>{t('history.records.confirmDelete.title')}</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    {t('history.records.confirmDelete.description')}
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteSession(session.id)}>
                                    {t('common.confirm')}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}