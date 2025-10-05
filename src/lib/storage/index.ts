/**
 * 本地存储管理系统 - 隐私保护的客户端数据管理
 * 实现评估历史保存、数据导出、隐私保护等功能
 */

import {AssessmentSession, ExportData, NormativeData, StorageData} from '@/types';

const STORAGE_KEY = 'sri_assessment_data';
const STORAGE_VERSION = '1.0.0';

/**
 * 获取本地存储的数据
 * @returns 存储数据或默认结构
 */
export function getStorageData(): StorageData {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return {
        sessions: [],
        version: STORAGE_VERSION
      };
    }
    
    const parsed = JSON.parse(data) as StorageData;
    
    // 版本兼容性检查
    if (parsed.version !== STORAGE_VERSION) {
      console.warn('Storage version mismatch, migrating data...');
      return migrateStorageData(parsed);
    }
    
    // 恢复Date对象
    parsed.sessions = parsed.sessions.map(session => ({
      ...session,
      startTime: new Date(session.startTime),
      endTime: session.endTime ? new Date(session.endTime) : undefined,
      responses: session.responses.map(response => ({
        ...response,
        timestamp: new Date(response.timestamp)
      })),
      results: session.results ? {
        ...session.results,
        calculatedAt: new Date(session.results.calculatedAt)
      } : undefined
    }));
    
    return parsed;
  } catch (error) {
    console.error('Error loading storage data:', error);
    return {
      sessions: [],
      version: STORAGE_VERSION
    };
  }
}

/**
 * 保存数据到本地存储
 * @param data 要保存的数据
 */
export function saveStorageData(data: StorageData): void {
  try {
    // 添加数据大小检查，防止存储过大数据
    const dataString = JSON.stringify(data);
    const dataSize = new Blob([dataString]).size;
    
    // 如果数据超过5MB，清理旧数据
    if (dataSize > 5 * 1024 * 1024) {
      console.warn('Storage data too large, cleaning old sessions...');
      data.sessions = data.sessions
        .sort((a, b) => b.startTime.getTime() - a.startTime.getTime())
        .slice(0, 20); // 只保留最新的20个会话
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving storage data:', error);
    
    // 如果是存储空间不足错误，尝试清理数据
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      try {
        console.log('Storage quota exceeded, clearing old data...');
        data.sessions = data.sessions.slice(0, 10); // 只保留最新10个
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (retryError) {
        throw new Error('存储空间不足，请清理浏览器数据后重试');
      }
    } else {
      throw new Error('无法保存数据到本地存储');
    }
  }
}

/**
 * 数据版本迁移
 * @param oldData 旧版本数据
 * @returns 新版本数据
 */
function migrateStorageData(oldData: any): StorageData {
  // 目前只有一个版本，简单返回默认结构
  return {
    sessions: [],
    version: STORAGE_VERSION
  };
}

/**
 * 保存评估会话
 * @param session 评估会话数据
 */
export function saveAssessmentSession(session: AssessmentSession): void {
  const data = getStorageData();
  
  // 检查是否已存在同ID会话
  const existingIndex = data.sessions.findIndex(s => s.id === session.id);
  
  if (existingIndex >= 0) {
    // 更新现有会话
    data.sessions[existingIndex] = session;
  } else {
    // 添加新会话
    data.sessions.push(session);
  }
  
  // 限制存储的会话数量（最多保留50个）
  if (data.sessions.length > 50) {
    data.sessions = data.sessions
      .sort((a, b) => b.startTime.getTime() - a.startTime.getTime())
      .slice(0, 50);
  }
  
  saveStorageData(data);
}

/**
 * 获取所有评估会话
 * @returns 评估会话数组（按时间倒序）
 */
export function getAllAssessmentSessions(): AssessmentSession[] {
  const data = getStorageData();
  return data.sessions.sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
}

/**
 * 根据ID获取评估会话
 * @param sessionId 会话ID
 * @returns 评估会话或undefined
 */
export function getAssessmentSession(sessionId: string): AssessmentSession | undefined {
  try {
    const data = getStorageData();
    console.log(`Searching for session ID: "${sessionId}"`);
    console.log(`Available sessions:`, data.sessions.map(s => s.id));
    
    const session = data.sessions.find(s => s.id === sessionId);
    
    if (session) {
      console.log('Session found:', {
        id: session.id,
        type: session.type,
        completed: session.completed,
        hasResults: !!session.results
      });
    } else {
      console.log('Session not found');
    }
    
    return session;
  } catch (error) {
    console.error('Error in getAssessmentSession:', error);
    return undefined;
  }
}

/**
 * 删除评估会话
 * @param sessionId 会话ID
 */
export function deleteAssessmentSession(sessionId: string): void {
  const data = getStorageData();
  data.sessions = data.sessions.filter(s => s.id !== sessionId);
  saveStorageData(data);
}

/**
 * 清除所有评估历史
 */
export function clearAllSessions(): void {
  const data = getStorageData();
  data.sessions = [];
  saveStorageData(data);
}

/**
 * 导出单个会话数据
 * @param sessionId 会话ID
 * @returns 导出数据或null
 */
export function exportSessionData(sessionId: string): ExportData | null {
  const session = getAssessmentSession(sessionId);
  if (!session || !session.results) {
    return null;
  }
  
  // 创建匿名化的导出数据，移除敏感信息
  const responsesMap: Record<string, number> = {};
  session.responses.forEach(response => {
    responsesMap[response.questionId] = response.value;
  });
  
  // 生成匿名化的会话ID（保留原ID的哈希值，但不包含原始ID）
  const anonymousId = btoa(sessionId).slice(0, 8);
  
  return {
    sessionId: anonymousId, // 使用匿名化ID
    timestamp: session.startTime.toISOString(),
    type: session.type,
    demographics: {
      // 只导出非敏感的人口学信息
      age: session.demographics.age,
      gender: session.demographics.gender,
      relationshipStatus: session.demographics.relationshipStatus,
      sexualActivity: session.demographics.sexualActivity,
      consentToParticipate: true // 固定为true，不导出具体状态
    },
    responses: responsesMap,
    results: {
      sriScore: session.results.sri.totalScore,
      sriLevel: session.results.sri.level,
      dimensions: session.results.sri.dimensionScores
    }
  };
}

/**
 * 导出所有会话数据
 * @returns 导出数据数组
 */
export function exportAllSessionsData(): ExportData[] {
  const sessions = getAllAssessmentSessions();
  return sessions
    .filter(session => session.completed && session.results)
    .map(session => exportSessionData(session.id)!)
    .filter(Boolean);
}

/**
 * 下载数据为JSON文件
 * @param data 要下载的数据
 * @param filename 文件名
 */
export function downloadAsJSON(data: any, filename: string): void {
  try {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading JSON:', error);
    throw new Error('无法下载文件');
  }
}

/**
 * 下载数据为CSV文件
 * @param data 要下载的数据
 * @param filename 文件名
 */
export function downloadAsCSV(data: ExportData[], filename: string): void {
  try {
    if (data.length === 0) {
      throw new Error('没有数据可导出');
    }
    
    // 构建CSV头部
    const headers = [
      '会话ID',
      '时间戳',
      '测评类型',
      '年龄段',
      '性别',
      '关系状态',
      '性活跃度',
      'SRI分数',
      'SRI等级',
      '性恐惧维度',
      '性内疚维度',
      '性羞耻维度',
      '抑制优势维度'
    ];
    
    // 构建CSV行
    const rows = data.map(item => [
      item.sessionId,
      item.timestamp,
      item.type === 'quick' ? '快测版' : '完整版',
      item.demographics.age,
      item.demographics.gender,
      item.demographics.relationshipStatus,
      item.demographics.sexualActivity,
      item.results.sriScore,
      item.results.sriLevel,
      item.results.dimensions.sosReversed.toFixed(2),
      item.results.dimensions.sexGuilt.toFixed(2),
      item.results.dimensions.sexualShame.toFixed(2),
      item.results.dimensions.sisOverSes.toFixed(2)
    ]);
    
    // 组合CSV内容
    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    // 添加BOM以支持中文
    const blob = new Blob(['\uFEFF' + csvContent], {
      type: 'text/csv;charset=utf-8'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading CSV:', error);
    throw new Error('无法下载CSV文件');
  }
}

/**
 * 获取存储使用统计
 * @returns 存储统计信息
 */
export function getStorageStats() {
  const data = getStorageData();
  const completedSessions = data.sessions.filter(s => s.completed);
  
  return {
    totalSessions: data.sessions.length,
    completedSessions: completedSessions.length,
    quickTests: completedSessions.filter(s => s.type === 'quick').length,
    fullTests: completedSessions.filter(s => s.type === 'full').length,
    oldestSession: data.sessions.length > 0 
      ? Math.min(...data.sessions.map(s => s.startTime.getTime()))
      : null,
    newestSession: data.sessions.length > 0
      ? Math.max(...data.sessions.map(s => s.startTime.getTime()))
      : null
  };
}

/**
 * 保存常模数据
 * @param norms 常模数据
 */
export function saveNormativeData(norms: NormativeData): void {
  const data = getStorageData();
  data.norms = norms;
  saveStorageData(data);
}

/**
 * 获取常模数据
 * @returns 常模数据或undefined
 */
export function getNormativeData(): NormativeData | undefined {
  const data = getStorageData();
  return data.norms;
}

/**
 * 数据安全清理功能
 * 清除所有本地数据（用于隐私保护）
 */
export function secureDataWipe(): void {
  try {
    // 清除评估数据
    localStorage.removeItem(STORAGE_KEY);
    
    // 清除评估进度
    localStorage.removeItem('sri_assessment_progress');
    
    // 清除其他可能的相关数据
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('sri_')) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    console.log('All SRI data has been securely wiped');
  } catch (error) {
    console.error('Error during secure data wipe:', error);
    throw new Error('无法完全清除数据');
  }
}

/**
 * 诊断存储问题
 * @returns 存储诊断信息
 */
export function diagnoseStorage() {
  try {
    console.log('=== SRI Storage Diagnosis ===');
    
    // 检查localStorage可用性
    const isLocalStorageAvailable = typeof(Storage) !== "undefined";
    console.log('LocalStorage available:', isLocalStorageAvailable);
    
    if (!isLocalStorageAvailable) {
      return { error: 'LocalStorage不可用' };
    }
    
    // 检查存储项目
    const storageItem = localStorage.getItem(STORAGE_KEY);
    console.log('Storage item exists:', !!storageItem);
    console.log('Storage item size:', storageItem ? storageItem.length : 0);
    
    if (!storageItem) {
      return { error: '没有找到存储数据' };
    }
    
    // 尝试解析数据
    let data;
    try {
      data = JSON.parse(storageItem);
    } catch (parseError) {
      return { error: '存储数据解析失败', parseError };
    }
    
    console.log('Sessions count:', data.sessions?.length || 0);
    
    if (data.sessions) {
      data.sessions.forEach((session: any, index: number) => {
        console.log(`Session ${index}:`, {
          id: session.id,
          type: session.type,
          completed: session.completed,
          hasResults: !!session.results,
          startTime: session.startTime
        });
      });
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Diagnosis error:', error);
    return { error: 'diagnostics failed', details: error };
  }
}

/**
 * 检查数据完整性
 * @returns 数据完整性报告
 */
export function validateDataIntegrity() {
  try {
    const data = getStorageData();
    const report = {
      isValid: true,
      errors: [] as string[],
      warnings: [] as string[],
      stats: {
        totalSessions: data.sessions.length,
        corruptedSessions: 0,
        missingResults: 0
      }
    };
    
    // 检查每个会话的数据完整性
    data.sessions.forEach((session, index) => {
      if (!session.id || !session.type || !session.startTime) {
        report.errors.push(`会话 ${index + 1}: 缺少必要字段`);
        report.stats.corruptedSessions++;
        report.isValid = false;
      }
      
      if (session.completed && !session.results) {
        report.warnings.push(`会话 ${index + 1}: 标记为完成但缺少结果`);
        report.stats.missingResults++;
      }
      
      if (session.responses.some(r => !r.questionId || r.value === undefined)) {
        report.errors.push(`会话 ${index + 1}: 包含无效的回答数据`);
        report.stats.corruptedSessions++;
        report.isValid = false;
      }
    });
    
    return report;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      isValid: false,
      errors: ['数据验证过程中发生错误: ' + errorMessage],
      warnings: [],
      stats: {
        totalSessions: 0,
        corruptedSessions: 0,
        missingResults: 0
      }
    };
  }
}