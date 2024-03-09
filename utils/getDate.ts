const getDate = (daysBefore: number) => {
  return new Date(Date.now() - daysBefore * 24 * 60 * 60 * 1000);
};

export default getDate;
