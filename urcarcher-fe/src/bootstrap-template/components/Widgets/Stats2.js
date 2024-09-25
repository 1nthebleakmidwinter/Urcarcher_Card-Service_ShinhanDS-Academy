import React from "react"
import { Card, Col, Row } from "react-bootstrap"
import Icon from "../../components/Icon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"
export default function Stats2(props) {
  return (
    <Card className="h-100">
      <Card.Body className="p-3 p-sm-4 d-flex align-items-center justify-content-between">
        <div>
          <div className="subtitle mb-2 text-muted">{props.name}</div>
          <h4 className={`fw-normal text-${props.color} h2`}>{props.number}</h4>
          {props.profit && (
            <p className="mb-0">
              $2,123{" "}
              <FontAwesomeIcon
                icon={faArrowUp}
                className={`ms-2 text-${props.color}`}
              />
            </p>
          )}
          {props.loss && (
            <p className="mb-0">
              $2,123{" "}
              <FontAwesomeIcon
                icon={faArrowDown}
                className={`ms-2 text-${props.color}`}
              />
            </p>
          )}
        </div>
        <div
          className={`d-none d-md-flex icon icon-xl ms-2 bg-${props.color}-light`}
        >
          <Icon icon={props.icon} className={`text-${props.color}`} />
        </div>
      </Card.Body>
    </Card>
  )
}
