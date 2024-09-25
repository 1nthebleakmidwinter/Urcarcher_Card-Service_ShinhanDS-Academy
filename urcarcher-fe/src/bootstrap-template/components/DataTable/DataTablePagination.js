import React, { useEffect, useState } from "react"
import { Pagination } from "react-bootstrap"

export default function DataTablePagination({
  canPreviousPage,
  canNextPage,
  pageOptions,
  nextPage,
  previousPage,
  gotoPage,
  pageIndex,
  viewportWidth,
}) {
  const [visiblePages, setVisiblePages] = useState(false)

  useEffect(() => {
    if (pageOptions) {
      const newOptions = [...pageOptions]
      const notMobile = viewportWidth > 767
      const pageNumber = notMobile ? 5 : 2

      if (pageIndex > (notMobile ? 4 : 2)) {
        setVisiblePages(
          newOptions.splice(pageIndex - (notMobile ? 2 : 1), pageNumber)
        )
      } else {
        setVisiblePages(newOptions.splice(0, pageNumber))
      }
    }
  }, [pageOptions, pageIndex, viewportWidth])

  return (
    <Pagination className="ms-md-auto mb-0">
      {pageIndex > 4 && <Pagination.First onClick={() => gotoPage(0)} />}
      {canPreviousPage && <Pagination.Prev onClick={() => previousPage()} />}
      {visiblePages &&
        visiblePages.map((page, index) => (
          <Pagination.Item
            key={page}
            onClick={() => gotoPage(page)}
            className={pageIndex === page ? "active" : ""}
          >
            {page + 1}
          </Pagination.Item>
        ))}

      {canNextPage && <Pagination.Next onClick={() => nextPage()} />}
      {pageIndex < pageOptions.length - 1 && (
        <Pagination.Last onClick={() => gotoPage(pageOptions.length - 1)} />
      )}
    </Pagination>
  )
}
