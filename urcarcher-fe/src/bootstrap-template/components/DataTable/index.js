import React, { useEffect } from "react"

import { Table, Button, Form } from "react-bootstrap"
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useRowState,
} from "react-table"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import useWindowSize from "../../hooks/useWindowSize"
import DataTablePagination from "./DataTablePagination"
const DataTable = ({
  columns,
  items,
  updateMyData,
  nameAsc,
  searchLabel,
  cellClassname,
  defaultSort,
  hiddenColumns,
  hideHeader,
  hideToolbar,
  striped,
  defaultPageSize,
}) => {
  const data = React.useMemo(() => items, [items])
  const {
    getTableProps,
    headerGroups,
    page,
    rows,
    prepareRow,
    Page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    setFilter,
    setHiddenColumns,
  } = useTable(
    {
      columns,
      data: data,
      initialState: {
        hiddenColumns: hiddenColumns || [],
        pageIndex: 0,
        pageSize: defaultPageSize || 5,
        sortBy: [
          {
            id: defaultSort ?? "name",
            desc: !!nameAsc,
          },
        ],
        loading: false,
      },
      updateMyData,
      disableSortRemove: true,
      autoResetRowState: false,
    },
    useFilters,
    useSortBy,
    usePagination,
    useRowState
  )
  const perPageOptions = [
    {
      value: 5,
      label: 5,
    },
    {
      value: 10,
      label: 10,
    },
    {
      value: 15,
      label: 15,
    },
    {
      value: 20,
      label: 20,
    },
    {
      value: 25,
      label: 25,
    },
  ]
  const size = useWindowSize()

  useEffect(() => {
    if (size.width < 991) {
      searchLabel === "categories"
        ? setHiddenColumns(["plant_type.name", "description"])
        : setHiddenColumns(["slug", "plant_category.name"])
    } else {
      setHiddenColumns([])
    }
  }, [size.width])
  return (
    <React.Fragment>
      <div className={`dataTable-top ${hideToolbar ? "d-none" : ""}`}>
        <span className="me-2">
          <Form.Select size="sm" className="d-inline w-auto me-1">
            <option>Bulk Actions</option>
            <option>Delete</option>
          </Form.Select>

          <Button
            size="sm"
            variant="outline-primary"
            className="align-top mb-1 mb-lg-0"
          >
            Apply
          </Button>
        </span>
        <div className="d-inline-block">
          <Form.Select
            size="sm"
            className="d-inline w-auto me-1"
            onChange={(e) => setPageSize(Number(e.target.value))}
            value={pageSize}
          >
            {perPageOptions.map((option) => (
              <option key={option.label}>{option.label}</option>
            ))}
          </Form.Select>
        </div>
        <span className="text-xs">Entries per page</span>
        <div className="d-inline-block">
          <Form.Control
            type="text"
            placeholder={`Search`}
            id="search"
            onChange={(e) => setFilter("user.name", e.target.value)}
          />
        </div>
      </div>
      <Table
        hover
        {...getTableProps()}
        className="align-middle mb-0"
        striped={striped}
        responsive
      >
        <thead className={hideHeader ? "d-none" : ""}>
          {headerGroups.map((headerGroup, headerGroupIndex) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
              {headerGroup.headers.map((column, columnIndex) => {
                return (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="py-4"
                    key={columnIndex}
                  >
                    <span className="d-flex align-items-center text-transform-none ">
                      {column.render("Header")}
                      {!column.disableSortBy && (
                        <span className="d-grid ms-auto">
                          <FontAwesomeIcon
                            icon={faCaretUp}
                            className={`ms-1 ${
                              !column.isSortedDesc ? "opacity-6" : ""
                            }`}
                            size="sm"
                          />
                          <FontAwesomeIcon
                            icon={faCaretDown}
                            className={`ms-1 ${
                              column.isSorted && !column.isSortedDesc
                                ? ""
                                : "opacity-6"
                            }`}
                            size="sm"
                          />
                        </span>
                      )}
                    </span>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody className="position-relative border-top-0">
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell, cellIndex) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={cellClassname ?? ""}
                      key={cellIndex}
                    >
                      {cell.render("Cell")}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
      <div className="dataTable-bottom align-items-center d-flex">
        <div className="flex-shrink-0 mb-2 mb-md-0 me-auto">
          Showing page {pageIndex + 1} of {pageCount}
        </div>

        {pageOptions.length > 1 && (
          <DataTablePagination
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            gotoPage={gotoPage}
            nextPage={nextPage}
            previousPage={previousPage}
            pageIndex={pageIndex}
            pageOptions={pageOptions}
            viewportWidth={size?.width}
          />
        )}
      </div>
    </React.Fragment>
  )
}

export default DataTable
