/**
 * 科学依据页面 - 展示SRI评估工具的理论基础和研究支撑
 * 提供详细的学术背景和量表信效度信息
 */

import React from 'react';
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 添加国际化支持
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {
    Award,
    BarChart3,
    BookOpen,
    Brain,
    CheckCircle,
    FileText,
    Globe,
    Home,
    Info,  // 添加缺失的导入
    Microscope,
    Shield,
    Target,
    TrendingUp,
    Users
} from 'lucide-react';
import LanguageSwitcher from '@/components/common/language-switcher'; // 导入语言切换组件

export default function Science() {
  const { t } = useTranslation(); // 使用国际化

  return (
    <div className="min-h-screen bg-gradient-to-br from-psychology-calm via-background to-psychology-warm">
      {/* 装饰背景 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-32 right-20 w-28 h-28 bg-psychology-accent/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 left-16 w-36 h-36 bg-psychology-primary/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-psychology-secondary/3 rounded-full blur-2xl"></div>
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
              <Link to="/guide" className="text-muted-foreground hover:text-foreground transition-colors">
                {t('navigation.guide')}
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <Microscope className="w-16 h-16 text-psychology-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('science.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('science.description')}
          </p>
        </div>

        <div className="space-y-8">
          {/* 理论基础 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-psychology-primary" />
                {t('science.theory.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">{t('science.theory.dualControl.title')}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t('science.theory.dualControl.description')}
                  </p>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-psychology-warning" />
                    <span className="text-sm font-medium">{t('science.theory.dualControl.international')}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">{t('science.theory.repression.title')}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t('science.theory.repression.description')}
                  </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-psychology-success" />
                    <span className="text-sm font-medium">{t('science.theory.repression.evidence')}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 量表构成 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-psychology-secondary" />
                {t('science.scales.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-6">
                  {[
                    {
                      name: t('science.scales.sis.name'),
                      fullName: t('science.scales.sis.fullName'),
                      items: t('science.scales.sis.items'),
                      author: t('science.scales.sis.author'),
                      reliability: t('science.scales.sis.reliability'),
                      desc: t('science.scales.sis.description'),
                      color: "bg-psychology-primary/10 border-psychology-primary/20"
                    },
                    {
                      name: t('science.scales.mosher.name'),
                      fullName: t('science.scales.mosher.fullName'), 
                      items: t('science.scales.mosher.items'),
                      author: t('science.scales.mosher.author'),
                      reliability: t('science.scales.mosher.reliability'),
                      desc: t('science.scales.mosher.description'),
                      color: "bg-psychology-secondary/10 border-psychology-secondary/20"
                    },
                    {
                      name: t('science.scales.kiss.name'),
                      fullName: t('science.scales.kiss.fullName'),
                      items: t('science.scales.kiss.items'), 
                      author: t('science.scales.kiss.author'),
                      reliability: t('science.scales.kiss.reliability'),
                      desc: t('science.scales.kiss.description'),
                      color: "bg-psychology-accent/10 border-psychology-accent/20"
                    },
                    {
                      name: t('science.scales.sos.name'),
                      fullName: t('science.scales.sos.fullName'),
                      items: t('science.scales.sos.items'),
                      author: t('science.scales.sos.author'), 
                      reliability: t('science.scales.sos.reliability'),
                      desc: t('science.scales.sos.description'),
                      color: "bg-psychology-warning/10 border-psychology-warning/20"
                    }
                  ].map((scale) => (
                    <Card key={scale.name} className={`${scale.color} border`}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-foreground">{scale.name}</h4>
                              <p className="text-sm text-muted-foreground">{scale.fullName}</p>
                            </div>
                            <Badge variant="secondary">{scale.items}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{scale.desc}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span><strong>{t('science.scales.authorLabel')}：</strong>{scale.author}</span>
                            <span><strong>{t('science.scales.reliabilityLabel')}：</strong>{scale.reliability}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SRI指数计算 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="w-6 h-6 text-psychology-accent" />
                {t('science.calculation.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">{t('science.calculation.dimensions.title')}</h4>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <div>1. <strong>{t('science.calculation.dimensions.sos')}</strong>：{t('science.calculation.dimensions.sosDesc')}</div>
                    <div>2. <strong>{t('science.calculation.dimensions.guilt')}</strong>：{t('science.calculation.dimensions.guiltDesc')}</div>
                    <div>3. <strong>{t('science.calculation.dimensions.shame')}</strong>：{t('science.calculation.dimensions.shameDesc')}</div>
                    <div>4. <strong>{t('science.calculation.dimensions.inhibition')}</strong>：{t('science.calculation.dimensions.inhibitionDesc')}</div>
                  </div>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">{t('science.calculation.zscore.title')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t('science.calculation.zscore.description')}
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">{t('science.calculation.mapping.title')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t('science.calculation.mapping.description')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 信效度验证 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-psychology-success" />
                {t('science.validation.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">{t('science.validation.reliability.title')}</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-psychology-success mt-0.5 flex-shrink-0" />
                      <span>{t('science.validation.reliability.item1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-psychology-success mt-0.5 flex-shrink-0" />
                      <span>{t('science.validation.reliability.item2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-psychology-success mt-0.5 flex-shrink-0" />
                      <span>{t('science.validation.reliability.item3')}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">{t('science.validation.validity.title')}</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Globe className="w-4 h-4 text-psychology-primary mt-0.5 flex-shrink-0" />
                      <span>{t('science.validation.validity.item1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-psychology-primary mt-0.5 flex-shrink-0" />
                      <span>{t('science.validation.validity.item2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-psychology-primary mt-0.5 flex-shrink-0" />
                      <span>{t('science.validation.validity.item3')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 使用建议 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Info className="w-6 h-6 text-psychology-warning" />
                {t('science.recommendations.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {t('science.recommendations.description')}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-psychology-primary/20">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-psychology-primary mb-2">{t('science.recommendations.education.title')}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t('science.recommendations.education.description')}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-psychology-secondary/20">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-psychology-secondary mb-2">{t('science.recommendations.self.title')}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t('science.recommendations.self.description')}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-psychology-accent/20">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-psychology-accent mb-2">{t('science.recommendations.therapy.title')}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t('science.recommendations.therapy.description')}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-psychology-success/20">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-psychology-success mb-2">{t('science.recommendations.research.title')}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t('science.recommendations.research.description')}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}