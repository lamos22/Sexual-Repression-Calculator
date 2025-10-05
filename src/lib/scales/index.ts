/**
 * 心理量表定义 - 基于科学文献的标准化量表
 * 包含SIS/SES-SF、Mosher性内疚、KISS-9性羞耻、SOS筛查版等
 */

import {FREQUENCY_OPTIONS, LIKERT_OPTIONS, Scale} from '@/types';
import {SEXUAL_COGNITION, SIS_SES_ADAPTED, TEEN_SEXUAL_ATTITUDES} from './adaptive-scales';

// SIS/SES-SF 14项量表 (Sexual Inhibition/Sexual Excitation Scale - Short Form)
export const SIS_SES_SF: Scale = {
  id: 'sis_ses_sf',
  name: 'SIS/SES-SF 性抑制/性兴奋量表简版',
  description: 'Janssen等人开发的双控制模型量表，测量性抑制和性兴奋系统',
  questions: [
    // SES items (Sexual Excitation System)
    {
      id: 'ses_1',
      text: '当我看到有吸引力的人时，我很容易产生性幻想',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_2', 
      text: '性的画面或故事很容易让我兴奋',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_3',
      text: '我很容易被性唤起',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_4',
      text: '看到裸体会让我性兴奋',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    // SIS1 items (性能表现相关抑制)
    {
      id: 'sis1_1',
      text: '如果我担心性表现，我就很难维持性兴奋',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_2',
      text: '除非我确信不会让伴侣失望，否则我很难放松享受性生活',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_3',
      text: '当我想到可能无法满足伴侣时，我会失去性兴趣',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_4',
      text: '如果我担心自己的性表现，我就很难专注于性快感',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_5',
      text: '性活动中的分心想法会让我失去性兴奋',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    // SIS2 items (威胁/恐惧相关抑制)
    {
      id: 'sis2_1',
      text: '如果我认为有被发现的风险，我不太可能寻求性活动',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_2',
      text: '担心性传播疾病会降低我的性兴趣',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_3',
      text: '如果存在风险，我很难保持性兴奋',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_4',
      text: '担心怀孕会影响我的性兴趣',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_5',
      text: '陌生或不熟悉的环境会让我难以性兴奋',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [14, 70]
  }
};

// Mosher性内疚量表10项简版
export const MOSHER_GUILT: Scale = {
  id: 'mosher_guilt',
  name: 'Mosher性内疚量表',
  description: 'Mosher开发的性内疚量表，测量性相关的内疚感和道德负担',
  questions: [
    {
      id: 'mg_1',
      text: '性是某种肮脏的东西',
      scale: 'mosher_guilt',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_2',
      text: '自慰是有害的',
      scale: 'mosher_guilt',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_3',
      text: '只有在婚姻中性行为才是道德的',
      scale: 'mosher_guilt',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_4',
      text: '有性欲望让我感到内疚',
      scale: 'mosher_guilt',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_5',
      text: '性幻想是错误的',
      scale: 'mosher_guilt',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_6',
      text: '我因自己的性想法而感到羞耻',
      scale: 'mosher_guilt',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_7',
      text: '性是只有在特定条件下才能接受的东西',
      scale: 'mosher_guilt',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_8',
      text: '我担心我的性行为在道德上是错误的',
      scale: 'mosher_guilt',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_9',
      text: '享受性快感让我感到内疚',
      scale: 'mosher_guilt',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_10',
      text: '性冲动是需要控制的',
      scale: 'mosher_guilt',
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

// KISS-9性羞耻量表
export const KISS9_SHAME: Scale = {
  id: 'kiss9_shame',
  name: 'KISS-9性羞耻量表',
  description: 'Kyle等人开发的性羞耻简版量表，测量性相关的羞耻体验',
  questions: [
    {
      id: 'ks_1',
      text: '我对自己的性身体感到羞耻',
      scale: 'kiss9_shame',
      type: 'likert',
      options: Object.values(FREQUENCY_OPTIONS),
      required: true
    },
    {
      id: 'ks_2',
      text: '我为自己的性想法感到羞耻',
      scale: 'kiss9_shame',
      type: 'likert',
      options: Object.values(FREQUENCY_OPTIONS),
      required: true
    },
    {
      id: 'ks_3',
      text: '我为自己的性欲望感到羞耻',
      scale: 'kiss9_shame',
      type: 'likert',
      options: Object.values(FREQUENCY_OPTIONS),
      required: true
    },
    {
      id: 'ks_4',
      text: '我为自己的性行为感到羞耻',
      scale: 'kiss9_shame',
      type: 'likert',
      options: Object.values(FREQUENCY_OPTIONS),
      required: true
    },
    {
      id: 'ks_5',
      text: '我为自己的性感受感到羞耻',
      scale: 'kiss9_shame',
      type: 'likert',
      options: Object.values(FREQUENCY_OPTIONS),
      required: true
    },
    {
      id: 'ks_6',
      text: '我觉得我的性本质在某种程度上是有缺陷的',
      scale: 'kiss9_shame',
      type: 'likert',
      options: Object.values(FREQUENCY_OPTIONS),
      required: true
    },
    {
      id: 'ks_7',
      text: '我希望我能改变自己的性身份',
      scale: 'kiss9_shame',
      type: 'likert',
      options: Object.values(FREQUENCY_OPTIONS),
      required: true
    },
    {
      id: 'ks_8',
      text: '我觉得作为一个性存在，我让重要的人失望了',
      scale: 'kiss9_shame',
      type: 'likert',
      options: Object.values(FREQUENCY_OPTIONS),
      required: true
    },
    {
      id: 'ks_9',
      text: '我觉得我的性方面不如其他人',
      scale: 'kiss9_shame',
      type: 'likert',
      options: Object.values(FREQUENCY_OPTIONS),
      required: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [9, 45]
  }
};

// SOS筛查版（简化版本）
export const SOS_SCREENING: Scale = {
  id: 'sos_screening',
  name: 'SOS性观感筛查',
  description: '性观感调查的简化筛查版本，测量对性刺激的情绪取向',
  questions: [
    {
      id: 'sos_1',
      text: '我对色情内容感到不舒服',
      scale: 'sos_screening',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_2',
      text: '性相关的话题让我感到尴尬',
      scale: 'sos_screening',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_3',
      text: '我倾向于避免性暗示的内容',
      scale: 'sos_screening',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_4',
      text: '看到性相关的图像会让我感到不安',
      scale: 'sos_screening',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_5',
      text: '我觉得公开讨论性是不合适的',
      scale: 'sos_screening',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [5, 25]
  }
};

// SIS/SES完整版量表 (45项)
export const SIS_SES_FULL: Scale = {
  id: 'sis_ses_full',
  name: 'SIS/SES 性抑制/性兴奋量表完整版',
  description: 'Janssen等人开发的完整版双控制模型量表，全面测量性抑制和性兴奋系统',
  questions: [
    // SES items (Sexual Excitation System) - 16项
    ...SIS_SES_SF.questions.filter(q => q.id.startsWith('ses_')),
    {
      id: 'ses_5',
      text: '当我幻想与某人发生性关系时，我很容易被唤起',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_6',
      text: '性兴奋来得快去得也快',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_7',
      text: '当某人性感地触摸我时，我很容易被唤起',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_8',
      text: '某些气味会让我想起性并让我兴奋',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_9',
      text: '我很容易对不熟悉的人产生性兴趣',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_10',
      text: '当我听到别人谈论性时，我很容易被唤起',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_11',
      text: '音乐可以让我想起性并让我兴奋',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_12',
      text: '很多事情都能让我想起性',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_13',
      text: '我觉得自己性欲很强',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_14',
      text: '当我看电影中的浪漫场景时，我想到性',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_15',
      text: '我容易被多种类型的人吸引',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_16',
      text: '我经常发现自己在想性',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    // SIS1 items 完整版 - 14项
    ...SIS_SES_SF.questions.filter(q => q.id.startsWith('sis1_')),
    {
      id: 'sis1_6',
      text: '我需要我的生殖器被伴侣完全接受，否则我无法保持兴奋',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_7',
      text: '除非我确信伴侣对我有性吸引力，否则我很难专注于自己的快感',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_8',
      text: '如果我担心我的性表现会如何被评判，我会失去性兴奋',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_9',
      text: '除非我觉得自己在性方面有能力，否则我无法享受性',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_10',
      text: '我无法专注于性快感，因为我担心我的身体外观',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_11',
      text: '当我担心是否会达到高潮时，我很难保持性兴奋',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_12',
      text: '如果我觉得我被迫发生性关系，我会失去性兴趣',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_13',
      text: '除非感觉安全，否则我无法被性唤起',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_14',
      text: '如果我不确定我能满足伴侣，我很难变得兴奋',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    // SIS2 items 完整版 - 15项
    ...SIS_SES_SF.questions.filter(q => q.id.startsWith('sis2_')),
    {
      id: 'sis2_6',
      text: '如果有人可能听到我们，我不太可能被性唤起',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_7',
      text: '当我第一次与某人发生性关系时，我很难被唤起',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_8',
      text: '如果我无法专注于正在发生的事情，我会失去性兴奋',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_9',
      text: '除非我的伴侣似乎真正想要性，否则我很难保持兴奋',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_10',
      text: '当我觉得我的伴侣没有完全投入时，我会失去性兴趣',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_11',
      text: '我需要感到与伴侣的强烈情感联系才能享受性',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_12',
      text: '药物或酒精会让我很难被性唤起',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_13',
      text: '除非情绪合适，否则我无法真正专注于性快感',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_14',
      text: '如果我担心伴侣的感受，我很难专注于自己的快感',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_15',
      text: '有时我担心性接触的意义，这会干扰我的性兴奋',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [45, 225]
  }
};

// Mosher性内疚量表完整版 (28项)
export const MOSHER_GUILT_FULL: Scale = {
  id: 'mosher_guilt_full',
  name: 'Mosher性内疚量表完整版',
  description: 'Mosher开发的完整版性内疚量表，全面测量性相关的内疚感和道德负担',
  questions: [
    // 已有的10项
    ...MOSHER_GUILT.questions,
    // 新增的18项
    {
      id: 'mg_11',
      text: '我觉得性欲望是人类低级的本能',
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_12',
      text: '谈论性让我感到不舒服',
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_13',
      text: '我觉得强烈的性欲是不好的',
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_14',
      text: '我对自己过去的某些性经历感到后悔',
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_15',
      text: '我觉得性行为应该只是为了生育',
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_16',
      text: '我对自己的性想法感到不安',
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_17',
      text: '我认为享受性是自私的表现',
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_18',
      text: '我担心我的性行为会被他人判断',
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_19',
      text: '我觉得纯洁比性经验更重要',
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_20',
      text: '我对自己的性身体感到不适',
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_21',
      text: '我认为性应该是神圣的，不应该随便对待',
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_22',
      text: '我对自己的性冲动感到困扰',
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_23',
      text: '我觉得性活动会让我变得不纯洁',
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_24',
      text: '我担心性行为会影响我的品格',
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_25',
      text: '我认为好人不应该有太多性想法',
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_26',
      text: '我对自己的性历史感到羞愧',
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_27',
      text: '我觉得性欲望会分散我对重要事情的注意力',
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'mg_28',
      text: '我认为控制性冲动是道德修养的体现',
      scale: 'mosher_guilt_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [28, 140]
  }
};

// SOS性观感完整版量表 (21项)
export const SOS_FULL: Scale = {
  id: 'sos_full',
  name: 'SOS性观感量表完整版',
  description: 'Fisher等人开发的完整版性观感调查，全面测量对性刺激的情绪取向',
  questions: [
    // 已有的5项筛查版题目
    ...SOS_SCREENING.questions,
    // 新增的16项
    {
      id: 'sos_6',
      text: '我认为过多接触性内容对人有害',
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_7',
      text: '我觉得大多数性教育材料过于露骨',
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_8',
      text: '我认为性应该是私密的，不应该公开讨论',
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_9',
      text: '我对媒体中的性内容感到反感',
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_10',
      text: '我觉得社会对性过于开放',
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_11',
      text: '我认为年轻人接触性信息太早了',
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_12',
      text: '我对性俱乐部或成人娱乐场所持负面态度',
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_13',
      text: '我认为性研究是不必要的',
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_14',
      text: '我觉得公开展示亲密行为是不合适的',
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_15',
      text: '我对性玩具或性用品感到不适',
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_16',
      text: '我认为性应该是自然发生的，不需要特别关注',
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_17',
      text: '我对性多样性的概念感到困扰',
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_18',
      text: '我觉得性咨询或性治疗是令人尴尬的',
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_19',
      text: '我认为传统的性价值观更可取',
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_20',
      text: '我对现代社会的性自由持谨慎态度',
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sos_21',
      text: '我认为过多的性信息会让人困惑',
      scale: 'sos_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [21, 105]
  }
};

// BSAS简版性态度量表 (23项)
export const BSAS_BRIEF: Scale = {
  id: 'bsas_brief',
  name: 'BSAS简版性态度量表',
  description: 'Hendrick等人开发的性态度量表简版，测量性态度的四个维度',
  questions: [
    // 性许可性维度 (6项)
    {
      id: 'bsas_perm_1',
      text: '我不需要与某人有感情承诺就可以和他们发生性关系',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_perm_2',
      text: '我觉得婚前性行为是可以接受的',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_perm_3',
      text: '我认为一夜情是可以接受的',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_perm_4',
      text: '我觉得有多个性伴侣是可以的',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_perm_5',
      text: '我认为性应该只发生在已婚夫妇之间',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'bsas_perm_6',
      text: '我觉得性自由是重要的',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    // 性出生控制维度 (6项)
    {
      id: 'bsas_birth_1',
      text: '避孕是双方的责任',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_birth_2',
      text: '女性应该负责避孕',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'bsas_birth_3',
      text: '男性应该负责避孕',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'bsas_birth_4',
      text: '使用避孕措施是明智的',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_birth_5',
      text: '我支持计划生育',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_birth_6',
      text: '性教育应该包括避孕信息',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    // 性交际维度 (5项)
    {
      id: 'bsas_comm_1',
      text: '谈论性是困难的',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'bsas_comm_2',
      text: '我觉得和伴侣讨论性是重要的',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_comm_3',
      text: '我觉得表达性需求是困难的',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'bsas_comm_4',
      text: '我能轻松地和朋友谈论性',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_comm_5',
      text: '我认为开放的性沟通是健康关系的关键',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    // 性工具性维度 (6项)
    {
      id: 'bsas_inst_1',
      text: '性主要是为了身体快感',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_inst_2',
      text: '性最重要的部分是享受',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_inst_3',
      text: '性不需要爱情',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_inst_4',
      text: '性可以是纯粹的身体活动',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'bsas_inst_5',
      text: '性主要是为了情感联系',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'bsas_inst_6',
      text: '我觉得性应该总是浪漫的',
      scale: 'bsas_brief',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true,
      reverse: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [23, 115]
  }
};

// 人口学信息表单
export const DEMOGRAPHICS_QUESTIONS = [
  {
    id: 'age',
    text: '您的年龄段',
    type: 'multiple',
    options: [
      { value: 0, label: '14-17岁' },
      { value: 1, label: '18-24岁' },
      { value: 2, label: '25-34岁' },
      { value: 3, label: '35-44岁' },
      { value: 4, label: '45-54岁' },
      { value: 5, label: '55岁以上' }
    ],
    required: true
  },
  {
    id: 'gender',
    text: '您的性别认同(对自己)',
    type: 'multiple',
    options: [
      { value: 1, label: '男性' },
      { value: 2, label: '女性' },
      { value: 3, label: '非二元性别' },
      { value: 4, label: '不愿回答' }
    ],
    required: true
  },
  {
    id: 'relationshipStatus',
    text: '您目前的关系状态',
    type: 'multiple',
    options: [
      { value: 1, label: '单身' },
      { value: 2, label: '恋爱中' },
      { value: 3, label: '已婚/同居' },
      { value: 4, label: '不便回答' }
    ],
    required: true
  },
  {
    id: 'sexualActivity',
    text: '您的性经验状况',
    type: 'multiple',
    options: [
      { value: 0, label: '从未有过性行为' },
      { value: 1, label: '有过性行为，但近一年内无' },
      { value: 2, label: '很少（1-3次/年）' },
      { value: 3, label: '偶尔（1-3次/月）' },
      { value: 4, label: '经常（1-3次/周）' },
      { value: 5, label: '频繁（4次/周以上）' }
    ],
    required: true
  },
  {
    id: 'religiousCultural',
    text: '您的宗教/文化背景（可选）',
    type: 'multiple',
    options: [
      { value: 1, label: '无特定宗教' },
      { value: 2, label: '基督教' },
      { value: 3, label: '佛教' },
      { value: 4, label: '伊斯兰教' },
      { value: 5, label: '其他' },
      { value: 6, label: '不愿回答' }
    ],
    required: false
  }
];

// 导入适应性量表
export * from './adaptive-scales';

// 所有量表的集合
export const ALL_SCALES = {
  [SIS_SES_SF.id]: SIS_SES_SF,
  [SIS_SES_FULL.id]: SIS_SES_FULL,
  [MOSHER_GUILT.id]: MOSHER_GUILT,
  [MOSHER_GUILT_FULL.id]: MOSHER_GUILT_FULL,
  [KISS9_SHAME.id]: KISS9_SHAME,
  [SOS_SCREENING.id]: SOS_SCREENING,
  [SOS_FULL.id]: SOS_FULL,
  [BSAS_BRIEF.id]: BSAS_BRIEF,
  // 适应性量表
  [TEEN_SEXUAL_ATTITUDES.id]: TEEN_SEXUAL_ATTITUDES,
  [SEXUAL_COGNITION.id]: SEXUAL_COGNITION,
  [SIS_SES_ADAPTED.id]: SIS_SES_ADAPTED
} as const;

// 快测版本使用的量表 (39项)
export const QUICK_ASSESSMENT_SCALES = [
  SIS_SES_SF.id,      // 14项
  MOSHER_GUILT.id,    // 10项
  KISS9_SHAME.id,     // 9项
  SOS_SCREENING.id    // 5项
];

// 完整版本使用的量表 (117项)
export const FULL_ASSESSMENT_SCALES = [
  SIS_SES_FULL.id,      // 45项
  MOSHER_GUILT_FULL.id, // 28项
  KISS9_SHAME.id,       // 9项 (保持不变，已经是完整版)
  SOS_FULL.id,          // 21项
  BSAS_BRIEF.id         // 23项
];