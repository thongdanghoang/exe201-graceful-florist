import {MatPaginatorIntl} from '@angular/material/paginator';

export function MatPaginatorIntlImpl(): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Tổng số sản phẩm:';
  paginatorIntl.nextPageLabel = 'Trang tiếp';
  paginatorIntl.previousPageLabel = 'Trang trước';
  paginatorIntl.firstPageLabel = 'Trang đầu';
  paginatorIntl.lastPageLabel = 'Trang cuối';
  paginatorIntl.getRangeLabel = (
    page: number,
    pageSize: number,
    length: number
  ): string => {
    if (length === 0 || pageSize === 0) {
      return `0 của ${length}`;
    }
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} của ${length}`;
  };
  return paginatorIntl;
}
