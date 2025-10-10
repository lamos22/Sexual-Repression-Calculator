import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';

const LanguageSwitcher: React.FC = () => {
  const { t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
    // 保存语言选择到 localStorage
    localStorage.setItem('language', newLang);
    
    // 重新加载页面以确保所有组件都更新
    window.location.reload();
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage}
      className="ml-2"
    >
      {i18n.language === 'zh' ? 'EN' : '中文'}
    </Button>
  );
};

export default LanguageSwitcher;