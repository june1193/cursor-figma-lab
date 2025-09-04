import * as yup from 'yup';

/**
 * 폼 검증을 위한 Yup 스키마 정의
 */

// 로그인 폼 검증 스키마
export const loginSchema = yup.object({
  username: yup
    .string()
    .required('사용자명을 입력해주세요')
    .min(3, '사용자명은 3자 이상이어야 합니다')
    .max(20, '사용자명은 20자 이하여야 합니다')
    .matches(/^[a-zA-Z0-9_]+$/, '영문, 숫자, 언더스코어만 사용 가능합니다'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요')
    .min(6, '비밀번호는 6자 이상이어야 합니다'),
  company: yup
    .string()
    .required('회사명을 입력해주세요')
    .min(2, '회사명은 2자 이상이어야 합니다')
    .max(50, '회사명은 50자 이하여야 합니다')
    .matches(/^[가-힣a-zA-Z0-9\s]+$/, '한글, 영문, 숫자, 공백만 사용 가능합니다')
});

// 회원가입 폼 검증 스키마
export const signUpSchema = yup.object({
  company: yup
    .string()
    .required('회사명을 입력해주세요')
    .min(2, '회사명은 2자 이상이어야 합니다')
    .max(50, '회사명은 50자 이하여야 합니다')
    .matches(/^[가-힣a-zA-Z0-9\s]+$/, '한글, 영문, 숫자, 공백만 사용 가능합니다'),
  username: yup
    .string()
    .required('사용자명을 입력해주세요')
    .min(3, '사용자명은 3자 이상이어야 합니다')
    .max(20, '사용자명은 20자 이하여야 합니다')
    .matches(/^[a-zA-Z0-9_]+$/, '영문, 숫자, 언더스코어만 사용 가능합니다'),
  email: yup
    .string()
    .required('이메일을 입력해주세요')
    .email('올바른 이메일 형식이 아닙니다')
    .max(100, '이메일은 100자 이하여야 합니다'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요')
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      '소문자, 대문자, 숫자를 포함해야 합니다'
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      '특수문자도 포함하면 더 안전합니다'
    ),
  confirmPassword: yup
    .string()
    .required('비밀번호 확인을 입력해주세요')
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다')
});

// TypeScript 타입 정의
export type LoginFormData = yup.InferType<typeof loginSchema>;
export type SignUpFormData = yup.InferType<typeof signUpSchema>;
