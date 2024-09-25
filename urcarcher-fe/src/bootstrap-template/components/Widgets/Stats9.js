import React from "react"
import { Card, Col, ProgressBar, Row } from "react-bootstrap"
import Icon from "../Icon"
export default function Stats9(props) {
  return (
    <Card className="h-100">
      <Card.Header className="py-4">
        <h6 className="card-heading">{props.header}</h6>
      </Card.Header>
      <Card.Body className="pt-3 pb-0">
        <div className="h2 mb-3">{props.number}</div>
        {props.graphs.map((item, index) => (
          <React.Fragment key={index}>
            <Row className="align-items-center mb-3">
              <Col sm={3} className="text-muted text-sm">
                {item.name}
              </Col>
              <Col sm={7}>
                <ProgressBar variant={item.color} now={item.progress} />
              </Col>
              <Col sm={2} className="text-muted text-sm">
                {item.progress}%
              </Col>
            </Row>
          </React.Fragment>
        ))}
      </Card.Body>
    </Card>
  )
}
