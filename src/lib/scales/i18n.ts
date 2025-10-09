import { Scale, Question, QuestionOption } from '@/types';
import { ALL_SCALES } from './index';
import i18n from '@/i18n';

// 加载国际化资源
const zhScales = require('@/i18n/locales/scales/zh.json');
const enScales = require('@/i18n/locales/scales/en.json');

/**
 * 获取国际化后的量表
 * @param scaleId 量表ID
 * @returns 国际化后的量表
 */
export function getLocalizedScale(scaleId: string): Scale | undefined {
  const scale = ALL_SCALES[scaleId];
  if (!scale) return undefined;

  // 获取当前语言的翻译资源
  const translations = i18n.language === 'zh' ? zhScales : enScales;
  const scaleTranslations = translations.scales[scaleId];

  if (!scaleTranslations) {
    // 如果没有翻译，返回原始量表
    return scale;
  }

  // 创建国际化后的量表
  const localizedScale: Scale = {
    ...scale,
    name: scaleTranslations.name || scale.name,
    description: scaleTranslations.description || scale.description,
    questions: scale.questions.map(question => {
      return getLocalizedQuestion(question, scaleTranslations);
    })
  };

  return localizedScale;
}

/**
 * 获取国际化后的问题
 * @param question 原始问题
 * @param scaleTranslations 量表翻译资源
 * @returns 国际化后的问题
 */
function getLocalizedQuestion(question: Question, scaleTranslations: any): Question {
  // 获取问题文本的翻译
  const questionText = scaleTranslations.questions?.[question.id] || question.text;

  // 获取选项的翻译
  const localizedOptions = question.options.map(option => {
    return getLocalizedOption(option);
  });

  return {
    ...question,
    text: questionText,
    options: localizedOptions
  };
}

/**
 * 获取国际化后的选项
 * @param option 原始选项
 * @returns 国际化后的选项
 */
function getLocalizedOption(option: QuestionOption): QuestionOption {
  // 获取当前语言的翻译资源
  const translations = i18n.language === 'zh' ? zhScales : enScales;
  
  // 根据选项值查找对应的标签
  let label = option.label;
  
  // 检查是否是李克特量表选项
  if (Object.values(translations.options.likert).includes(option.label)) {
    // 查找对应的值
    const entry = Object.entries(translations.options.likert).find(([key, value]) => value === option.label);
    if (entry) {
      const [valueKey] = entry;
      label = translations.options.likert[valueKey] || option.label;
    }
  }
  
  // 检查是否是频率选项
  if (Object.values(translations.options.frequency).includes(option.label)) {
    // 查找对应的值
    const entry = Object.entries(translations.options.frequency).find(([key, value]) => value === option.label);
    if (entry) {
      const [valueKey] = entry;
      label = translations.options.frequency[valueKey] || option.label;
    }
  }

  return {
    ...option,
    label
  };
}

/**
 * 获取国际化后的人口学问题
 * @returns 国际化后的人口学问题数组
 */
export function getLocalizedDemographicsQuestions() {
  // 获取当前语言的翻译资源
  const translations = i18n.language === 'zh' ? zhScales : enScales;
  const demoTranslations = translations.demographics;

  // 导入原始的人口学问题
  const { DEMOGRAPHICS_QUESTIONS } = require('./index');

  return DEMOGRAPHICS_QUESTIONS.map((question: any) => {
    // 获取问题文本的翻译
    const questionText = demoTranslations.questions?.[question.id] || question.text;

    // 获取选项的翻译
    const localizedOptions = question.options.map((option: any) => {
      // 获取选项标签的翻译
      const optionLabel = demoTranslations.options?.[question.id]?.[option.value] || option.label;
      
      return {
        ...option,
        label: optionLabel
      };
    });

    return {
      ...question,
      text: questionText,
      options: localizedOptions
    };
  });
}