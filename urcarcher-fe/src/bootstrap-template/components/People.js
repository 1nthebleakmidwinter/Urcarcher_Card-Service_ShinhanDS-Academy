import React from "react"
import { Button, Card } from "react-bootstrap"
import Avatar from "./Avatar"
import CardHeaderMore from "./CardHeaderMore"

export default function People({ data, title }) {
  return (
    <Card className="h-100">
      <Card.Header>
        <h5 className="card-heading">{title ?? "Popular authors"}</h5>
        <CardHeaderMore />
      </Card.Header>
      <Card.Body className="pb-2">
        {data?.map((item) => (
          <div key={item.name} className="d-flex align-items-center mb-3">
            <Avatar className="me-2" border image={item.img} alt={item.name} />
            <div className="mt-1">
              <a className="text-dark fw-bold text-decoration-none" href="#!">
                {item.name}
              </a>
              <p className="text-muted text-sm mb-0">{item.description}</p>
            </div>
          </div>
        ))}
      </Card.Body>
      <Card.Footer className="text-end">
        <Button variant="outline-primary" href="#!">
          View all people
        </Button>
      </Card.Footer>
    </Card>
  )
}
