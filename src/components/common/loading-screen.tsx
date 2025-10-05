/**
 * 加载屏幕组件 - 提供统一的加载状态显示
 * 用于各种异步操作的等待界面
 */

import React from 'react';
import {Card} from '@/components/ui/card';
import {Progress} from '@/components/ui/progress';
import {BarChart3, Brain, Loader2, Shield} from 'lucide-react';

interface LoadingScreenProps {
  title?: string;
  description?: string;
  progress?: number;
  steps?: string[];
  currentStep?: number;
}

export function LoadingScreen({
  title = "处理中",
  description = "请稍候...",
  progress,
  steps = [],
  currentStep = 0
}: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-psychology-calm via-white to-psychology-warm flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center space-y-6">
        <div className="w-16 h-16 bg-psychology-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Brain className="w-8 h-8 text-psychology-primary animate-pulse" />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-psychology-primary mb-2">
            {title}
          </h2>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>

        {progress !== undefined && (
          <div className="space-y-3">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {Math.round(progress)}% 完成
            </p>
          </div>
        )}

        {steps.length > 0 && (
          <div className="space-y-3">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              
              return (
                <div 
                  key={index}
                  className={`
                    flex items-center gap-3 text-sm p-2 rounded transition-colors
                    ${
                      isCompleted 
                        ? 'text-green-600 bg-green-50' 
                        : isCurrent 
                          ? 'text-psychology-primary bg-psychology-primary/5'
                          : 'text-muted-foreground'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Shield className="w-4 h-4 text-green-500" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-psychology-primary animate-spin" />
                  ) : (
                    <BarChart3 className="w-4 h-4" />
                  )}
                  <span>{step}</span>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}

/**
 * 简化的加载指示器
 */
export function SimpleLoader({ message = "加载中..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 p-4">
      <Loader2 className="w-5 h-5 animate-spin text-psychology-primary" />
      <span className="text-muted-foreground">{message}</span>
    </div>
  );
}

/**
 * 内联加载状态
 */
export function InlineLoader({ size = "sm" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <Loader2 className={`${sizeClasses[size]} animate-spin text-psychology-primary`} />
  );
}