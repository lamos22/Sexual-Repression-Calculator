import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 语言资源
import zhTranslations from './locales/zh.json';
import enTranslations from './locales/en.json';

// 语言资源映射
const resources = {
  zh: {
    translation: zhTranslations
  },
  en: {
    translation: enTranslations
  }
};

// 从 localStorage 获取语言偏好，如果没有则默认为中文
const savedLanguage = localStorage.getItem('language') || 'zh';

i18n
  .use(initReactI18next) // 将 i18n 实例传递给 react-i18next
  .init({
    resources,
    lng: savedLanguage, // 使用保存的语言或默认语言
    fallbackLng: 'zh', // 回退语言
    interpolation: {
      escapeValue: false // React 已经安全地处理了 XSS
    }
  });

export default i18n;