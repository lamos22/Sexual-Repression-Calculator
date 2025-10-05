/**
 * 分享卡片组件 - 优化的分享内容展示
 * 为分享结果提供美观的卡片式展示
 */

import React from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Progress} from '@/components/ui/progress';
import {BarChart3, Brain, Sparkles} from 'lucide-react';
import {AssessmentSession, SRI_LEVELS} from '@/types';

interface ShareCardProps {
  session: AssessmentSession;
  compact?: boolean;
  showBranding?: boolean;
}

export function ShareCard({ session, compact = false, showBranding = true }: ShareCardProps) {
  if (!session.results) {
    return null;
  }

  const sri = session.results.sri;
  const levelInfo = SRI_LEVELS[sri.level];

  // 获取等级颜色
  const getLevelColor = (level: keyof typeof SRI_LEVELS) => {
    switch (level) {
      case 'very-low':
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

  if (compact) {
    return (
      <Card className="w-full max-w-sm bg-gradient-to-br from-psychology-primary/5 to-psychology-accent/5 border-psychology-primary/20">
        <CardContent className="p-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Brain className="w-6 h-6 text-psychology-primary" />
            <span className="font-bold text-psychology-primary">SRI</span>
          </div>
          
          <div className="text-3xl font-bold text-psychology-primary">
            {Math.round(sri.totalScore)}
          </div>
          
          <Badge 
            className={`text-sm px-3 py-1 ${getLevelColor(sri.level)}`}
            variant="outline"
          >
            {levelInfo.label}
          </Badge>
          
          <div className="w-full">
            <Progress value={sri.totalScore} className="h-2" />
          </div>
          
          {showBranding && (
            <div className="text-xs text-muted-foreground">
              性压抑指数计算器
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-psychology-primary/5 to-psychology-accent/5 border-psychology-primary/20">
      <CardContent className="p-8 text-center space-y-6">
        {showBranding && (
          <div className="flex items-center justify-center gap-3">
            <Brain className="w-8 h-8 text-psychology-primary" />
            <div className="text-left">
              <h3 className="text-lg font-bold text-psychology-primary">
                SRI 性压抑指数
              </h3>
              <p className="text-xs text-muted-foreground">
                Sexual Repression Index
              </p>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="text-5xl font-bold text-psychology-primary">
            {Math.round(sri.totalScore)}
          </div>
          
          <Badge 
            className={`text-base px-4 py-2 ${getLevelColor(sri.level)}`}
            variant="outline"
          >
            {levelInfo.label}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <Progress value={sri.totalScore} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <BarChart3 className="w-4 h-4" />
            <span>基于科学心理测量学</span>
          </div>
          
          {showBranding && (
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="w-3 h-3" />
              <span>专业评估工具 · 隐私保护</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * 生成分享卡片的图片URL
 * @param session 评估会话
 * @returns Promise<string> 图片URL
 */
export async function generateShareCardImage(session: AssessmentSession): Promise<string> {
  // 创建临时画布来生成分享图片
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx || !session.results) {
    throw new Error('无法生成分享图片');
  }
  
  const sri = session.results.sri;
  const levelInfo = SRI_LEVELS[sri.level];
  
  // 设置画布尺寸
  canvas.width = 400;
  canvas.height = 600;
  
  // 绘制背景
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#f8fafc');
  gradient.addColorStop(1, '#e2e8f0');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // 绘制卡片背景
  ctx.fillStyle = '#ffffff';
  if (ctx.roundRect) {
    ctx.roundRect(20, 40, canvas.width - 40, canvas.height - 80, 16);
  } else {
    // 如果不支持roundRect，使用普通矩形
    ctx.fillRect(20, 40, canvas.width - 40, canvas.height - 80);
  }
  ctx.fill();
  
  // 绘制边框
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 2;
  if (ctx.roundRect) {
    ctx.roundRect(20, 40, canvas.width - 40, canvas.height - 80, 16);
  } else {
    ctx.strokeRect(20, 40, canvas.width - 40, canvas.height - 80);
  }
  ctx.stroke();
  
  // 绘制大脑图标（简化版）
  ctx.fillStyle = '#1e40af';
  ctx.beginPath();
  ctx.arc(canvas.width / 2 - 20, 90, 8, 0, 2 * Math.PI);
  ctx.fill();
  
  // 绘制标题
  ctx.fillStyle = '#1e40af';
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SRI 性压抑指数', canvas.width / 2, 120);
  
  // 绘制分数
  ctx.fillStyle = '#1e40af';
  ctx.font = 'bold 72px Arial, sans-serif';
  ctx.fillText(Math.round(sri.totalScore).toString(), canvas.width / 2, 220);
  
  // 绘制等级
  ctx.fillStyle = '#64748b';
  ctx.font = '20px Arial, sans-serif';
  ctx.fillText(levelInfo.label, canvas.width / 2, 260);
  
  // 绘制进度条背景
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(60, 300, canvas.width - 120, 8);
  
  // 绘制进度条
  const progressWidth = (canvas.width - 120) * (sri.totalScore / 100);
  ctx.fillStyle = '#1e40af';
  ctx.fillRect(60, 300, progressWidth, 8);
  
  // 绘制刻度
  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('0', 60, 325);
  ctx.textAlign = 'center';
  ctx.fillText('50', canvas.width / 2, 325);
  ctx.textAlign = 'right';
  ctx.fillText('100', canvas.width - 60, 325);
  
  // 绘制底部信息
  ctx.fillStyle = '#64748b';
  ctx.font = '14px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('基于科学心理测量学的专业评估工具', canvas.width / 2, 380);
  
  // 绘制隐私说明
  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px Arial, sans-serif';
  ctx.fillText('匿名分享 · 隐私保护', canvas.width / 2, 420);
  
  // 绘制网站信息
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '10px Arial, sans-serif';
  ctx.fillText('SRI Calculator · sri-assessment.com', canvas.width / 2, 450);
  
  // 转换为图片URL
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          resolve(url);
        } else {
          reject(new Error('无法生成图片'));
        }
      }, 'image/png');
    } catch (error) {
      reject(error);
    }
  });
}

// 添加 roundRect polyfill（如果浏览器不支持）
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x: number, y: number, width: number, height: number, radius: number) {
    this.beginPath();
    this.moveTo(x + radius, y);
    this.lineTo(x + width - radius, y);
    this.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.lineTo(x + width, y + height - radius);
    this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.lineTo(x + radius, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.lineTo(x, y + radius);
    this.quadraticCurveTo(x, y, x + radius, y);
    this.closePath();
  };
}