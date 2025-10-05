/**
 * 分享结果查看组件 - 为分享链接提供专门的结果展示
 * 优化分享体验，突出核心信息
 */

import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Progress} from '@/components/ui/progress';
import {Separator} from '@/components/ui/separator';
import {ArrowRight, BarChart3, Brain, CheckCircle, Heart, Home, Sparkles, Target, Users} from 'lucide-react';
import {AssessmentSession, SRI_LEVELS} from '@/types';

interface ShareViewProps {
  session: AssessmentSession;
}

export function ShareView({ session }: ShareViewProps) {
  const navigate = useNavigate();

  if (!session.results) {
    return null;
  }

  const sri = session.results.sri;
  const levelInfo = SRI_LEVELS[sri.level];

  // 获取等级颜色类
  const getLevelColorClass = (level: keyof typeof SRI_LEVELS) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-psychology-calm via-white to-psychology-warm">
      {/* 头部导航 */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-muted">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-psychology-primary" />
              <div>
                <h1 className="font-bold text-psychology-primary text-lg">
                  SRI性压抑指数计算器
                </h1>
                <p className="text-xs text-muted-foreground">
                  基于科学心理测量学的专业评估工具
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/')}
            >
              <Home className="w-4 h-4 mr-2" />
              主页
            </Button>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* 欢迎卡片 */}
        <Card className="sri-card border-2 border-psychology-primary/20 bg-gradient-to-br from-psychology-primary/5 to-psychology-accent/5">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-psychology-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-10 h-10 text-psychology-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-psychology-primary mb-2">
                  朋友分享了一个有趣的心理评估结果
                </h2>
                <p className="text-muted-foreground text-lg">
                  SRI性压抑指数是基于多个科学量表的专业心理评估工具
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 分享结果展示 */}
        <Card className="sri-card border-2 border-psychology-primary/30">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-psychology-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-psychology-primary" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-psychology-primary mb-2">
              评估结果
            </CardTitle>
            <div className="text-3xl sm:text-5xl font-bold text-psychology-primary mb-4">
              {Math.round(sri.totalScore)}
            </div>
            <Badge 
              className={`text-base px-4 py-2 ${getLevelColorClass(sri.level)}`}
              variant="outline"
            >
              {levelInfo.label}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 分数解释 */}
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                SRI指数: <span className="font-semibold text-psychology-primary">{Math.round(sri.totalScore)}</span>/100，
                处于 <span className="font-semibold">{levelInfo.label}</span> 水平
              </p>
              <div className="max-w-md mx-auto">
                <Progress value={sri.totalScore} className="h-3 mb-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0 (较少压抑)</span>
                  <span>50 (中等)</span>
                  <span>100 (较多压抑)</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* 快速解释 */}
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-psychology-primary" />
                关于SRI指数
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                性压抑指数(SRI)是一个综合性的心理健康指标，基于国际认可的心理测量量表开发。
                它能够帮助人们更好地了解自己的性心理特征，促进心理健康和亲密关系的发展。
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>科学可靠的测量方法</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>四维度综合分析</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>个性化专业建议</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>完全隐私保护</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 邀请体验卡片 */}
        <Card className="sri-card border-psychology-accent/30 bg-gradient-to-br from-psychology-accent/5 to-psychology-primary/5">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-psychology-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-psychology-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-psychology-primary mb-2">
                  想要获得属于自己的心理分析吗？
                </h3>
                <p className="text-muted-foreground mb-6">
                  免费完成专业的性心理健康评估，获得个性化的分析报告和改善建议
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    onClick={() => navigate('/assessment')}
                    className="bg-psychology-primary hover:bg-psychology-primary/90 text-white px-8"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    开始我的评估
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => navigate('/')}
                    className="px-8"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    了解更多
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 功能特色 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="sri-card text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">科学专业</h4>
              <p className="text-sm text-muted-foreground">
                基于SIS/SES、Mosher等国际认可量表
              </p>
            </CardContent>
          </Card>
          
          <Card className="sri-card text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">深度分析</h4>
              <p className="text-sm text-muted-foreground">
                四维度分析和个性化建议
              </p>
            </CardContent>
          </Card>
          
          <Card className="sri-card text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">隐私安全</h4>
              <p className="text-sm text-muted-foreground">
                100%本地数据处理，保护隐私
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}