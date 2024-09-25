import React from "react"
import { Badge, Card } from "react-bootstrap"
import products from "../data/products.json"
import CardHeaderMore from "./CardHeaderMore"
import Image from "../components/CustomImage"
import DataTable from "./DataTable"
export default function Bestsellers() {
  const columns = React.useMemo(
    () => [
      {
        accessor: "title",
        Cell: ({ cell: { value }, row: { original } }) => {
          return (
            <a
              className="text-reset text-decoration-none d-flex align-items-center"
              href="#!"
            >
              <span className="me-3">
                <Image
                  className="img-fluid rounded"
                  src={original.img}
                  alt={value}
                  width={75}
                  height={50}
                  layout="fixed"
                  objectFit="cover"
                />
              </span>
              <strong>{value}</strong>
            </a>
          )
        },
      },
      {
        accessor: "price",
      },
      {
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
        accessor: "status",
        Cell: ({ row: { original } }) => {
          return (
            <React.Fragment>
              {original.new && (
                <Badge bg="primary-light" text="primary">
                  New Arrival
                </Badge>
              )}
              {original.hot && (
                <Badge bg="success-light" text="success">
                  Hot
                </Badge>
              )}
              {original.trending && (
                <Badge bg="info-light" text="info">
                  Hot
                </Badge>
              )}

              {original.soldout && (
                <Badge bg="danger-light" text="danger">
                  Soldout
                </Badge>
              )}
            </React.Fragment>
          )
        },
      },
    ],
    []
  )
  return (
    <Card className="card-table mb-4">
      <Card.Header>
        <h5 className="card-heading">Bestsellers this month</h5>
        <CardHeaderMore />
      </Card.Header>
      <Card.Body>
        <DataTable
          columns={columns}
          items={products}
          hideHeader
          hideToolbar
          striped
        />
      </Card.Body>
    </Card>
  )
}
