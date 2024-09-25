import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Badge, Card, Col, ProgressBar, Row } from "react-bootstrap"
import Icon from "../Icon"
export default function Stats11(props) {
  const isNegative = Math.sign(props.percentage) === -1
  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column justify-content-between">
        <Row className="gx-1">
          <Col>
            <Icon
              icon={props.icon}
              className={`mb-3 ${
                props.color ? "text-" + props.color : "text-primary"
              }`}
            />
          </Col>
          <Col className="text-end">
            <h4
              className={props.color ? "text-" + props.color : "text-primary"}
            >
              {props.number}
            </h4>
            {props.percentage && (
              <p>
                <Badge
                  bg={isNegative ? "danger-light" : "success-light"}
                  text={isNegative ? "danger" : "success"}
                >
                  <FontAwesomeIcon
                    icon={isNegative ? faArrowDown : faArrowUp}
                    className="me-2"
                  />
                  {Math.sign(props.percentage) === 1 && "+"}
                  {props.percentage}%
                </Badge>
              </p>
            )}
          </Col>
        </Row>
        <p className="subtitle text-gray-600 mb-1">{props.name}</p>
        <ProgressBar now={props.progress} variant={props.color} />
      </Card.Body>
    </Card>
  )
}
