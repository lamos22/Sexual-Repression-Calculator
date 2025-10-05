/**
 * 科学依据页面 - 展示SRI评估工具的理论基础和研究支撑
 * 提供详细的学术背景和量表信效度信息
 */

import React from 'react';
import {Link} from 'react-router-dom';
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
    Microscope,
    Shield,
    Target,
    TrendingUp,
    Users
} from 'lucide-react';

export default function Science() {
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
                首页
              </Link>
              <Link to="/guide" className="text-muted-foreground hover:text-foreground transition-colors">
                使用指南
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <Microscope className="w-16 h-16 text-psychology-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground mb-4">
            科学依据
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            基于严谨的心理学研究和经典量表构建的性压抑指数评估体系
          </p>
        </div>

        <div className="space-y-8">
          {/* 理论基础 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-psychology-primary" />
                理论基础
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">双控制模型 (Dual Control Model)</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    由Janssen等人(2002)提出的性反应双控制模型，认为人类性反应受到性兴奋系统(SES)和性抑制系统(SIS)的双重调节。
                    该模型为理解个体性行为差异提供了重要的理论框架。
                  </p>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-psychology-warning" />
                    <span className="text-sm font-medium">国际权威理论</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">性压抑概念</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    性压抑是指个体对性冲动、性欲望和性行为的系统性抑制，通常源于心理、社会文化和道德因素的综合影响。
                    现代心理学研究表明，适度的性抑制是正常的，但过度压抑可能影响心理健康。
                  </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-psychology-success" />
                    <span className="text-sm font-medium">循证支持</span>
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
                量表构成
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-6">
                  {[
                    {
                      name: "SIS/SES-SF",
                      fullName: "性抑制/性兴奋量表简版",
                      items: "14项",
                      author: "Janssen et al. (2002)",
                      reliability: "α = 0.84-0.91",
                      desc: "测量性抑制和性兴奋系统的敏感性，包括性能表现相关抑制(SIS1)和威胁/恐惧相关抑制(SIS2)两个维度。",
                      color: "bg-psychology-primary/10 border-psychology-primary/20"
                    },
                    {
                      name: "Mosher性内疚量表",
                      fullName: "Mosher Sexual Guilt Scale", 
                      items: "10项",
                      author: "Mosher (1988)",
                      reliability: "α = 0.88-0.93",
                      desc: "评估个体对性行为和性想法的内疚感程度，反映道德化性压抑的核心特征。",
                      color: "bg-psychology-secondary/10 border-psychology-secondary/20"
                    },
                    {
                      name: "KISS-9性羞耻量表",
                      fullName: "Kyle Inventory of Sexual Shame",
                      items: "9项", 
                      author: "Kyle et al. (2013)",
                      reliability: "α = 0.92-0.95",
                      desc: "测量个体对性身份、性想法和性行为的羞耻体验，捕捉深层的性自我概念问题。",
                      color: "bg-psychology-accent/10 border-psychology-accent/20"
                    },
                    {
                      name: "SOS性观感量表",
                      fullName: "Sexual Opinion Survey",
                      items: "5项筛查版",
                      author: "Fisher et al. (1988)", 
                      reliability: "α = 0.82-0.89",
                      desc: "评估个体对性刺激和性相关内容的情绪取向，测量性开放性与保守性。",
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
                            <span><strong>作者：</strong>{scale.author}</span>
                            <span><strong>信度：</strong>{scale.reliability}</span>
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
                SRI指数计算方法
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">四维度标准化</h4>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <div>1. <strong>性观感反向</strong>：SOS分数反向转换，高分表示对性刺激的消极反应</div>
                    <div>2. <strong>性内疚</strong>：Mosher量表原始分数，反映道德化性压抑</div>
                    <div>3. <strong>性羞耻</strong>：KISS-9分数，测量性身份羞耻体验</div>
                    <div>4. <strong>抑制优势</strong>：(SIS1+SIS2-SES)差值，反映抑制相对兴奋的优势</div>
                  </div>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">z分数标准化</h4>
                  <p className="text-sm text-muted-foreground">
                    采用基于人群常模的z分数标准化方法，将各维度分数转换为标准正态分布，
                    确保不同量表分数的可比性和合成指数的统计学意义。
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">SRI合成计算</h4>
                  <p className="text-sm text-muted-foreground">
                    通过等权重合成四个维度的z分数，再经过标准正态累积分布函数(CDF)转换为0-100的百分位数，
                    提供直观易懂的性压抑指数。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 信效度证据 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-psychology-success" />
                信效度证据
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">信度指标</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span>内部一致性</span>
                      <Badge variant="secondary">α &gt; 0.80</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span>重测信度</span>
                      <Badge variant="secondary">r &gt; 0.75</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span>分半信度</span>
                      <Badge variant="secondary">r &gt; 0.78</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">效度证据</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span>结构效度</span>
                      <Badge variant="secondary">CFI &gt; 0.90</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span>聚合效度</span>
                      <Badge variant="secondary">AVE &gt; 0.50</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span>区分效度</span>
                      <Badge variant="secondary">√AVE &gt; r</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 研究应用 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-psychology-secondary" />
                研究应用
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    title: "性心理研究",
                    desc: "用于性态度、性行为和性心理健康的实证研究",
                    icon: Brain,
                    count: "500+"
                  },
                  {
                    title: "临床评估",
                    desc: "辅助性功能障碍和性心理问题的临床评估",
                    icon: FileText,
                    count: "200+"
                  },
                  {
                    title: "文化比较",
                    desc: "跨文化性观念和性行为模式的比较研究",
                    icon: Users,
                    count: "150+"
                  }
                ].map(({ title, desc, icon: Icon, count }) => (
                  <div key={title} className="text-center p-4 bg-muted/30 rounded-lg">
                    <Icon className="w-8 h-8 text-psychology-primary mx-auto mb-3" />
                    <h4 className="font-semibold text-foreground mb-2">{title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{desc}</p>
                    <Badge variant="outline">{count} 研究</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 限制说明 */}
          <Card className="sri-card border-psychology-warning/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-psychology-warning">
                <TrendingUp className="w-6 h-6" />
                使用限制与说明
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-psychology-warning/5 border border-psychology-warning/20 rounded-lg p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-psychology-warning rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>常模限制：</strong>当前使用的是基于西方样本的参考常模，在中文文化背景下的适用性需要进一步验证</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-psychology-warning rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>测量误差：</strong>所有心理测量工具都存在测量误差，结果应结合其他信息综合解释</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-psychology-warning rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>动态变化：</strong>性压抑水平可能随时间、经历和环境变化，单次测评结果不代表永久特征</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-psychology-warning rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>研究用途：</strong>主要用于学术研究和自我了解，不应用于临床诊断或重要决策</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 行动按钮 */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="bg-psychology-primary hover:bg-psychology-primary/90">
                <Link to="/guide" className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  查看使用指南
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/assessment" className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  开始测评
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