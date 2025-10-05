/**
 * 结果分享组件 - 提供社交媒体分享功能
 * 支持微博、朋友圈、QQ空间、复制链接等分享方式
 */

import React, {useState} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Progress} from '@/components/ui/progress';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {Separator} from '@/components/ui/separator';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {Brain, CheckCircle2, Copy, Heart, Link, MessageCircle, QrCode, Share2, Smartphone} from 'lucide-react';
import {AssessmentSession, SRI_LEVELS} from '@/types';
import {copyToClipboard, generateQRCode, generateShareText, generateShareUrl, socialShareUrls} from '@/lib/share-utils';

export interface ShareResultProps {
  session: AssessmentSession;
  className?: string;
}

export function ShareResult({ session, className }: ShareResultProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  if (!session.results) {
    return null;
  }

  const sri = session.results.sri;
  const levelInfo = SRI_LEVELS[sri.level];
  const shareText = generateShareText(session);
  let shareUrl: string;
  try {
    shareUrl = generateShareUrl(session.id);
  } catch (error) {
    console.error('Failed to generate share URL:', error);
    shareUrl = window.location.origin;
  }

  // 处理复制链接
  const handleCopyLink = async () => {
    try {
      await copyToClipboard(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  // 生成二维码
  const handleGenerateQR = async () => {
    try {
      const qrUrl = await generateQRCode(shareUrl);
      setQrCodeUrl(qrUrl);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      // 显示错误提示或使用备用方案
      alert('二维码生成失败，请尝试复制链接分享');
    }
  };

  // 社交媒体分享
  const handleSocialShare = (platform: string) => {
    const urls = socialShareUrls(shareText, shareUrl);
    const targetUrl = urls[platform as keyof typeof urls];
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className={`flex items-center gap-2 ${className}`}
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">分享结果</span>
          </Button>
        </DialogTrigger>
        
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-psychology-primary" />
              分享我的SRI评估结果
            </DialogTitle>
            <DialogDescription>
              选择您喜欢的方式分享评估结果，所有数据都经过匿名化处理
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* 结果预览卡片 */}
            <Card className="bg-gradient-to-br from-psychology-primary/5 to-psychology-accent/5 border-psychology-primary/20">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <Brain className="w-8 h-8 text-psychology-primary" />
                    <div>
                      <h3 className="text-xl font-bold text-psychology-primary">
                        性压抑指数 (SRI)
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Sexual Repression Index
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-4xl font-bold text-psychology-primary">
                      {Math.round(sri.totalScore)}
                    </div>
                    <Badge 
                      className={`text-sm px-4 py-1 ${
                        sri.level === 'very-low' || sri.level === 'low'
                          ? 'text-green-600 bg-green-50 border-green-200'
                          : sri.level === 'moderate'
                          ? 'text-yellow-600 bg-yellow-50 border-yellow-200'
                          : 'text-orange-600 bg-orange-50 border-orange-200'
                      }`}
                      variant="outline"
                    >
                      {levelInfo.label}
                    </Badge>
                  </div>
                  
                  <div className="max-w-xs mx-auto">
                    <Progress value={sri.totalScore} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0</span>
                      <span>50</span>
                      <span>100</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    基于科学心理测量学的专业评估工具
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 分享选项 */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                社交媒体分享
              </h4>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-20 bg-blue-50 hover:bg-blue-100 border-blue-200"
                  onClick={() => handleSocialShare('weibo')}
                >
                  <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">微</span>
                  </div>
                  <span className="text-xs">微博</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-20 bg-green-50 hover:bg-green-100 border-green-200"
                  onClick={() => handleSocialShare('wechat')}
                >
                  <MessageCircle className="w-6 h-6 text-green-600" />
                  <span className="text-xs">微信</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-20 bg-yellow-50 hover:bg-yellow-100 border-yellow-200"
                  onClick={() => handleSocialShare('qzone')}
                >
                  <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Q</span>
                  </div>
                  <span className="text-xs">QQ空间</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-20 bg-purple-50 hover:bg-purple-100 border-purple-200"
                  onClick={() => handleSocialShare('douban')}
                >
                  <Heart className="w-6 h-6 text-purple-600" />
                  <span className="text-xs">豆瓣</span>
                </Button>
              </div>
            </div>

            <Separator />

            {/* 链接分享 */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Link className="w-4 h-4" />
                直接分享
              </h4>
              
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono break-all">
                    {shareUrl}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyLink}
                    className={copied ? 'text-green-600 border-green-200' : ''}
                  >
                    {copied ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateQR}
                  className="w-full"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  生成二维码
                </Button>
                
                {qrCodeUrl && (
                  <div className="flex justify-center p-4 bg-white rounded-lg border">
                    <img src={qrCodeUrl} alt="分享二维码" className="w-32 h-32" />
                  </div>
                )}
              </div>
            </div>

            {/* 预设文案 */}
            <div className="space-y-3">
              <h4 className="font-semibold">预设分享文案</h4>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {shareText}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(shareText)}
                  className="mt-2 text-xs"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  复制文案
                </Button>
              </div>
            </div>

            {/* 隐私提示 */}
            <Alert>
              <Brain className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>隐私保护：</strong>
                分享的结果经过匿名化处理，不包含个人身份信息。
                分享链接仅包含结果摘要，他人无法访问您的详细答题记录。
              </AlertDescription>
            </Alert>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

/**
 * 简化的分享按钮（用于移动端）
 */
export function ShareButtonMobile({ session, className }: ShareResultProps) {
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

  const handleShare = async () => {
    // 尝试使用原生分享API
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SRI性压抑指数评估结果',
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (error) {
        console.log('Native share failed, falling back to copy');
      }
    }

    // 回退到复制链接
    try {
      await copyToClipboard(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      className={`flex items-center gap-2 ${className}`}
    >
      {copied ? (
        <CheckCircle2 className="w-4 h-4 text-green-600" />
      ) : (
        <Share2 className="w-4 h-4" />
      )}
      <span className="hidden sm:inline">
        {copied ? '已复制' : '分享'}
      </span>
    </Button>
  );
}