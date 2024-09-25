import React from "react"
import { Card, Table, Button, Badge } from "react-bootstrap"
import CardHeaderMore from "../CardHeaderMore"
import Image from "../CustomImage"
import Stars from "../Stars"
export default function Orders({ data }) {
  return (
    <Card className="card-table mb-4">
      <Card.Header>
        <h5 className="card-heading">Orders</h5>
        <CardHeaderMore />
      </Card.Header>
      <Card.Body>
        <Table borderless hover responsive className="mb-0">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Name</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Status</th>
              <th className="text-end">Review</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr className="align-middle" key={index}>
                  <td>#{item.id}</td>
                  <td>
                    <strong>{item.customer.name}</strong>
                    <br />
                    <span className="text-muted text-sm">
                      {item.customer.email}
                    </span>
                  </td>
                  <td>{item.date}</td>
                  <td>${item.total}</td>
                  <td>
                    {item.status === "open" && (
                      <Badge bg="success-light" text="success">
                        Open
                      </Badge>
                    )}
                    {item.status === "closed" && (
                      <Badge bg="danger-light" text="danger">
                        Closed
                      </Badge>
                    )}
                    {item.status === "inprogress" && (
                      <Badge bg="info-light" text="info">
                        In Progress
                      </Badge>
                    )}
                    {item.status === "onhold" && (
                      <Badge bg="warning-light" text="warning">
                        On Hold
                      </Badge>
                    )}
                  </td>
                  <td className="text-end" style={{ minWidth: "125px" }}>
                    <Stars stars={item.stars} />
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
