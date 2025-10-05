/**
 * 历史记录页面 - 查看和管理过往测评结果
 * 提供评估历史浏览、结果对比、数据导出等功能
 */

import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
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

export default function History() {
  const [sessions, setSessions] = useState<AssessmentSession[]>([]);
  const [loading, setLoading] = useState(true);

  // 加载历史记录
  useEffect(() => {
    try {
      const allSessions = getAllAssessmentSessions();
      setSessions(allSessions);
    } catch (error) {
      console.error('加载历史记录失败:', error);
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
      console.error('删除记录失败:', error);
    }
  };

  // 清除所有记录
  const handleClearAll = () => {
    try {
      clearAllSessions();
      setSessions([]);
    } catch (error) {
      console.error('清除所有记录失败:', error);
    }
  };

  // 导出数据
  const handleExportAll = (format: 'json' | 'csv') => {
    try {
      const data = exportAllSessionsData();
      const timestamp = new Date().toISOString().split('T')[0];
      
      if (format === 'json') {
        downloadAsJSON(data, `sri-assessment-history-${timestamp}.json`);
      } else {
        downloadAsCSV(data, `sri-assessment-history-${timestamp}.csv`);
      }
    } catch (error) {
      console.error('导出数据失败:', error);
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
          <p className="text-lg text-muted-foreground">加载历史记录...</p>
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
                <h1 className="text-2xl font-bold text-foreground">测评历史</h1>
                <p className="text-sm text-muted-foreground">查看和管理您的评估记录</p>
              </div>
            </div>
            <Button asChild variant="outline">
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                返回首页
              </Link>
            </Button>
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
            <h2 className="text-2xl font-semibold text-foreground mb-4">暂无测评记录</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              您还没有完成任何测评。开始您的第一次性压抑指数评估，探索更深层的自我认知。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-psychology-primary hover:bg-psychology-primary/90">
                <Link to="/assessment?type=quick" className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  开始快测版
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/assessment?type=full" className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  开始完整版
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
                      <p className="text-sm text-muted-foreground">总测评次数</p>
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
                      <p className="text-sm text-muted-foreground">完成测评</p>
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
                      <p className="text-sm text-muted-foreground">平均SRI指数</p>
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
                      <p className="text-sm text-muted-foreground">测评类型</p>
                      <p className="text-sm">
                        <span className="text-psychology-primary font-semibold">{stats.quick}</span> 快测 / 
                        <span className="text-psychology-secondary font-semibold">{stats.full}</span> 完整
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
                  数据管理
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
                    导出JSON
                  </Button>
                  <Button 
                    onClick={() => handleExportAll('csv')}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    导出CSV
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        清除所有记录
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>确认清除所有记录</AlertDialogTitle>
                        <AlertDialogDescription>
                          此操作将永久删除所有测评历史记录，无法恢复。您确定要继续吗？
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClearAll}>确认删除</AlertDialogAction>
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
                测评记录
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
                                  {session.type === 'quick' ? '快测版' : '完整版'}
                                </Badge>
                                {session.completed ? (
                                  <Badge variant="outline" className="text-psychology-success border-psychology-success">
                                    已完成
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-psychology-warning border-psychology-warning">
                                    未完成
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {session.startTime.toLocaleString('zh-CN', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                              {duration && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  用时：{duration} 分钟
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>年龄：{formattedDemographics.age}</p>
                            <p>性别：{formattedDemographics.gender}</p>
                            <p>关系状态：{formattedDemographics.relationshipStatus}</p>
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
                                <div className="text-xs text-muted-foreground">SRI 指数</div>
                              </div>
                              <Badge 
                                variant="outline" 
                                className={`text-${sriInfo.color} border-${sriInfo.color}`}
                              >
                                {sriInfo.label}
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
                              <p className="text-sm">测评未完成</p>
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
                                  查看结果
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
                                  继续测评
                                </Link>
                              </Button>
                            )}
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="flex items-center gap-2 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  删除
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>确认删除记录</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    确定要删除这条测评记录吗？此操作无法撤销。
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>取消</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDeleteSession(session.id)}
                                  >
                                    确认删除
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