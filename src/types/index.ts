/**
 * 核心数据类型定义 - 性压抑指数计算器
 * 定义量表、问题、回答、评估结果等核心数据结构
 */

// 基础量表类型
export interface Scale {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  scoring: ScoringMethod;
}

// 问题类型
export interface Question {
  id: string;
  text: string;
  scale: string; // 所属量表ID
  type: 'likert' | 'binary' | 'multiple';
  options: QuestionOption[];
  required: boolean;
  reverse?: boolean; // 是否反向计分
  description?: string; // 问题描述
}

// 问题选项
export interface QuestionOption {
  value: number;
  label: string;
  description?: string;
  enLabel?: string; // 英文标签
}

// 计分方法
export interface ScoringMethod {
  type: 'sum' | 'average' | 'weighted';
  weights?: number[];
  range: [number, number];
}

// 用户回答
export interface Response {
  questionId: string;
  value: number;
  timestamp: Date;
}

// 人口学信息
export interface Demographics {
  age: string; // 存储选项值的字符串形式
  gender: string;
  relationshipStatus: string;
  sexualActivity: string;
  religiousCultural?: string;
  consentToParticipate: boolean;
}

// 评估会话
export interface AssessmentSession {
  id: string;
  type: 'quick' | 'full';
  demographics: Demographics;
  responses: Response[];
  results?: AssessmentResults;
  startTime: Date;
  endTime?: Date;
  completed: boolean;
}

// 量表分数
export interface ScaleScore {
  scaleId: string;
  rawScore: number;
  zScore: number;
  percentile: number;
}

// 四维度分数
export interface DimensionScores {
  sosReversed: number; // SOS反向分数
  sexGuilt: number; // 性内疚
  sexualShame: number; // 性羞耻
  sisOverSes: number; // SIS相对SES优势
}

// SRI指数计算结果
export interface SRIResult {
  totalScore: number; // 0-100
  zScore: number;
  percentile: number;
  level: 'very-low' | 'low' | 'moderate' | 'high' | 'very-high';
  dimensionScores: DimensionScores;
  scaleScores: ScaleScore[];
}

// 评估结果
export interface AssessmentResults {
  sessionId: string;
  sri: SRIResult;
  interpretation: string[];
  recommendations: string[];
  calculatedAt: Date;
}

// 本地存储数据结构
export interface StorageData {
  sessions: AssessmentSession[];
  norms?: NormativeData;
  version: string;
}

// 常模数据
export interface NormativeData {
  sampleSize: number;
  means: Record<string, number>;
  standardDeviations: Record<string, number>;
  updatedAt: Date;
}

// 导出数据格式
export interface ExportData {
  sessionId: string;
  timestamp: string;
  type: string;
  demographics: Demographics;
  responses: Record<string, number>;
  results: {
    sriScore: number;
    sriLevel: string;
    dimensions: DimensionScores;
  };
}

// 量表常量
export const SCALE_IDS = {
  SIS_SES: 'sis_ses_sf',
  MOSHER: 'mosher_guilt',
  KISS9: 'kiss9_shame',
  SOS: 'sos_screening',
  BSAS: 'bsas_attitudes'
} as const;

// SRI等级定义
export const SRI_LEVELS = {
  'very-low': { min: 0, max: 20, label: '很低（较少压抑）', color: 'psychology-success' },
  'low': { min: 20, max: 40, label: '偏低', color: 'green-600' },
  'moderate': { min: 40, max: 60, label: '中等', color: 'yellow-600' },
  'high': { min: 60, max: 80, label: '偏高', color: 'psychology-warning' },
  'very-high': { min: 80, max: 101, label: '很高', color: 'psychology-danger' }
} as const;

// 李克特量表选项
export const LIKERT_OPTIONS = {
  STRONGLY_DISAGREE: { value: 1, label: '非常不同意', enLabel: 'Strongly Disagree' },
  DISAGREE: { value: 2, label: '不同意', enLabel: 'Disagree' },
  NEUTRAL: { value: 3, label: '中性', enLabel: 'Neutral' },
  AGREE: { value: 4, label: '同意', enLabel: 'Agree' },
  STRONGLY_AGREE: { value: 5, label: '非常同意', enLabel: 'Strongly Agree' }
} as const;

// 频率选项
export const FREQUENCY_OPTIONS = {
  NEVER: { value: 1, label: '从不', enLabel: 'Never' },
  RARELY: { value: 2, label: '很少', enLabel: 'Rarely' },
  SOMETIMES: { value: 3, label: '有时', enLabel: 'Sometimes' },
  OFTEN: { value: 4, label: '经常', enLabel: 'Often' },
  ALWAYS: { value: 5, label: '总是', enLabel: 'Always' }
} as const;