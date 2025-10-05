/**
 * 使用指南页面 - 详细的测评指导和注意事项
 * 帮助用户了解如何正确使用SRI评估工具
 */

import React from 'react';
import {Link} from 'react-router-dom';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Separator} from '@/components/ui/separator';
import {
    AlertTriangle,
    ArrowRight,
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

export default function Guide() {
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
                首页
              </Link>
              <Link to="/science" className="text-muted-foreground hover:text-foreground transition-colors">
                科学依据
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <BookOpen className="w-16 h-16 text-psychology-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground mb-4">
            使用指南
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            详细了解如何正确使用性压抑指数(SRI)评估工具，获得准确可靠的测评结果
          </p>
        </div>

        <div className="space-y-8">
          {/* 快速开始 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="w-6 h-6 text-psychology-primary" />
                快速开始
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-psychology-primary/10 text-psychology-primary">
                      快测版
                    </Badge>
                    <span className="text-sm text-muted-foreground">推荐首次使用</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-psychology-secondary" />
                      <span>约 8-15 分钟</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-psychology-secondary" />
                      <span>39 道核心题目</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-psychology-success" />
                      <span>涵盖四个核心维度</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-psychology-accent/10 text-psychology-accent">
                      完整版
                    </Badge>
                    <span className="text-sm text-muted-foreground">深度分析</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-psychology-secondary" />
                      <span>约 25-40 分钟</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-psychology-secondary" />
                      <span>78 道详细题目</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-psychology-accent" />
                      <span>更全面的心理分析</span>
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
                测评流程
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4">
                  {[
                    { step: 1, title: "知情同意", desc: "阅读并同意参与测评的条款", icon: Shield },
                    { step: 2, title: "基本信息", desc: "填写必要的人口学信息（完全匿名）", icon: Users },
                    { step: 3, title: "问卷作答", desc: "按照个人实际情况诚实回答问题", icon: FileText },
                    { step: 4, title: "查看结果", desc: "获得详细的SRI指数分析报告", icon: Brain }
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
                答题建议
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {[
                  {
                    title: "诚实作答",
                    desc: "请根据您的真实想法和感受作答，没有标准答案",
                    icon: Heart,
                    color: "text-psychology-success"
                  },
                  {
                    title: "直觉反应",
                    desc: "相信第一直觉，不要过度思考每个问题",
                    icon: Brain,
                    color: "text-psychology-primary"
                  },
                  {
                    title: "完整作答",
                    desc: "尽量完成所有问题，跳过太多会影响结果准确性",
                    icon: Target,
                    color: "text-psychology-secondary"
                  },
                  {
                    title: "隐私环境",
                    desc: "在私密、不被打扰的环境中完成测评",
                    icon: Shield,
                    color: "text-psychology-accent"
                  }
                ].map(({ title, desc, icon: Icon, color }) => (
                  <div key={title} className="flex items-start gap-3 p-3 border border-border/50 rounded-lg">
                    <Icon className={`w-5 h-5 ${color} mt-0.5 flex-shrink-0`} />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">{title}</h4>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 注意事项 */}
          <Card className="sri-card border-psychology-warning/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-psychology-warning">
                <AlertTriangle className="w-6 h-6" />
                重要注意事项
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-psychology-warning/5 border border-psychology-warning/20 rounded-lg p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-psychology-warning rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>非诊断工具：</strong>SRI指数仅供自我了解和学术研究，不能替代专业心理咨询或医疗诊断</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-psychology-warning rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>隐私保护：</strong>所有数据仅在您的设备本地存储，不会上传到任何服务器</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-psychology-warning rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>适用年龄：</strong>本测评适用于18岁以上成年人，未成年人请在监护人指导下使用</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-psychology-warning rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>心理健康：</strong>如果在测评过程中感到强烈不适，请立即停止并寻求专业帮助</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 结果解读 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Info className="w-6 h-6 text-psychology-secondary" />
                结果解读指南
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">SRI指数范围</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                    {[
                      { range: "0-20", label: "很低", color: "bg-psychology-success/10 text-psychology-success" },
                      { range: "20-40", label: "偏低", color: "bg-green-100 text-green-700" },
                      { range: "40-60", label: "中等", color: "bg-yellow-100 text-yellow-700" },
                      { range: "60-80", label: "偏高", color: "bg-psychology-warning/10 text-psychology-warning" },
                      { range: "80-100", label: "很高", color: "bg-psychology-danger/10 text-psychology-danger" }
                    ].map(({ range, label, color }) => (
                      <div key={range} className={`p-2 rounded text-center ${color}`}>
                        <div className="font-medium">{range}</div>
                        <div className="text-xs">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">四个维度</h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    {[
                      { name: "性观感反向", desc: "对性刺激的消极情绪反应" },
                      { name: "性内疚", desc: "性相关的内疚感和道德负担" },
                      { name: "性羞耻", desc: "性身份和行为的羞耻体验" },
                      { name: "抑制优势", desc: "性抑制相对于性兴奋的优势程度" }
                    ].map(({ name, desc }) => (
                      <div key={name} className="p-3 bg-muted/30 rounded">
                        <div className="font-medium text-foreground">{name}</div>
                        <div className="text-muted-foreground">{desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 行动按钮 */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="bg-psychology-primary hover:bg-psychology-primary/90">
                <Link to="/assessment?type=quick" className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  开始快速测评
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/assessment?type=full" className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  完整版测评
                </Link>
              </Button>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                返回首页
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}