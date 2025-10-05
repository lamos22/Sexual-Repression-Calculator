/**
 * 浮动社交分享按钮组件 - 移动端优化的分享体验
 * 提供快速分享到各大社交平台的浮动按钮
 */

import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,} from '@/components/ui/sheet';
import {CheckCircle2, Copy, MessageCircle, Share2, Smartphone} from 'lucide-react';
import {AssessmentSession} from '@/types';
import {copyToClipboard, generateShareText, generateShareUrl, getDeviceInfo, socialShareUrls} from '@/lib/share-utils';

export interface SocialShareFloatingProps {
  session: AssessmentSession;
  className?: string;
}

export function SocialShareFloating({ session, className }: SocialShareFloatingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!session.results) {
    return null;
  }

  const shareText = generateShareText(session);
  let shareUrl: string;
  try {
    shareUrl = generateShareUrl(session.id);
  } catch (error) {
    console.error('Failed to generate share URL:', error);
    shareUrl = window.location.origin;
  }
  const deviceInfo = getDeviceInfo();

  // 处理原生分享
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SRI性压抑指数评估结果',
          text: shareText,
          url: shareUrl,
        });
        setIsOpen(false);
        return;
      } catch (error) {
        console.log('Native share cancelled or failed');
      }
    }
  };

  // 处理复制链接
  const handleCopyLink = async () => {
    try {
      await copyToClipboard(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1500);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // 社交媒体分享
  const handleSocialShare = (platform: string) => {
    const urls = socialShareUrls(shareText, shareUrl);
    const targetUrl = urls[platform as keyof typeof urls];
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'width=600,height=400');
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className={`fixed bottom-6 right-6 z-50 rounded-full h-14 w-14 shadow-lg bg-psychology-primary hover:bg-psychology-primary/90 ${className}`}
        >
          <Share2 className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="bottom" className="h-auto max-h-[80vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-psychology-primary" />
            分享我的评估结果
          </SheetTitle>
          <SheetDescription>
            选择您喜欢的方式分享SRI评估结果
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* 原生分享（支持的设备） */}
          {deviceInfo.isMobile && navigator.share && (
            <Button
              onClick={handleNativeShare}
              className="w-full h-14 text-lg bg-psychology-primary hover:bg-psychology-primary/90"
            >
              <Smartphone className="w-6 h-6 mr-3" />
              系统分享
            </Button>
          )}

          {/* 社交媒体选项 */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-16 flex-col gap-2 bg-orange-50 hover:bg-orange-100 border-orange-200"
              onClick={() => handleSocialShare('weibo')}
            >
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">微</span>
              </div>
              <span className="text-sm">微博</span>
            </Button>

            <Button
              variant="outline"
              className="h-16 flex-col gap-2 bg-green-50 hover:bg-green-100 border-green-200"
              onClick={() => handleSocialShare('wechat')}
            >
              <MessageCircle className="w-8 h-8 text-green-600" />
              <span className="text-sm">微信</span>
            </Button>

            <Button
              variant="outline"
              className="h-16 flex-col gap-2 bg-yellow-50 hover:bg-yellow-100 border-yellow-200"
              onClick={() => handleSocialShare('qzone')}
            >
              <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">Q</span>
              </div>
              <span className="text-sm">QQ空间</span>
            </Button>

            <Button
              variant="outline"
              className="h-16 flex-col gap-2 bg-purple-50 hover:bg-purple-100 border-purple-200"
              onClick={() => handleSocialShare('douban')}
            >
              <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">豆</span>
              </div>
              <span className="text-sm">豆瓣</span>
            </Button>
          </div>

          {/* 复制链接 */}
          <Button
            variant="outline"
            onClick={handleCopyLink}
            className={`w-full h-12 ${copied ? 'text-green-600 border-green-200 bg-green-50' : ''}`}
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                已复制到剪贴板！
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 mr-2" />
                复制分享链接
              </>
            )}
          </Button>

          {/* 分享预览 */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium text-sm mb-2">分享预览</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {shareText.split('\n')[0]}...
            </p>
            <Badge variant="outline" className="mt-2 text-xs">
              匿名分享 · 隐私保护
            </Badge>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}