import React from "react"

import { Card, Button } from "react-bootstrap"
import CardHeaderMore from "../CardHeaderMore"
import Avatar from "../Avatar"
import Link from "next/link"
export default function Members({ data }) {
  return (
    <Card className="h-100">
      <Card.Header>
        <h5 className="card-heading">Team members</h5>
        <CardHeaderMore />
      </Card.Header>
      <Card.Body className="pb-2">
        {data.map((item, index) => (
          <div className="d-flex align-items-center mb-3" key={index}>
            <Avatar
              image={item.img}
              alt={item.person}
              border
              className="me-2"
            />
            <div className="mt-1">
              <Link href={item.link}>
                <a className="text-dark fw-bold text-decoration-none">
                  {item.person}
                </a>
              </Link>
              <p className="text-muted text-sm mb-0">{item.company}</p>
            </div>
          </div>
        ))}
      </Card.Body>
      <Card.Footer className="text-end">
        <Button>View all people</Button>
      </Card.Footer>
    </Card>
  )
}
