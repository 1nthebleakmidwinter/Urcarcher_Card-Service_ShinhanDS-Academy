import React from "react"

import { Card, Table, Form, Button } from "react-bootstrap"
import Avatar from "../Avatar"
import CardHeaderMore from "../CardHeaderMore"
export default function ActiveTickets({ data }) {
  return (
    <Card className="card-table h-100">
      <Card.Header>
        <h5 className="card-heading">Active Tickets</h5>
        <CardHeaderMore />
      </Card.Header>
      <Card.Body>
        <Table responsive borderless hover className="align-middle mb-0">
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  className="position-relative mb-0"
                  style={{ top: "2px" }}
                  label="Due"
                />
              </th>
              <th style={{ minWidth: "200px" }}>User</th>
              <th style={{ minWidth: "400px" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <Form.Check className="form-check">
                    <Form.Check.Input type="checkbox" />
                    <Form.Check.Label
                      dangerouslySetInnerHTML={{ __html: item.due }}
                    />
                  </Form.Check>
                </td>
                <td className="d-flex align-items-center">
                  <Avatar
                    image={item.user.img}
                    alt={item.user.name}
                    className="me-2"
                    border
                  />
                  <span className="d-inline-block mb-0">{item.user.name}</span>
                </td>
                <td>
                  <strong>
                    [#{item.id}] {item.description.title}
                  </strong>
                  <p className="text-muted text-sm mb-0">
                    {item.description.text}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer className="text-end">
        <Button href="#!">View all tickets</Button>
      </Card.Footer>
    </Card>
  )
}
