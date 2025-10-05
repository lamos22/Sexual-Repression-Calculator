/**
 * 人口学信息工具函数 - 将数字代码转换为可读的文字描述
 * 用于在历史记录等页面中显示更直观的用户信息
 */

import {DEMOGRAPHICS_QUESTIONS} from '@/lib/scales';

/**
 * 根据问题ID和值获取对应的文字标签
 * @param questionId 问题ID (age, gender, relationshipStatus, sexualActivity, religiousCultural)
 * @param value 数字值或字符串值
 * @returns 对应的文字标签
 */
export function getDemographicsLabel(questionId: string, value: string | number): string {
  const question = DEMOGRAPHICS_QUESTIONS.find(q => q.id === questionId);
  if (!question) {
    return value.toString();
  }

  const numericValue = typeof value === 'string' ? parseInt(value) : value;
  const option = question.options.find(opt => opt.value === numericValue);
  
  return option?.label || value.toString();
}

/**
 * 获取年龄段的文字描述
 * @param ageValue 年龄值 (0-5)
 * @returns 年龄段文字描述
 */
export function getAgeLabel(ageValue: string | number): string {
  return getDemographicsLabel('age', ageValue);
}

/**
 * 获取性别的文字描述
 * @param genderValue 性别值 (1-4)
 * @returns 性别文字描述
 */
export function getGenderLabel(genderValue: string | number): string {
  return getDemographicsLabel('gender', genderValue);
}

/**
 * 获取关系状态的文字描述
 * @param relationshipValue 关系状态值 (1-4)
 * @returns 关系状态文字描述
 */
export function getRelationshipStatusLabel(relationshipValue: string | number): string {
  return getDemographicsLabel('relationshipStatus', relationshipValue);
}

/**
 * 获取性活跃度的文字描述
 * @param sexualActivityValue 性活跃度值 (0-3)
 * @returns 性活跃度文字描述
 */
export function getSexualActivityLabel(sexualActivityValue: string | number): string {
  return getDemographicsLabel('sexualActivity', sexualActivityValue);
}

/**
 * 获取宗教文化背景的文字描述
 * @param religiousCulturalValue 宗教文化背景值
 * @returns 宗教文化背景文字描述
 */
export function getReligiousCulturalLabel(religiousCulturalValue: string | number): string {
  return getDemographicsLabel('religiousCultural', religiousCulturalValue);
}

/**
 * 批量转换人口学信息为可读格式
 * @param demographics 人口学信息对象
 * @returns 转换后的可读信息对象
 */
export function formatDemographicsForDisplay(demographics: {
  age: string;
  gender: string;
  relationshipStatus: string;
  sexualActivity: string;
  religiousCultural?: string;
}) {
  return {
    age: getAgeLabel(demographics.age),
    gender: getGenderLabel(demographics.gender),
    relationshipStatus: getRelationshipStatusLabel(demographics.relationshipStatus),
    sexualActivity: getSexualActivityLabel(demographics.sexualActivity),
    religiousCultural: demographics.religiousCultural 
      ? getReligiousCulturalLabel(demographics.religiousCultural)
      : undefined
  };
}