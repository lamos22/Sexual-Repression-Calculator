/**
 * 适应性量表系统 - 根据用户年龄和性经验调整题目
 * 为未成年人和无性经验用户提供适合的评估内容
 */

import {Demographics, LIKERT_OPTIONS, Scale} from '@/types';

// 青少年性态度量表（适用于14-17岁）
export const TEEN_SEXUAL_ATTITUDES: Scale = {
  id: 'teen_sexual_attitudes',
  name: '青少年性态度量表',
  description: '适用于青少年的性态度和性认知评估',
  questions: [
    {
      id: 'tsa_1',
      text: '我对性教育内容感到困惑',
      scale: 'teen_sexual_attitudes',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'tsa_2',
      text: '我觉得谈论性话题是尴尬的',
      scale: 'teen_sexual_attitudes',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'tsa_3',
      text: '我认为了解性知识是重要的',
      scale: 'teen_sexual_attitudes',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'tsa_4',
      text: '我对自己的身体变化感到不安',
      scale: 'teen_sexual_attitudes',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'tsa_5',
      text: '我担心别人会评判我的性想法',
      scale: 'teen_sexual_attitudes',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'tsa_6',
      text: '我觉得性冲动是不好的',
      scale: 'teen_sexual_attitudes',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'tsa_7',
      text: '我认为青少年不应该有性想法',
      scale: 'teen_sexual_attitudes',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'tsa_8',
      text: '我对媒体中的性内容感到不适',
      scale: 'teen_sexual_attitudes',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'tsa_9',
      text: '我觉得性教育应该在家庭中进行',
      scale: 'teen_sexual_attitudes',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'tsa_10',
      text: '我为自己的性好奇心感到羞耻',
      scale: 'teen_sexual_attitudes',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [10, 50]
  }
};

// 性认知量表（适用于无性经验用户）
export const SEXUAL_COGNITION: Scale = {
  id: 'sexual_cognition',
  name: '性认知量表',
  description: '测量对性的认知态度和心理准备度',
  questions: [
    {
      id: 'sc_1',
      text: '我对性这个话题感到紧张',
      scale: 'sexual_cognition',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sc_2',
      text: '我觉得性是自然而美好的',
      scale: 'sexual_cognition',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'sc_3',
      text: '我担心未来的性经历',
      scale: 'sexual_cognition',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sc_4',
      text: '我认为性只有在特定条件下才合适',
      scale: 'sexual_cognition',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sc_5',
      text: '我对性知识的了解感到不够',
      scale: 'sexual_cognition',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sc_6',
      text: '我觉得性幻想是不道德的',
      scale: 'sexual_cognition',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sc_7',
      text: '我认为性应该是爱情的表达',
      scale: 'sexual_cognition',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sc_8',
      text: '我对自己的性身体感到羞耻',
      scale: 'sexual_cognition',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sc_9',
      text: '我认为讨论性话题是重要的',
      scale: 'sexual_cognition',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'sc_10',
      text: '我担心别人知道我的性想法',
      scale: 'sexual_cognition',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [10, 50]
  }
};

// 修改过的SIS/SES量表（移除具体性行为相关题目）
export const SIS_SES_ADAPTED: Scale = {
  id: 'sis_ses_adapted',
  name: 'SIS/SES适应版量表',
  description: '适用于无性经验用户的性抑制/兴奋倾向量表',
  questions: [
    {
      id: 'sisa_1',
      text: '当我看到有吸引力的人时，我很容易产生浪漫想法',
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sisa_2',
      text: '浪漫的画面或故事很容易让我产生情感反应',
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sisa_3',
      text: '我很容易被浪漫情境所打动',
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sisa_4',
      text: '亲密接触的想法会让我紧张',
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sisa_5',
      text: '我担心在亲密关系中让对方失望',
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sisa_6',
      text: '我觉得在亲密关系中需要很多条件才能放松',
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sisa_7',
      text: '如果感到有风险，我会避免亲密接触',
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sisa_8',
      text: '陌生或不熟悉的环境会让我难以表达亲密情感',
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [8, 40]
  }
};

/**
 * 根据用户特征确定适合的量表组合
 * @param demographics 用户人口学信息
 * @returns 适合的量表ID数组
 */
export function getAdaptiveScales(demographics: Demographics): string[] {
  const ageValue = parseInt(demographics.age);
  const sexualActivity = parseInt(demographics.sexualActivity);
  
  // 14-17岁未成年人
  if (ageValue === 0) {
    return [
      'teen_sexual_attitudes',  // 10题
      'sexual_cognition',       // 10题
      'sis_ses_adapted',        // 8题
      'sos_screening'           // 5题 (保持原有)
    ]; // 总计 33题
  }
  
  // 无性经验的成年人
  if (sexualActivity === 0) {
    return [
      'sexual_cognition',       // 10题
      'sis_ses_adapted',        // 8题
      'mosher_guilt',           // 10题 (简化版)
      'kiss9_shame',            // 9题
      'sos_screening'           // 5题
    ]; // 总计 42题
  }
  
  // 有性经验但活跃度低的用户
  if (sexualActivity === 1) {
    return [
      'sis_ses_sf',             // 14题
      'mosher_guilt',           // 10题
      'kiss9_shame',            // 9题
      'sos_screening'           // 5题
    ]; // 总计 38题
  }
  
  // 默认标准量表（有一定性经验的用户）
  return [
    'sis_ses_sf',               // 14题
    'mosher_guilt',             // 10题
    'kiss9_shame',              // 9题
    'sos_screening'             // 5题
  ]; // 总计 38题
}

/**
 * 获取适应性量表的完整版配置
 * @param demographics 用户人口学信息
 * @returns 完整版量表ID数组
 */
export function getAdaptiveFullScales(demographics: Demographics): string[] {
  const ageValue = parseInt(demographics.age);
  const sexualActivity = parseInt(demographics.sexualActivity);
  
  // 14-17岁未成年人 - 扩展版但仍适合年龄
  if (ageValue === 0) {
    return [
      'teen_sexual_attitudes',  // 10题
      'sexual_cognition',       // 10题
      'sis_ses_adapted',        // 8题
      'sos_full',               // 21题 (完整版)
      'kiss9_shame'             // 9题
    ]; // 总计 58题
  }
  
  // 无性经验的成年人 - 适应版完整套装
  if (sexualActivity === 0) {
    return [
      'sexual_cognition',       // 10题
      'sis_ses_adapted',        // 8题
      'mosher_guilt_full',      // 28题
      'kiss9_shame',            // 9题
      'sos_full',               // 21题
      'bsas_brief'              // 23题
    ]; // 总计 99题
  }
  
  // 默认完整版量表
  return [
    'sis_ses_full',             // 45题
    'mosher_guilt_full',        // 28题
    'kiss9_shame',              // 9题
    'sos_full',                 // 21题
    'bsas_brief'                // 23题
  ]; // 总计 126题
}

/**
 * 检查用户是否为未成年人
 * @param demographics 用户人口学信息
 * @returns 是否为未成年人
 */
export function isMinor(demographics: Demographics): boolean {
  return parseInt(demographics.age) === 0; // age值为0代表14-17岁
}

/**
 * 检查用户是否无性经验
 * @param demographics 用户人口学信息
 * @returns 是否无性经验
 */
export function isInexperienced(demographics: Demographics): boolean {
  return parseInt(demographics.sexualActivity) === 0; // sexualActivity值为0代表从未有过性行为
}

/**
 * 获取用户群体的描述
 * @param demographics 用户人口学信息
 * @returns 用户群体描述
 */
export function getUserGroupDescription(demographics: Demographics): string {
  if (isMinor(demographics)) {
    return '青少年适应版';
  }
  
  if (isInexperienced(demographics)) {
    return '无性经验适应版';
  }
  
  const sexualActivity = parseInt(demographics.sexualActivity);
  if (sexualActivity === 1) {
    return '低活跃度适应版';
  }
  
  return '标准版';
}