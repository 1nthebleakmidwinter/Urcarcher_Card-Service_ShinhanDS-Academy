import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Card, Col, ProgressBar, Row } from "react-bootstrap"
export default function Stats7({ data }) {
  return (
    <Card className="h-100">
      <Card.Body className="d-flex align-items-center">
        <Row className="gy-5 flex-fill">
          {data.map((item, index) => (
            <Col sm={6} key={index}>
              <Row>
                <Col sm={2} className="text-lg">
                  {item.profit && (
                    <FontAwesomeIcon
                      icon={faArrowUp}
                      className="text-success"
                    />
                  )}
                  {item.loss && (
                    <FontAwesomeIcon
                      icon={faArrowDown}
                      className="text-danger"
                    />
                  )}
                </Col>
                <Col sm={10}>
                  <h2>{item.loss || item.profit}</h2>
                  <h6 className="text-muted fw-normal p-b-20 p-t-10">
                    {item.name}
                  </h6>
                  <ProgressBar
                    now={item.progress}
                    variant={item.profit ? "success" : "danger"}
                  />
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  )
}
