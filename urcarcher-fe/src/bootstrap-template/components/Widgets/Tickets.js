import React from "react"

import { Card, Table, Badge } from "react-bootstrap"
import CardHeaderMore from "../CardHeaderMore"
export default function Tickets({ data }) {
  return (
    <Card className="card-table h-100">
      <Card.Header>
        <h5 className="card-heading">Recent Tickets</h5>
        <CardHeaderMore />
      </Card.Header>
      <Card.Body>
        <Table responsive borderless hover>
          <thead>
            <tr>
              <th>Status</th>
              <th style={{ minWidth: "180px" }}>Subject</th>
              <th>Department</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              let variant
              switch (item.status) {
                case "Closed":
                  variant = "danger"
                  break
                case "On Hold":
                  variant = "warning"
                  break
                case "In Progres":
                  variant = "info"
                  break
                default:
                  variant = "success"
              }

              return (
                <tr key={index}>
                  <td>
                    <Badge bg={variant + "-light"} text={variant}>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="fw-bold">{item.subject}</td>
                  <td className="text-muted text-sm">{item.department}</td>
                  <td className="text-muted text-sm">{item.date}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}
