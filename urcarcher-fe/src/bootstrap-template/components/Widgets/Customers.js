import React from "react"
import { Card, Table, Button } from "react-bootstrap"
import CardHeaderMore from "../CardHeaderMore"
export default function Customers({ data }) {
  return (
    <Card className="card-table h-100">
      <Card.Header>
        <h5 className="card-heading">Latest Customers</h5>
        <CardHeaderMore />
      </Card.Header>
      <Card.Body>
        <Table responsive borderless hover className="align-middle mb-0">
          <thead>
            <tr>
              <th></th>
              <th>Country</th>
              <th>Name</th>
              <th className="text-end">Orders</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    className="img-fluid"
                    src={`/img/flag/${item.country.code}.svg`}
                    alt={item.country.name}
                    width="30"
                    style={{ minWidth: "30px" }}
                  />
                </td>
                <td>{item.country.name}</td>
                <td>{item.name}</td>
                <td className="text-end">{item.orders}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer className="text-end">
        <Button variant="outline-primary" href="#!">
          View all customers
        </Button>
      </Card.Footer>
    </Card>
  )
}
