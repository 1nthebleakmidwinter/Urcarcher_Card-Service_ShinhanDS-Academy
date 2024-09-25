import React from "react"
import { Card, Col, Row } from "react-bootstrap"
import Icon from "../Icon"
export default function Stats8(props) {
  return (
    <Card className="h-100">
      <Card.Header className="py-4">
        <h6 className="card-heading">{props.header}</h6>
      </Card.Header>
      <Card.Body className={props.icon ? "pt-3" : ""}>
        {props.number && (
          <div className="display-4 text-center mb-4">{props.number}</div>
        )}
        {props.icon && (
          <div className="icon icon-xl bg-primary-light mx-auto mb-3">
            <Icon icon={props.icon} className="text-primary" />
          </div>
        )}
        <Row
          className={props.icon ? "position-relative" : ""}
          style={props.icon && { top: "10px" }}
        >
          {props.cols.map((item, index) => (
            <Col sm={6} className="text-center h-100" key={index}>
              <p className="text-muted text-sm">{item.name}</p>
              <div className={`h4 mb-0 text-${item.color}`}>{item.number}</div>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  )
}
