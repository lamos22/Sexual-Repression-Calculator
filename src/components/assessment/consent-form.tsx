import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import {AlertTriangle, Eye, FileText, Shield, Users} from 'lucide-react';
import {Alert, AlertDescription} from '@/components/ui/alert';

interface ConsentFormProps {
  onConsent: (consented: boolean) => void;
  onBack?: () => void;
  isMinor?: boolean; // 是否为未成年人
}

export function ConsentForm({ onConsent, onBack, isMinor = false }: ConsentFormProps) {
  const [agreements, setAgreements] = useState({
    purpose: false,
    privacy: false,
    voluntary: false,
    nonDiagnostic: false,
    ...(isMinor && { parentalConsent: false, ageConfirmation: false })
  });

  const allAgreed = Object.values(agreements).every(Boolean);

  const handleAgreementChange = (key: keyof typeof agreements, checked: boolean) => {
    setAgreements(prev => ({ ...prev, [key]: checked }));
  };

  // 获取当前语言
  const currentLanguage = localStorage.getItem('language') || 'zh';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 主标题 */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-psychology-primary mb-2">
          {currentLanguage === 'en' ? 'Sexual Repression Index Assessment' : '性压抑指数评估'}
        </h1>
        <p className="text-muted-foreground text-lg">
          {currentLanguage === 'en' ? 
            'A professional psychological assessment tool based on scientific research' : 
            '基于科学研究的专业性心理健康评估工具'}
        </p>
      </div>

      {/* 知情同意书内容 */}
      <Card className="sri-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-psychology-primary" />
            {currentLanguage === 'en' ? 'Informed Consent' : '知情同意书'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 评估目的 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-psychology-secondary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">
                  {currentLanguage === 'en' ? 'Assessment Purpose' : '评估目的'}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentLanguage === 'en' ? 
                    'This assessment aims to help you understand your characteristics in sexual psychology, including emotional responses to sexual stimuli, sexual guilt, sexual shame experiences, and the balance between sexual inhibition and excitement. This is a self-exploration tool based on scientific research that can promote your understanding and awareness of sexual mental health.' : 
                    '本评估旨在帮助您了解自己在性心理方面的特征，包括对性相关刺激的情绪反应、性内疚感、性羞耻体验以及性抑制与兴奋的平衡。这是一个基于科学研究的自我探索工具，可以促进您对自身性心理健康的认知和理解。'}
                </p>
              </div>
            </div>
            <div className="ml-8">
              <label className="flex items-start gap-2 text-sm cursor-pointer">
                <Checkbox 
                  checked={agreements.purpose}
                  onCheckedChange={(checked) => handleAgreementChange('purpose', !!checked)}
                  className="mt-1"
                />
                <span>
                  {currentLanguage === 'en' ? 
                    'I understand that the purpose of this assessment is to help me understand my sexual psychological characteristics' : 
                    '我理解本评估的目的是帮助我了解自己的性心理特征'}
                </span>
              </label>
            </div>
          </div>

          {/* 隐私保护 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-psychology-secondary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">
                  {currentLanguage === 'en' ? 'Privacy Protection' : '隐私保护'}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentLanguage === 'en' ? 
                    'All your responses will be completely anonymized and stored only on your local device, not uploaded to any server. We do not collect any personally identifiable information. You can delete the locally saved data at any time, or choose to export the data for personal records. Your privacy and data security are our top priority.' : 
                    '您的所有回答将完全匿名化处理，仅保存在您的设备本地，不会上传到任何服务器。我们不收集任何可识别个人身份的信息。您可以随时删除本地保存的数据，也可以选择导出数据用于个人记录。您的隐私和数据安全是我们的首要关注。'}
                </p>
              </div>
            </div>
            <div className="ml-8">
              <label className="flex items-start gap-2 text-sm cursor-pointer">
                <Checkbox 
                  checked={agreements.privacy}
                  onCheckedChange={(checked) => handleAgreementChange('privacy', !!checked)}
                  className="mt-1"
                />
                <span>
                  {currentLanguage === 'en' ? 
                    'I understand that my data will be anonymized and stored only on the local device' : 
                    '我理解我的数据将被匿名化处理并仅保存在本地设备上'}
                </span>
              </label>
            </div>
          </div>

          {/* 自愿参与 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-psychology-secondary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">
                  {currentLanguage === 'en' ? 'Voluntary Participation' : '自愿参与'}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentLanguage === 'en' ? 
                    'Participation in this assessment is completely voluntary. You can exit the assessment at any time without explanation. For any questions that make you uncomfortable, you can choose to skip them. If you feel uncomfortable during the assessment, please stop immediately and seek help from a professional mental health service.' : 
                    '参与本评估完全基于自愿原则。您可以在任何时候退出评估，无需说明理由。对于任何让您感到不适的问题，您都可以选择跳过。评估过程中如果您感到不适，请立即停止并寻求专业心理健康服务的帮助。'}
                </p>
              </div>
            </div>
            <div className="ml-8">
              <label className="flex items-start gap-2 text-sm cursor-pointer">
                <Checkbox 
                  checked={agreements.voluntary}
                  onCheckedChange={(checked) => handleAgreementChange('voluntary', !!checked)}
                  className="mt-1"
                />
                <span>
                  {currentLanguage === 'en' ? 
                    'I understand that participation is voluntary and I can exit the assessment at any time' : 
                    '我理解参与是自愿的，可以随时退出评估'}
                </span>
              </label>
            </div>
          </div>

          {/* 非诊断性质 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-psychology-warning mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">
                  {currentLanguage === 'en' ? 'Non-Diagnostic Nature' : '非诊断性质'}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentLanguage === 'en' ? 
                    'The results of this assessment are for self-understanding and reflection only and <strong>cannot replace professional mental health diagnosis or treatment</strong>. If you have concerns about sexual mental health, it is recommended to consult qualified mental health professionals. The assessment results should not be used for medical decisions or self-diagnosis.' : 
                    '本评估结果仅供自我了解和反思使用，<strong>不能替代专业的心理健康诊断或治疗</strong>。如果您在性心理健康方面有困扰，建议咨询合格的心理健康专业人士。评估结果不应被用于医疗决策或自我诊断。'}
                </p>
              </div>
            </div>
            <div className="ml-8">
              <label className="flex items-start gap-2 text-sm cursor-pointer">
                <Checkbox 
                  checked={agreements.nonDiagnostic}
                  onCheckedChange={(checked) => handleAgreementChange('nonDiagnostic', !!checked)}
                  className="mt-1"
                />
                <span>
                  {currentLanguage === 'en' ? 
                    'I understand that this is not a medical diagnostic tool and I will seek professional help if needed' : 
                    '我理解这不是医疗诊断工具，如有需要会寻求专业帮助'}
                </span>
              </label>
            </div>
          </div>

          {/* 未成年人特殊条款 */}
          {isMinor && (
            <>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-psychology-warning mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2 text-psychology-warning">
                      {currentLanguage === 'en' ? 'Minor Protection Clause' : '未成年人保护条款'}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {currentLanguage === 'en' ? 
                        'You are about to participate in an assessment of sexual psychological cognition. As a minor, we pay special attention to your safety and well-being. The content of this assessment has been specially adjusted for adolescent groups and does not contain inappropriate content. <strong>It is strongly recommended that you participate in this assessment with the knowledge and consent of your parents or guardians.</strong>' : 
                        '您即将参与一个关于性心理认知的评估。作为未成年人，我们特别关注您的安全和福祉。本评估内容经过专门调整，适合青少年群体，不包含不当内容。<strong>强烈建议您在家长或监护人的知情和同意下参与本评估。</strong>'}
                    </p>
                  </div>
                </div>
                <div className="ml-8 space-y-2">
                  <label className="flex items-start gap-2 text-sm cursor-pointer">
                    <Checkbox 
                      checked={agreements.ageConfirmation}
                      onCheckedChange={(checked) => handleAgreementChange('ageConfirmation', !!checked)}
                      className="mt-1"
                    />
                    <span>
                      {currentLanguage === 'en' ? 
                        'I confirm that I am between 14-17 years old and understand that this is an educational self-awareness tool' : 
                        '我确认我的年龄在14-17岁之间，理解这是一个教育性的自我认知工具'}
                    </span>
                  </label>
                  <label className="flex items-start gap-2 text-sm cursor-pointer">
                    <Checkbox 
                      checked={agreements.parentalConsent}
                      onCheckedChange={(checked) => handleAgreementChange('parentalConsent', !!checked)}
                      className="mt-1"
                    />
                    <span>
                      {currentLanguage === 'en' ? 
                        'I have informed my parents or guardians about this assessment, or I am capable of making the decision to participate independently' : 
                        '我已告知家长或监护人关于此评估，或者我有能力独立做出参与决定'}
                    </span>
                  </label>
                </div>
              </div>
              
              <Alert className="border-psychology-warning">
                <AlertTriangle className="h-4 w-4 text-psychology-warning" />
                <AlertDescription className="text-sm">
                  <strong>{currentLanguage === 'en' ? 'Adolescent Special Reminder' : '青少年专用提醒'}:</strong> 
                  {currentLanguage === 'en' ? 
                    ' If you are experiencing distress in your studies, life, or emotions, please actively communicate with your parents, teachers, or school counselors. Confusion during adolescence is normal, and seeking help is a brave and wise choice.' : 
                    '如果您在学习、生活或情感方面遇到困扰，请主动与家长、老师或学校心理咨询师沟通。青少年时期的困惑是正常的，寻求帮助是勇敢和明智的选择。'}
                </AlertDescription>
              </Alert>
            </>
          )}

          {/* 重要提醒 */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>{currentLanguage === 'en' ? 'Important Reminder' : '重要提醒'}:</strong> 
              {currentLanguage === 'en' ? 
                ' If you are currently experiencing severe psychological distress, depression, anxiety, or suicidal tendencies, please seek help from professional mental health services immediately. This assessment is not suitable for people in acute psychological crisis.' : 
                '如果您目前正在经历严重的心理困扰、抑郁、焦虑或有自伤倾向，请立即寻求专业心理健康服务的帮助。本评估不适合处于急性心理危机状态的人群。'}
            </AlertDescription>
          </Alert>

          {/* 操作按钮 */}
          <div className="flex justify-between pt-4 border-t">
            {onBack && (
              <Button variant="outline" onClick={onBack}>
                {currentLanguage === 'en' ? 'Back' : '返回'}
              </Button>
            )}
            <div className="flex gap-3 ml-auto">
              <Button 
                variant="outline" 
                onClick={() => onConsent(false)}
              >
                {currentLanguage === 'en' ? 'I Disagree' : '我不同意'}
              </Button>
              <Button 
                onClick={() => onConsent(true)}
                disabled={!allAgreed}
                className="bg-psychology-primary hover:bg-psychology-primary/90"
              >
                {currentLanguage === 'en' ? 'I Agree and Start Assessment' : '我同意并开始评估'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 底部说明 */}
      <div className="text-center text-xs text-muted-foreground">
        <p>
          {currentLanguage === 'en' ? 
            'This tool is developed based on scientific research literature. The scales include SIS/SES-SF, Mosher Sexual Guilt Scale, KISS-9 Sexual Shame Scale, and other validated psychometric tools.' : 
            '本工具基于科学研究文献开发，量表来源包括 SIS/SES-SF、Mosher 性内疚量表、KISS-9 性羞耻量表等经过验证的心理测量工具。'}
        </p>
      </div>
    </div>
  );
}