export const removeSpecialCharacters = (string) => {
  if (!string) return "";
  return string
    .toString()
    .replace(/[^0-9]/g, "")
    .replace(/\s/g, "");
};
export const formatPrice = (price) => {
  return parseFloat(price).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};
