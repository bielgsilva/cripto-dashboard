export const formatPrice = (price) => {
  return parseFloat(price).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} - ${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

  return formattedDate;
};

