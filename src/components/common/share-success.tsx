/**
 * 分享成功提示组件 - 分享操作完成后的反馈
 * 提供友好的成功反馈和后续操作建议
 */

import React, {useEffect, useState} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {ArrowRight, CheckCircle, Heart, Share2, Sparkles, Users} from 'lucide-react';
import {useNavigate} from 'react-router-dom';

export interface ShareSuccessProps {
  show: boolean;
  onClose: () => void;
  platform?: string;
}

export function ShareSuccess({ show, onClose, platform }: ShareSuccessProps) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      // 3秒后自动隐藏
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300); // 等待动画完成
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const getPlatformInfo = (platform?: string) => {
    switch (platform) {
      case 'weibo':
        return { name: '微博', color: 'bg-orange-500', icon: '微' };
      case 'wechat':
        return { name: '微信', color: 'bg-green-500', icon: '💬' };
      case 'qzone':
        return { name: 'QQ空间', color: 'bg-yellow-500', icon: 'Q' };
      case 'douban':
        return { name: '豆瓣', color: 'bg-purple-500', icon: '豆' };
      default:
        return { name: '社交媒体', color: 'bg-blue-500', icon: '📱' };
    }
  };

  const platformInfo = getPlatformInfo(platform);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <Card className={`w-full max-w-md transform transition-all duration-300 ${visible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        <CardContent className="p-8 text-center space-y-6">
          {/* 成功动画图标 */}
          <div className="relative">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <div className="absolute -top-1 -right-1">
              <div className={`w-8 h-8 ${platformInfo.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                {typeof platformInfo.icon === 'string' && platformInfo.icon.length === 1 
                  ? platformInfo.icon 
                  : <Share2 className="w-4 h-4" />
                }
              </div>
            </div>
            {/* 装饰性光效 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" style={{ 
                transform: 'translate(24px, -24px)'
              }} />
            </div>
          </div>
          
          {/* 成功消息 */}
          <div>
            <h3 className="text-xl font-bold text-green-600 mb-2">
              分享成功！
            </h3>
            <p className="text-muted-foreground">
              已成功分享到{platformInfo.name}，感谢您推荐SRI评估工具！
            </p>
          </div>
          
          {/* 统计信息 */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <Users className="w-5 h-5" />
              <span className="font-medium">帮助更多人了解心理健康</span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              您的分享可能会帮助朋友更好地认识自己
            </p>
          </div>
          
          {/* 操作按钮 */}
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/assessment')}
              className="w-full bg-psychology-primary hover:bg-psychology-primary/90"
            >
              <Heart className="w-4 h-4 mr-2" />
              邀请朋友来测评
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => {
                setVisible(false);
                setTimeout(onClose, 300);
              }}
              className="w-full"
            >
              继续浏览结果
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}