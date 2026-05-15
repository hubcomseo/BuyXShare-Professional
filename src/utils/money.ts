export const formatMoney = (amount: number | undefined | null) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '0\u00A0đ';
  return amount.toLocaleString('vi-VN') + '\u00A0đ';
};
