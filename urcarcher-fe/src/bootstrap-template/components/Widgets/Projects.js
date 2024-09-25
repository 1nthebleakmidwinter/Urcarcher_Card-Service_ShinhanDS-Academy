import React from "react"

import { Card, Button, Table, Badge } from "react-bootstrap"
import CardHeaderMore from "../CardHeaderMore"
import Avatar from "../Avatar"
export default function Projects({ data, lightHeader }) {
  return (
    <Card className="card-table h-100">
      <Card.Header>
        <h5 className="card-heading">Projects</h5>
        <CardHeaderMore />
      </Card.Header>
      <Card.Body>
        <Table responsive hover className="mb-0">
          <thead className={lightHeader ? "light" : ""}>
            <tr>
              <th>Assigned </th>
              <th>Name</th>
              <th>Due </th>
              <th className="text-end">Priority</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {data.map((item, index) => {
              let variant
              switch (item.priority) {
                case "High":
                  variant = "danger"
                  break
                case "Low":
                  variant = "warning"
                  break
                case "New":
                  variant = "info"
                  break
                default:
                  variant = "success"
              }
              return (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <Avatar
                        image={item.img}
                        alt={item.person}
                        border
                        className="me-2"
                      />
                      <span className="d-inline-block">
                        <strong>{item.person}</strong>
                        <br />
                        <span className="text-muted text-sm">{item.place}</span>
                      </span>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.due}</td>
                  <td className="text-end">
                    <Badge bg={variant + "-light"} text={variant}>
                      {item.priority}
                    </Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer className="text-end">
        <Button>View all projects</Button>
      </Card.Footer>
    </Card>
  )
}
