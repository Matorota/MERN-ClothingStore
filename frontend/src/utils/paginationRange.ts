export const getPaginationRange = (
  currentPage: number,
  totalPages: number,
  range: number = 1,
): (number | string)[] => {
  const pages: (number | string)[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - range && i <= currentPage + range)
    ) {
      pages.push(i);
    } else if (
      (i === currentPage - range - 1 && currentPage > range + 2) ||
      (i === currentPage + range + 1 && currentPage < totalPages - range - 1)
    ) {
      pages.push("...");
    }
  }

  return [...new Set(pages)];
};
