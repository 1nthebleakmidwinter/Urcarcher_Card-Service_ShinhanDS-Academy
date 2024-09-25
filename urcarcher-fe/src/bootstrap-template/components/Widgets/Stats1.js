import React from "react"
import { Card, Col, Row } from "react-bootstrap"
import Icon from "../../components/Icon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretUp } from "@fortawesome/free-solid-svg-icons"
export default function Stats1(props) {
  return (
    <Card className="h-100">
      <Card.Body className="d-flex align-items-center justify-content-between">
        <div>
          <h4 className={`fw-normal text-${props.color}`}>{props.number}</h4>
          <p className="subtitle text-sm text-muted mb-0">{props.name}</p>
        </div>
        <div className="flex-shrink-0 ms-3">
          <Icon icon={props.icon} className={`text-${props.color}`} />
        </div>
      </Card.Body>
      <Card.Footer className={`py-3 bg-${props.color}-light`}>
        <Row className={`align-items-center text-${props.color}`}>
          <Col xs={10}>
            <p className="mb-0">{props.footer}</p>
          </Col>
          <Col xs={2} className="text-end">
            <FontAwesomeIcon icon={faCaretUp} />
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  )
}
