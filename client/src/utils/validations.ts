const EMAIL_REGEX = /^\S+@\S+\.(\S{2,})+/;

//비밀번호는 대문자,소문자,숫자, 문자 문자 중 2종류이상의 조합으로 10자 이상으로 이루어져있어야 합니다
const PW_REGEX_RULE =
  /^(?=.*[A-Z])(?=.*[a-z])([^\s]){10,}|(?=.*[A-Z])(?=.*[0-9])([^\s]){10,}|(?=.*[A-Z])(?=.*[<>{}|;:.,~!?@#$%^=&*\”\\/])([^\s]){10,}|(?=.*[a-z])(?=.*[0-9])([^\s]){10,}|(?=.*[a-z])(?=.*[<>{}|;:.,~!?@#$%^=&*\”\\/])([^\s]){10,}|(?=.*[0-9])(?=.*[<>{}|;:.,~!?@#$%^=&*\”\\/])([^\s]){10,}$/;

const PW_MIN_LEN = 10;

export const PW_VALIDATION_ERR_MSG = '올바른 비밀번호 형식이 아닙니다';
export const EMAIL_VALIDATION_ERR_MSG = '올바른 이메일 형식이 아닙니다';

export const checkEmailValidation = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const checkPWLength = (pw: string): boolean => {
  return pw.length >= PW_MIN_LEN;
};

export const checkPWValidation = (pw: string): boolean => {
  return PW_REGEX_RULE.test(pw);
};
