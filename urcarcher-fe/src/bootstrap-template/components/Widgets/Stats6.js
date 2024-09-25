import React from "react"
import { Card, Col, ProgressBar, Row } from "react-bootstrap"
export default function Stats6(props) {
  return (
    <Card className="h-100">
      <Card.Body>
        <Row>
          <Col sm={5}>
            <div className="h2">{props.number}</div>
            <p className="subtitle">{props.name}</p>
            <ProgressBar now={props.progress} variant={props.color} />
          </Col>
          <Col sm={7}>
            <Row>
              {props.cols.map((item, index) => (
                <Col xs={6} className="text-center" key={index}>
                  <div className="h3">{item.number}</div>
                  <p className="text-muted fw-normal">{item.name}</p>
                  <hr />
                  <p className="text-muted mb-0">{item.data}</p>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}
