export function getPagination(currentPage, totalPages) {
  const pages = [];
  const delta = 1;
  const rangeStart = Math.max(2, currentPage - delta);
  const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

  pages.push(1);
  if (rangeStart > 2) pages.push('...');
  for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
  if (rangeEnd < totalPages - 1) pages.push('...');
  if (totalPages > 1) pages.push(totalPages);

  return pages;
}
