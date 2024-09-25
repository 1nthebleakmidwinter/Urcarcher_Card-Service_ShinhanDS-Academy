import React from "react"
import { Badge, Card, Form } from "react-bootstrap"
import data from "../data/tables-datatable.json"
import DataTable from "./DataTable"
import CardHeaderMore from "./CardHeaderMore"
import Stars from "./Stars"
import Link from "next/link"
export default function Orders({ header }) {
  const badges = [
    <Badge bg="success-light" text="success">
      Open
    </Badge>,
    <Badge bg="danger-light" text="danger">
      Closed
    </Badge>,
    <Badge bg="warning-light" text="warning">
      On Hold
    </Badge>,
    <Badge bg="info-light" text="info">
      In Progress
    </Badge>,
  ]
  const columns = React.useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "order_id",
        Cell: ({ row: { index } }) => {
          return (
            /* ORDER ID - Only for demo purposes - customize ID on production */ <Form.Check
              type="checkbox"
              label={`#${2568 + index++}`}
            />
          )
        },
      },
      {
        Header: "Name",
        accessor: "person",
        Cell: ({ cell: { value }, row: { original } }) => {
          return (
            <Link href="/e-commerce-order">
              <a className="text-dark">
                <strong>{value}</strong>
                <br />
                <span className="text-muted text-sm">{original.email}</span>
              </a>
            </Link>
          )
        },
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: () => {
          const month = Math.floor(Math.random() * 12 + 1)
            .toString()
            .padStart(2, "0")
          const day = Math.floor(Math.random() * 31 + 1)
            .toString()
            .padStart(2, "0")
          return (
            <span>
              2021/{month}/{day}
            </span>
          )
        },
      },
      {
        Header: "Total Price",
        accessor: "price",
        Cell: () => {
          const price =
            Math.floor(Math.random() * 90 + 1) + Math.random().toFixed(2)
          return `$${price}`
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row: { index } }) => {
          // Only for demo purposes
          const demoBadge = index % badges.length
          return badges[demoBadge]
        },
      },
      {
        Header: "Review",
        accessor: "review",
        Cell: ({ row: { index } }) => {
          return (
            <div className="text-end">
              <Stars stars="4" />
            </div>
          )
        },
      },
    ],
    []
  )
  return (
    <Card className="card-table mb-4">
      {header && (
        <Card.Header>
          <h5 className="card-heading">{header}</h5>
          <CardHeaderMore />
        </Card.Header>
      )}
      <Card.Body>
        <DataTable columns={columns} items={data} defaultPageSize={10} />
      </Card.Body>
    </Card>
  )
}
