export const addCommaStringFromThreeCntNum = (num: number, language): string | undefined => {
  if (isNaN(num) || num < 0) {
    return undefined;
  }
  return num.toLocaleString(language, {
    minimumFractionDigits: 0,
  });
};
