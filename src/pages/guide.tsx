/**
 * 使用指南页面 - 详细的测评指导和注意事项
 * 帮助用户了解如何正确使用SRI评估工具
 */

import React from 'react';
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 添加国际化支持
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Separator} from '@/components/ui/separator';
import {
    AlertTriangle,
    ArrowRight,
    BarChart3,
    BookOpen,
    Brain,
    CheckCircle,
    Clock,
    FileText,
    Heart,
    Home,
    Info,
    Lightbulb,
    Shield,
    Target,
    Users
} from 'lucide-react';
import LanguageSwitcher from '@/components/common/language-switcher'; // 导入语言切换组件

export default function Guide() {
  const { t } = useTranslation(); // 使用国际化

  return (
    <div className="min-h-screen bg-gradient-to-br from-psychology-calm via-background to-psychology-warm">
      {/* 装饰背景 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-psychology-primary/5 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-16 w-24 h-24 bg-psychology-accent/5 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-psychology-secondary/5 rounded-full blur-xl"></div>
      </div>

      {/* 导航栏 */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Brain className="w-8 h-8 text-psychology-primary" />
              <span className="text-xl font-semibold text-foreground">SRI Calculator</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                {t('navigation.home')}
              </Link>
              <Link to="/science" className="text-muted-foreground hover:text-foreground transition-colors">
                {t('navigation.science')}
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <BookOpen className="w-16 h-16 text-psychology-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('guide.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('guide.description')}
          </p>
        </div>

        <div className="space-y-8">
          {/* 快速开始 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="w-6 h-6 text-psychology-primary" />
                {t('guide.quickStart.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-psychology-primary/10 text-psychology-primary">
                      {t('guide.quickStart.quickVersion')}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{t('guide.quickStart.recommended')}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-psychology-secondary" />
                      <span>{t('guide.quickStart.time', { time: '8-15' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-psychology-secondary" />
                      <span>{t('guide.quickStart.questions', { count: 39 })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-psychology-success" />
                      <span>{t('guide.quickStart.dimensions')}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-psychology-accent/10 text-psychology-accent">
                      {t('guide.quickStart.fullVersion')}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{t('guide.quickStart.inDepth')}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-psychology-secondary" />
                      <span>{t('guide.quickStart.time', { time: '25-40' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-psychology-secondary" />
                      <span>{t('guide.quickStart.questions', { count: 78 })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-psychology-accent" />
                      <span>{t('guide.quickStart.comprehensive')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 测评流程 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <ArrowRight className="w-6 h-6 text-psychology-secondary" />
                {t('guide.process.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4">
                  {[
                    { step: 1, title: t('guide.process.steps.consent.title'), desc: t('guide.process.steps.consent.description'), icon: Shield },
                    { step: 2, title: t('guide.process.steps.demographics.title'), desc: t('guide.process.steps.demographics.description'), icon: Users },
                    { step: 3, title: t('guide.process.steps.questionnaire.title'), desc: t('guide.process.steps.questionnaire.description'), icon: FileText },
                    { step: 4, title: t('guide.process.steps.results.title'), desc: t('guide.process.steps.results.description'), icon: Brain }
                  ].map(({ step, title, desc, icon: Icon }) => (
                    <div key={step} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-psychology-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="w-5 h-5 text-psychology-primary" />
                          <h4 className="font-semibold text-foreground">{title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 答题建议 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-psychology-warning" />
                {t('guide.tips.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {[
                  {
                    title: t('guide.tips.honest.title'),
                    desc: t('guide.tips.honest.description'),
                    icon: Heart,
                    color: "text-psychology-success"
                  },
                  {
                    title: t('guide.tips.intuition.title'),
                    desc: t('guide.tips.intuition.description'),
                    icon: Brain,
                    color: "text-psychology-primary"
                  },
                  {
                    title: t('guide.tips.completion.title'),
                    desc: t('guide.tips.completion.description'),
                    icon: Target,
                    color: "text-psychology-secondary"
                  },
                  {
                    title: t('guide.tips.privacy.title'),
                    desc: t('guide.tips.privacy.description'),
                    icon: Shield,
                    color: "text-psychology-accent"
                  }
                ].map(({ title, desc, icon: Icon, color }) => (
                  <div key={title} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <Icon className={`w-5 h-5 ${color} mt-0.5 flex-shrink-0`} />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{title}</h4>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 结果解读 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-psychology-secondary" />
                {t('guide.interpretation.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {t('guide.interpretation.description')}
              </p>
              <div className="grid gap-3">
                {[
                  { level: t('results.level.veryLow'), range: "0-20", desc: t('guide.interpretation.levels.veryLow'), color: "bg-green-50 border-green-200 text-green-700" },
                  { level: t('results.level.low'), range: "20-40", desc: t('guide.interpretation.levels.low'), color: "bg-green-50 border-green-200 text-green-700" },
                  { level: t('results.level.medium'), range: "40-60", desc: t('guide.interpretation.levels.medium'), color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
                  { level: t('results.level.high'), range: "60-80", desc: t('guide.interpretation.levels.high'), color: "bg-orange-50 border-orange-200 text-orange-700" },
                  { level: t('results.level.veryHigh'), range: "80-100", desc: t('guide.interpretation.levels.veryHigh'), color: "bg-red-50 border-red-200 text-red-700" }
                ].map(({ level, range, desc, color }) => (
                  <div key={level} className={`flex items-center justify-between p-3 rounded-lg border ${color}`}>
                    <div>
                      <span className="font-semibold">{level}</span>
                      <span className="ml-2 text-sm opacity-80">({range})</span>
                    </div>
                    <span className="text-sm">{desc}</span>
                  </div>
                ))}
              </div>
              <div className="bg-psychology-primary/5 border border-psychology-primary/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-psychology-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-psychology-primary mb-1">{t('guide.interpretation.warning.title')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('guide.interpretation.warning.description')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 隐私保护 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-psychology-accent" />
                {t('guide.privacy.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {t('guide.privacy.description')}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-psychology-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t('guide.privacy.local.title')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('guide.privacy.local.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-psychology-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t('guide.privacy.anonymous.title')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('guide.privacy.anonymous.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-psychology-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t('guide.privacy.control.title')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('guide.privacy.control.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-psychology-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t('guide.privacy.deletion.title')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('guide.privacy.deletion.description')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 常见问题 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Info className="w-6 h-6 text-psychology-warning" />
                {t('guide.faq.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  {
                    question: t('guide.faq.items.q1.question'),
                    answer: t('guide.faq.items.q1.answer')
                  },
                  {
                    question: t('guide.faq.items.q2.question'),
                    answer: t('guide.faq.items.q2.answer')
                  },
                  {
                    question: t('guide.faq.items.q3.question'),
                    answer: t('guide.faq.items.q3.answer')
                  },
                  {
                    question: t('guide.faq.items.q4.question'),
                    answer: t('guide.faq.items.q4.answer')
                  }
                ].map(({ question, answer }, index) => (
                  <div key={index} className="border-b border-border/50 pb-3 last:border-0 last:pb-0">
                    <h4 className="font-semibold text-foreground mb-1">{question}</h4>
                    <p className="text-sm text-muted-foreground">{answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}