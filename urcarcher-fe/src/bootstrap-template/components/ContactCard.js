import React from "react"
import { Button, Card } from "react-bootstrap"
import Icon from "./Icon"
export default function ContactCard() {
  return (
    <Card className="border-0 shadow mt-n5 mb-5">
      <Card.Header className="bg-primary-100 py-4 border-0">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <p className="subtitle text-sm text-primary mb-1">Drop Us a Line</p>
            <h4 className="mb-0">Contact</h4>
          </div>
          <Icon
            className="svg-icon-light ms-3 text-primary flex-shrink-0 svg-icon-lg"
            icon="ballpoint-pen-1"
          />
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text className="text-muted">
          He must have tried it a hundred times, shut his eyes so that he
          wouldn't have to look at the floundering legs, and only stopped when
          he began to feel a mild, dull pain there that he had never felt
          before.
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="outline-primary" href="#!">
          Let us know
        </Button>
      </Card.Footer>
    </Card>
  )
}
