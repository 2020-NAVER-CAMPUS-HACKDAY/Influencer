export const addCommaStringFromThreeCntNum = (num: number): string | undefined => {
  if (isNaN(num) || num < 0) {
    return undefined;
  }
  return num.toLocaleString(navigator.language, {
    minimumFractionDigits: 0,
  });
};
