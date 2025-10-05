/**
 * SRI指数计算引擎 - 基于科学心理测量学的核心算法
 * 实现z分数标准化、四维度计算、SRI指数合成等功能
 */

import {AssessmentResults, DimensionScores, NormativeData, Response, ScaleScore, SRI_LEVELS, SRIResult} from '@/types';
import {ALL_SCALES} from '@/lib/scales';

/**
 * 标准正态分布累积分布函数 (CDF)
 * 用于将z分数转换为0-100的百分位数
 */
function normalCDF(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.sqrt(2.0);
  
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  
  return 0.5 * (1.0 + sign * y);
}

/**
 * 计算响应的原始分数
 * @param responses 用户响应数组
 * @param scaleId 量表ID
 * @returns 原始分数
 */
export function calculateRawScore(responses: Response[], scaleId: string): number {
  const scale = ALL_SCALES[scaleId];
  if (!scale) {
    console.warn(`Unknown scale: ${scaleId}`);
    return 0;
  }
  
  const scaleResponses = responses.filter(r => 
    scale.questions.some(q => q.id === r.questionId)
  );
  
  // 如果没有该量表的回答，返回0
  if (scaleResponses.length === 0) {
    return 0;
  }
  
  let totalScore = 0;
  
  for (const response of scaleResponses) {
    const question = scale.questions.find(q => q.id === response.questionId);
    if (question) {
      // 验证回答值的有效性
      const validValues = question.options.map(o => o.value);
      if (!validValues.includes(response.value)) {
        console.warn(`Invalid response value ${response.value} for question ${question.id}`);
        continue;
      }
      
      // 处理反向计分
      let score = response.value;
      if (question.reverse) {
        const maxValue = Math.max(...validValues);
        const minValue = Math.min(...validValues);
        score = maxValue + minValue - score;
      }
      totalScore += score;
    }
  }
  
  return totalScore;
}

/**
 * 计算z分数（标准化分数）
 * @param rawScore 原始分数
 * @param mean 均值
 * @param stdDev 标准差
 * @returns z分数
 */
export function calculateZScore(rawScore: number, mean: number, stdDev: number): number {
  if (stdDev === 0) return 0;
  return (rawScore - mean) / stdDev;
}

/**
 * 获取默认常模数据（基于文献的参考值）
 * 实际应用中应该使用本地样本建立常模
 */
export function getDefaultNorms(): NormativeData {
  return {
    sampleSize: 1000, // 模拟样本大小
    means: {
      // SIS/SES-SF参考均值（基于文献）
      'sis_total': 35.2,
      'ses_total': 16.8,
      'sis1_total': 15.4,
      'sis2_total': 19.8,
      
      // SIS/SES完整版参考均值
      'sis_ses_full_sis': 87.5,
      'sis_ses_full_ses': 42.8,
      
      // Mosher性内疚参考均值
      'mosher_guilt': 25.6,
      'mosher_guilt_full': 62.7,
      
      // KISS-9性羞耻参考均值  
      'kiss9_shame': 18.7,
      
      // SOS筛查版参考均值
      'sos_screening': 15.3,
      'sos_full': 63.0,
      
      // BSAS性态度量表参考均值
      'bsas_brief': 69.2,
      
      // 适应性量表参考均值
      'teen_sexual_attitudes': 25.0,
      'sexual_cognition': 28.5,
      'sis_ses_adapted': 24.0
    },
    standardDeviations: {
      'sis_total': 8.9,
      'ses_total': 3.7,
      'sis1_total': 4.1,
      'sis2_total': 5.2,
      
      // 完整版标准差
      'sis_ses_full_sis': 18.3,
      'sis_ses_full_ses': 9.2,
      'mosher_guilt': 7.8,
      'mosher_guilt_full': 19.2,
      'kiss9_shame': 6.4,
      'sos_screening': 4.6,
      'sos_full': 12.8,
      'bsas_brief': 15.4,
      
      // 适应性量表标准差
      'teen_sexual_attitudes': 6.2,
      'sexual_cognition': 7.1,
      'sis_ses_adapted': 5.8
    },
    updatedAt: new Date()
  };
}

/**
 * 计算SIS/SES相关分数
 * @param responses 用户响应
 * @param norms 常模数据
 * @returns SIS/SES分数对象
 */
export function calculateSisSeScores(responses: Response[], norms: NormativeData) {
  // 动态获取SES问题（支持不同量表版本）
  const sesResponses = responses.filter(r => r.questionId.startsWith('ses_'));
  const sesRaw = sesResponses.reduce((sum, r) => sum + r.value, 0);
  
  // 动态获取SIS1问题
  const sis1Responses = responses.filter(r => r.questionId.startsWith('sis1_'));
  const sis1Raw = sis1Responses.reduce((sum, r) => sum + r.value, 0);
  
  // 动态获取SIS2问题
  const sis2Responses = responses.filter(r => r.questionId.startsWith('sis2_'));
  const sis2Raw = sis2Responses.reduce((sum, r) => sum + r.value, 0);
  
  // SIS总分
  const sisTotal = sis1Raw + sis2Raw;
  
  // 根据题目数量调整常模（快测版vs完整版）
  const sesCount = sesResponses.length;
  const sisCount = sis1Responses.length + sis2Responses.length;
  
  // 动态调整均值和标准差
  const sesMean = sesCount <= 4 ? 16.8 : 42.8; // 快测版 vs 完整版
  const sesStd = sesCount <= 4 ? 3.7 : 9.2;
  const sisMean = sisCount <= 10 ? 35.2 : 87.5; // 调整完整版的均值
  const sisStd = sisCount <= 10 ? 8.9 : 18.3;
  
  // 计算z分数
  const sesZ = calculateZScore(sesRaw, norms.means['ses_total'] || sesMean, norms.standardDeviations['ses_total'] || sesStd);
  const sisZ = calculateZScore(sisTotal, norms.means['sis_total'] || sisMean, norms.standardDeviations['sis_total'] || sisStd);
  
  return {
    sesRaw,
    sesZ,
    sis1Raw,
    sis2Raw,
    sisTotal,
    sisZ,
    sisOverSes: sisZ - sesZ // SIS相对SES优势
  };
}

/**
 * 计算四维度分数
 * @param responses 用户响应
 * @param norms 常模数据 
 * @returns 四维度分数
 */
export function calculateDimensionScores(responses: Response[], norms: NormativeData): DimensionScores {
  // 1. SOS反向分数 - 动态检测使用的量表版本
  let sosRaw = 0;
  let sosZ = 0;
  
  // 尝试完整版SOS
  const sosFullResponses = responses.filter(r => r.questionId.startsWith('sos_'));
  if (sosFullResponses.length > 5) {
    // 完整版SOS
    sosRaw = sosFullResponses.reduce((sum, r) => sum + r.value, 0);
    sosZ = calculateZScore(sosRaw, norms.means['sos_full'] || 63.0, norms.standardDeviations['sos_full'] || 12.8);
  } else if (sosFullResponses.length > 0) {
    // 筛查版SOS
    sosRaw = sosFullResponses.reduce((sum, r) => sum + r.value, 0);
    sosZ = calculateZScore(sosRaw, norms.means['sos_screening'] || 15.3, norms.standardDeviations['sos_screening'] || 4.6);
  }
  
  // 2. 性内疚分数 - 动态检测版本
  let guiltRaw = 0;
  let guiltZ = 0;
  
  const guiltResponses = responses.filter(r => r.questionId.startsWith('mg_'));
  if (guiltResponses.length > 10) {
    // 完整版Mosher
    guiltRaw = guiltResponses.reduce((sum, r) => sum + r.value, 0);
    guiltZ = calculateZScore(guiltRaw, norms.means['mosher_guilt_full'] || 62.7, norms.standardDeviations['mosher_guilt_full'] || 19.2);
  } else if (guiltResponses.length > 0) {
    // 简版Mosher
    guiltRaw = guiltResponses.reduce((sum, r) => sum + r.value, 0);
    guiltZ = calculateZScore(guiltRaw, norms.means['mosher_guilt'] || 25.6, norms.standardDeviations['mosher_guilt'] || 7.8);
  }
  
  // 3. 性羞耻分数（KISS-9保持不变，或者青少年性态度量表）
  let shameZ = 0;
  const shameResponses = responses.filter(r => r.questionId.startsWith('ks_'));
  const teenAttitudeResponses = responses.filter(r => r.questionId.startsWith('tsa_'));
  
  if (shameResponses.length > 0) {
    // 使用KISS-9量表
    const shameRaw = shameResponses.reduce((sum, r) => sum + r.value, 0);
    shameZ = calculateZScore(shameRaw, norms.means['kiss9_shame'] || 18.7, norms.standardDeviations['kiss9_shame'] || 6.4);
  } else if (teenAttitudeResponses.length > 0) {
    // 使用青少年性态度量表作为羞耻维度替代
    const teenRaw = teenAttitudeResponses.reduce((sum, r) => sum + r.value, 0);
    shameZ = calculateZScore(teenRaw, norms.means['teen_sexual_attitudes'] || 25.0, norms.standardDeviations['teen_sexual_attitudes'] || 6.2);
  }
  
  // 4. SIS相对SES优势（或性认知适应版）
  let sisOverSes = 0;
  const sexCognitionResponses = responses.filter(r => r.questionId.startsWith('sc_'));
  const sisAdaptedResponses = responses.filter(r => r.questionId.startsWith('sisa_'));
  
  if (sexCognitionResponses.length > 0 || sisAdaptedResponses.length > 0) {
    // 对于无性经验用户，使用性认知量表
    const cognitionRaw = sexCognitionResponses.reduce((sum, r) => sum + r.value, 0);
    const adaptedRaw = sisAdaptedResponses.reduce((sum, r) => sum + r.value, 0);
    const totalRaw = cognitionRaw + adaptedRaw;
    
    if (totalRaw > 0) {
      const mean = norms.means['sexual_cognition'] || 28.5;
      const std = norms.standardDeviations['sexual_cognition'] || 7.1;
      sisOverSes = calculateZScore(totalRaw, mean, std);
    }
  } else {
    // 标准SIS/SES计算
    const sisSeScores = calculateSisSeScores(responses, norms);
    sisOverSes = sisSeScores.sisOverSes;
  }
  
  return {
    sosReversed: sosZ, // SOS反向（越高越恐惧）
    sexGuilt: guiltZ,
    sexualShame: shameZ,
    sisOverSes: sisOverSes
  };
}

/**
 * 计算SRI指数（0-100）
 * @param dimensionScores 四维度分数
 * @returns SRI结果对象
 */
export function calculateSRI(dimensionScores: DimensionScores): SRIResult {
  // 等权重合成四维度z分数
  const compositeZ = (dimensionScores.sosReversed + dimensionScores.sexGuilt + 
                    dimensionScores.sexualShame + dimensionScores.sisOverSes) / 4;
  
  // 转换为0-100分数（使用标准正态CDF）
  const percentile = normalCDF(compositeZ) * 100;
  const totalScore = Math.round(Math.max(0, Math.min(100, percentile)));
  
  // 确定SRI等级
  let level: keyof typeof SRI_LEVELS = 'moderate';
  for (const [levelKey, levelData] of Object.entries(SRI_LEVELS)) {
    if (totalScore >= levelData.min && totalScore < levelData.max) {
      level = levelKey as keyof typeof SRI_LEVELS;
      break;
    }
  }
  
  return {
    totalScore,
    zScore: compositeZ,
    percentile,
    level,
    dimensionScores,
    scaleScores: [] // 会在主计算函数中填充
  };
}

/**
 * 主要的SRI计算函数
 * @param responses 用户所有响应
 * @param sessionId 会话ID
 * @param norms 常模数据（可选）
 * @returns 完整的评估结果
 */
export function calculateAssessmentResults(
  responses: Response[], 
  sessionId: string, 
  norms?: NormativeData
): AssessmentResults {
  if (!responses || responses.length === 0) {
    throw new Error('No responses provided for calculation');
  }
  
  const normsData = norms || getDefaultNorms();
  
  // 计算各量表分数（只计算有数据的量表）
  const scaleScores: ScaleScore[] = [];
  
  for (const scaleId of Object.keys(ALL_SCALES)) {
    const rawScore = calculateRawScore(responses, scaleId);
    
    // 只有当量表有回答时才计算分数
    if (rawScore > 0) {
      const meanKey = `${scaleId.replace('_sf', '_total')}`;
      const mean = normsData.means[meanKey] || normsData.means[scaleId] || 0;
      const stdDev = normsData.standardDeviations[meanKey] || normsData.standardDeviations[scaleId] || 1;
      
      const zScore = calculateZScore(rawScore, mean, stdDev);
      const percentile = normalCDF(zScore) * 100;
      
      scaleScores.push({
        scaleId,
        rawScore,
        zScore,
        percentile: Math.max(0, Math.min(100, Math.round(percentile)))
      });
    }
  }
  
  // 验证是否有足够的数据进行计算
  if (scaleScores.length === 0) {
    throw new Error('Insufficient data for SRI calculation');
  }
  
  // 计算四维度分数
  const dimensionScores = calculateDimensionScores(responses, normsData);
  
  // 计算SRI指数
  const sri = calculateSRI(dimensionScores);
  sri.scaleScores = scaleScores;
  
  // 生成解释和建议
  const interpretation = generateInterpretation(sri);
  const recommendations = generateRecommendations(sri);
  
  return {
    sessionId,
    sri,
    interpretation,
    recommendations,
    calculatedAt: new Date()
  };
}

/**
 * 生成结果解释文案
 * @param sri SRI结果
 * @returns 解释文案数组
 */
function generateInterpretation(sri: SRIResult): string[] {
  const level = SRI_LEVELS[sri.level];
  const interpretation = [
    `您的性压抑指数为 ${sri.totalScore} 分，处于「${level.label}」水平。`,
    `这表明您在性相关的心理体验方面${getInterpretationByLevel(sri.level)}。`
  ];
  
  // 添加维度分析
  const highDimensions = [];
  if (sri.dimensionScores.sosReversed > 1) highDimensions.push('对性刺激的回避倾向');
  if (sri.dimensionScores.sexGuilt > 1) highDimensions.push('性相关内疚感');
  if (sri.dimensionScores.sexualShame > 1) highDimensions.push('性羞耻体验');
  if (sri.dimensionScores.sisOverSes > 1) highDimensions.push('性抑制相对优势');
  
  if (highDimensions.length > 0) {
    interpretation.push(`在以下维度上得分较高：${highDimensions.join('、')}。`);
  }
  
  return interpretation;
}

/**
 * 根据等级生成解释描述
 */
function getInterpretationByLevel(level: keyof typeof SRI_LEVELS): string {
  const descriptions = {
    'very-low': '表现出较少的性压抑，对性相关内容和体验相对开放和接受',
    'low': '在性心理方面相对健康，压抑程度较低',
    'moderate': '处于正常范围内，既不过分压抑也不过分开放',
    'high': '存在一定程度的性压抑，可能影响性体验和亲密关系',
    'very-high': '存在较明显的性压抑，建议寻求专业心理咨询师的帮助'
  };
  
  return descriptions[level];
}

/**
 * 生成个性化建议
 * @param sri SRI结果
 * @returns 建议文案数组
 */
function generateRecommendations(sri: SRIResult): string[] {
  const recommendations = [];
  
  if (sri.level === 'very-high' || sri.level === 'high') {
    recommendations.push('考虑与专业的性治疗师或心理咨询师交流，探讨性心理健康话题。');
    recommendations.push('尝试阅读一些关于性健康和性心理的科学读物，增进对性的科学认知。');
  }
  
  if (sri.dimensionScores.sexGuilt > 1) {
    recommendations.push('探索性内疚感的来源，可能与文化背景、家庭教育或宗教信念相关。');
  }
  
  if (sri.dimensionScores.sexualShame > 1) {
    recommendations.push('练习自我接纳和身体正念，建立与自己身体的积极关系。');
  }
  
  if (sri.dimensionScores.sisOverSes > 1) {
    recommendations.push('学习放松技巧和正念练习，减少性焦虑和过度控制。');
  }
  
  // 通用建议
  recommendations.push('与信任的伴侣或朋友开放地讨论性话题，减少孤立感。');
  recommendations.push('记住这不是诊断工具，结果仅供自我了解和反思使用。');
  
  return recommendations;
}