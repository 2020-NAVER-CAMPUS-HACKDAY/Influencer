import { isNumber } from 'util';

export const addCommaStringFromThreeCntNum = (num: number): string | undefined => {
  if (!isNumber(num) || num < 0) return null;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
