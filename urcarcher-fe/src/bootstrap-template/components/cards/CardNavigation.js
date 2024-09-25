import React from "react"
import { Card, Nav } from "react-bootstrap"

export default function CardNavigation() {
  return (
    <Card>
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="#" active>
              Active
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#">Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" disabled>
              Disabled
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
    </Card>
  )
}
