export const pagination = (
  results: any[],
  total: number,
  limit: number,
  currentPage: number,
) => {
  return {
    totalEntries: total,
    totalPage: Math.floor(total / limit) + 1,
    currentPage,
    results: results,
  };
};
