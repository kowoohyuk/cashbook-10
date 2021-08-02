/**
 * @param amount
 * @returns 금액을 'OOO, OOO원' 포맷으로 변경해서 리턴
 */

export const toWonForm = (amount: number): string => {
  return '₩' + amount.toLocaleString();
};

export const toDollarForm = (amount: number): string => {
  return amount + '$';
};
