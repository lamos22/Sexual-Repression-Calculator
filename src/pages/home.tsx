/**
 * 主页组件 - 性压抑指数计算器的首页
 * 提供评估介绍、快速开始入口和功能说明
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github } from "lucide-react";
import { 
  Brain, 
  Clock, 
  Shield, 
  Users, 
  BarChart3, 
  FileText, 
  Heart,
  Zap,
  CheckCircle,
  Star,
  ArrowRight,
  BookOpen,
  Target,
  History
} from 'lucide-react';
import { Menu } from 'lucide-react'; // 添加菜单图标
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-psychology-calm via-white to-psychology-warm">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-8 h-8 bg-psychology-primary/10 rounded-full"></div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-psychology-accent/10 rounded-full"></div>
        <div className="absolute bottom-40 left-1/4 w-6 h-6 bg-psychology-secondary/10 rounded-full"></div>
        <div className="absolute bottom-32 right-20 w-10 h-10 bg-psychology-primary/5 rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* 导航栏 */}
        <nav className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-psychology-primary rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-psychology-primary">SRI Calculator</h1>
                <p className="text-xs text-muted-foreground">性压抑指数计算器</p>
              </div>
            </div>
            
          {/* 移动端菜单 - 只在小屏幕上显示 */}
<div className="md:hidden">
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="sm">
        <Menu className="w-5 h-5" />
      </Button>
    </SheetTrigger>
    <SheetContent side="right">
      <div className="flex flex-col gap-4 mt-4">
        <Button variant="ghost" size="sm" asChild className="justify-start">
          <Link to="/guide" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            使用指南
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild className="justify-start">
          <Link to="/science" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            科学依据
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild className="justify-start">
          <Link to="/history" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            历史记录
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild className="justify-start">
          <a 
            href="https://github.com/lamos22/Sexual-Repression-Calculator" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            GitHub仓库地址
          </a>
        </Button>
      </div>
    </SheetContent>
  </Sheet>
</div>
            {/* 桌面端菜单 */}
            {/* <div className="flex items-center gap-1 sm:gap-4"> */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild className="h-auto py-1.5">
                <Link to="/guide" className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-[10px] sm:text-sm">使用指南</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="h-auto py-1.5">
                <Link to="/science" className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="text-[10px] sm:text-sm">科学依据</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="h-auto py-1.5">
                <Link to="/history" className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2">
                  <History className="w-4 h-4" />
                  <span className="text-[10px] sm:text-sm">历史记录</span>
                </Link>
              </Button>
              {/* GitHub 链接 */}
  <Button variant="ghost" size="sm" asChild>
    <a 
      href="https://github.com/banlanzs/Sexual-Repression-Calculator" 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center"
    >
      <Github className="w-4 h-4" />
    </a>
  </Button>
            </div>
          </div>
        </nav>

        {/* 主要内容区域 */}
        <main className="container mx-auto px-4 pb-20">
          {/* 英雄区域 */}
          <section className="text-center mb-20">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-6 bg-psychology-primary/10 text-psychology-primary border-psychology-primary/20">
                <Heart className="w-4 h-4 mr-2" />
                基于科学研究的心理测评工具
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-psychology-primary via-psychology-secondary to-psychology-accent bg-clip-text text-transparent">
                性压抑指数计算器
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                专业的性心理健康自我评估工具，基于多个经过验证的心理测量量表，
                帮助您科学地了解自己的性心理特征，促进性健康和亲密关系的发展。
              </p>
              
              {/* 适应性评估亮点 */}
              <div className="bg-psychology-primary/5 border border-psychology-primary/20 rounded-xl p-6 mb-8 max-w-3xl mx-auto">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-psychology-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-psychology-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-psychology-primary mb-2">智能适应性评估</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      系统会根据您的年龄段和个人背景自动选择最适合的量表组合，为14-17岁青少年提供专门的保护机制，
                      为无性经验用户提供文化敏感的评估内容，确保每个人都能获得准确和适宜的评估体验。
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link to="/assessment?type=quick">
                  <Button size="lg" className="bg-psychology-primary hover:bg-psychology-primary/90 text-white px-8 py-4 text-lg">
                    <Zap className="w-5 h-5 mr-2" />
                    开始快速测评
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                
                <Link to="/assessment?type=full">
                  <Button size="lg" variant="outline" className="border-psychology-primary text-psychology-primary hover:bg-psychology-primary hover:text-white transition-colors px-8 py-4 text-lg">
                    <Target className="w-5 h-5 mr-2" />
                    完整版测评
                  </Button>
                </Link>
              </div>

              {/* 核心指标展示 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-psychology-primary/10">
                  <Clock className="w-8 h-8 text-psychology-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-psychology-primary">8-15</div>
                  <div className="text-sm text-muted-foreground">分钟快测</div>
                </div>
                
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-psychology-secondary/10">
                  <BarChart3 className="w-8 h-8 text-psychology-secondary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-psychology-secondary">4</div>
                  <div className="text-sm text-muted-foreground">核心维度</div>
                </div>
                
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-psychology-accent/10">
                  <Shield className="w-8 h-8 text-psychology-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold text-psychology-accent">100%</div>
                  <div className="text-sm text-muted-foreground">隐私保护</div>
                </div>
                
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-psychology-success/10">
                  <Users className="w-8 h-8 text-psychology-success mx-auto mb-2" />
                  <div className="text-2xl font-bold text-psychology-success">科学</div>
                  <div className="text-sm text-muted-foreground">研究验证</div>
                </div>
              </div>
            </div>
          </section>

          {/* 测评版本选择 */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">选择适合您的测评版本</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                我们提供两种测评版本，您可以根据可用时间和详细程度需求选择
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* 快测版 */}
              <Card className="sri-card relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-psychology-primary text-white">推荐</Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-psychology-primary/10 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-psychology-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-psychology-primary">快速测评版</CardTitle>
                      <p className="text-sm text-muted-foreground">适合初次使用和快速了解</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">SIS/SES-SF 14项量表</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">Mosher性内疚10项简版</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">KISS-9性羞耻量表</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">SOS性观感筛查版</span>
                    </div>
                  </div>

                  <div className="bg-psychology-primary/5 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">预计用时</span>
                      <span className="text-sm text-psychology-primary font-bold">8-15 分钟</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">题目数量</span>
                      <span className="text-sm text-psychology-primary font-bold">33-42 题</span>
                    </div>
                  </div>

                  <Link to="/assessment?type=quick" className="block">
                    <Button className="w-full bg-psychology-primary hover:bg-psychology-primary/90 text-white">
                      开始快速测评
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* 完整版 */}
              <Card className="sri-card relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-psychology-secondary/10 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-psychology-secondary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-psychology-secondary">完整测评版</CardTitle>
                      <p className="text-sm text-muted-foreground">更全面深入的专业分析</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">完整版SIS/SES量表</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">完整Mosher性内疚量表</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">KISS-9 + 额外维度分析</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">BSAS性态度量表校标</span>
                    </div>
                  </div>

                  <div className="bg-psychology-secondary/5 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">预计用时</span>
                      <span className="text-sm text-psychology-secondary font-bold">25-40 分钟</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">题目数量</span>
                      <span className="text-sm text-psychology-secondary font-bold">58-126 题</span>
                    </div>
                  </div>

                  <Link to="/assessment?type=full" className="block">
                    <Button variant="outline" className="w-full border-psychology-secondary text-psychology-secondary hover:bg-psychology-secondary hover:text-white transition-colors">
                      开始完整测评
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 科学性说明 */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">科学可靠的评估基础</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                基于国际认可的心理测量学量表，经过严格验证的科学工具
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="sri-card text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">双控制模型</h3>
                  <p className="text-sm text-muted-foreground">基于Janssen等人的SIS/SES双控制模型，测量性抑制和性兴奋系统</p>
                </CardContent>
              </Card>

              <Card className="sri-card text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">性内疚测量</h3>
                  <p className="text-sm text-muted-foreground">采用Mosher性内疚量表，评估性相关的内疚感和道德负担</p>
                </CardContent>
              </Card>

              <Card className="sri-card text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold mb-2">性羞耻评估</h3>
                  <p className="text-sm text-muted-foreground">使用KISS-9量表测量性相关的羞耻体验和自我接纳</p>
                </CardContent>
              </Card>

              <Card className="sri-card text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">性观感调查</h3>
                  <p className="text-sm text-muted-foreground">SOS量表评估对性刺激的情绪取向和接近回避倾向</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 隐私保护承诺 */}
          <section className="mb-20">
            <Card className="sri-card border-psychology-primary/20 bg-psychology-primary/5">
              <CardContent className="p-8 text-center">
                <Shield className="w-16 h-16 text-psychology-primary mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-psychology-primary mb-4">您的隐私是我们的首要关注</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
                  所有评估数据仅在您的设备本地处理和存储，不会上传到任何服务器。
                  您拥有完全的数据控制权，可以随时删除或导出您的评估历史。
                </p>
                <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">本地数据存储</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">完全匿名化</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">可随时删除</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA区域 */}
          <section className="text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">准备好开始您的性心理健康之旅了吗？</h2>
              <p className="text-lg text-muted-foreground mb-8">
                通过科学的自我评估，更好地了解自己，促进健康的性心理发展和亲密关系。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/assessment?type=quick">
                  <Button size="lg" className="bg-psychology-primary hover:bg-psychology-primary/90 text-white px-8 py-4">
                    <Zap className="w-5 h-5 mr-2" />
                    立即开始测评
                  </Button>
                </Link>
                <Button size="lg" variant="outline" asChild className="border-psychology-primary text-psychology-primary hover:bg-psychology-primary hover:text-white transition-colors px-8 py-4">
                  <Link to="/guide">
                    <BookOpen className="w-5 h-5 mr-2" />
                    了解更多信息
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        {/* 页脚 */}
        <footer className="border-t border-muted bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-6 h-6 text-psychology-primary" />
                  <span className="font-bold text-psychology-primary">SRI Calculator</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  基于科学研究的性压抑指数计算器，帮助您更好地了解自己的性心理健康。
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">评估工具</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link to="/assessment?type=quick" className="hover:text-psychology-primary">快速测评</Link></li>
                  <li><Link to="/assessment?type=full" className="hover:text-psychology-primary">完整测评</Link></li>
                  <li><Link to="/history" className="hover:text-psychology-primary">历史记录</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">资源</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link to="/guide" className="hover:text-psychology-primary">使用指南</Link></li>
                  <li><Link to="/science" className="hover:text-psychology-primary">科学依据</Link></li>
                  <li><a href="#" className="hover:text-psychology-primary">隐私政策</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">支持</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-psychology-primary">常见问题</a></li>
                  <li><a href="#" className="hover:text-psychology-primary">专业咨询</a></li>
                  <li><a href="#" className="hover:text-psychology-primary">危机资源</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-muted mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>© 2025 性压抑指数计算器. 仅供教育和自我了解使用，不能替代专业心理健康服务。</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
