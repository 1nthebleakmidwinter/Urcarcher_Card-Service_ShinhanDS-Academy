import React from "react"
import { Card, Col, ProgressBar, Row, Button } from "react-bootstrap"
export default function Stats10(props) {
  return (
    <Card className="h-100">
      <Card.Header>
        <h6 className="card-heading">{props.header}</h6>
      </Card.Header>
      <Card.Body>
        <h2 className="mb-3">{props.number}</h2>
        <Row>
          <Col xs="auto">
            <p className="text-muted text-sm mt-2">{props.text}</p>
          </Col>
          <Col className="text-end text-lg">{props.number2}</Col>
        </Row>
        <ProgressBar now={props.progress} variant={props.color} />
      </Card.Body>
      <Card.Footer className="text-end">
        <Button href={props.button.link} variant={props.color}>
          {props.button.label}
        </Button>
      </Card.Footer>
    </Card>
  )
}
