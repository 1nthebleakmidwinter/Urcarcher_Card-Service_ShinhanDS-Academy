import { faTrashAlt, faEdit } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Card, Table, Button, Badge } from "react-bootstrap"
import CardHeaderMore from "../CardHeaderMore"
import Image from "../CustomImage"
export default function Products({ data }) {
  return (
    <Card className="card-table mb-4">
      <Card.Header>
        <h5 className="card-heading">Products</h5>
        <CardHeaderMore />
      </Card.Header>
      <Card.Body>
        <Table borderless hover responsive className="mb-0">
          <thead>
            <tr>
              <th>Product Id</th>
              <th style={{ minWidth: "300px" }}>Name</th>
              <th>Price</th>
              <th>In Stock</th>
              <th>Last Ordered</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index} className="align-middle">
                  <td>#{item.id}</td>
                  <td className="d-flex align-items-center">
                    <div className="me-3">
                      <Image
                        src={item.img}
                        layout="fixed"
                        width={80}
                        height={80}
                        alt={item.name}
                        className="card-table-img"
                      />
                    </div>
                    <a className="text-reset text-decoration-none" href="#!">
                      <strong>{item.name}</strong>
                    </a>
                  </td>
                  <td>${item.price}</td>
                  <td>{item.stock}</td>
                  <td className="text-muted">{item.lastOrder}</td>
                  <td>
                    {item.status === "new" && (
                      <Badge bg="primary-light" text="primary">
                        New Arrival
                      </Badge>
                    )}
                    {item.status === "trending" && (
                      <Badge bg="info-light" text="info">
                        Trending
                      </Badge>
                    )}
                    {item.status === "hot" && (
                      <Badge bg="success-light" text="success">
                        Hot
                      </Badge>
                    )}
                  </td>
                  <td>
                    <a className="me-3 text-lg text-success" href="#!">
                      <FontAwesomeIcon icon={faEdit} />
                    </a>
                    <a className="text-lg text-danger" href="#!">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer className="text-end">
        <Button variant="outline-dark" href="#!">
          See all orders
        </Button>
      </Card.Footer>
    </Card>
  )
}
