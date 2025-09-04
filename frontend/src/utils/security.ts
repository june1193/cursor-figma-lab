/**
 * XSS 방지를 위한 보안 유틸리티 함수들
 */

/**
 * HTML 문자열 이스케이프
 * @param text 이스케이프할 텍스트
 * @returns 이스케이프된 HTML 문자열
 */
export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * 입력값에서 위험한 문자 제거
 * @param input 검증할 입력값
 * @returns 정제된 입력값
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>\"'&]/g, '') // 기본 위험 문자 제거
    .replace(/javascript:/gi, '') // javascript: 프로토콜 제거
    .replace(/on\w+=/gi, '') // 이벤트 핸들러 제거
    .trim();
}

/**
 * URL 검증
 * @param url 검증할 URL
 * @returns 유효한 URL인지 여부
 */
export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

/**
 * 이메일 형식 검증
 * @param email 검증할 이메일
 * @returns 유효한 이메일인지 여부
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 사용자명 검증 (영문, 숫자, 언더스코어만 허용)
 * @param username 검증할 사용자명
 * @returns 유효한 사용자명인지 여부
 */
export function isValidUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

/**
 * 비밀번호 강도 검증
 * @param password 검증할 비밀번호
 * @returns 비밀번호 강도 정보
 */
export function validatePassword(password: string): {
  isValid: boolean;
  score: number;
  message: string;
} {
  let score = 0;
  const messages: string[] = [];

  if (password.length >= 8) {
    score += 1;
  } else {
    messages.push('8자 이상이어야 합니다');
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    messages.push('소문자를 포함해야 합니다');
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    messages.push('대문자를 포함해야 합니다');
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    messages.push('숫자를 포함해야 합니다');
  }

  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 1;
  } else {
    messages.push('특수문자를 포함하면 더 안전합니다');
  }

  return {
    isValid: score >= 3,
    score,
    message: messages.length > 0 ? messages.join(', ') : '안전한 비밀번호입니다'
  };
}
