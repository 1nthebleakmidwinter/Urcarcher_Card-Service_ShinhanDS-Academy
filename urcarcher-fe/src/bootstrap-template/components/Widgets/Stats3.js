import React from "react"
import { Card } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"
export default function Stats3(props) {
  return (
    <Card className="text-center h-100">
      <Card.Body>
        <h6 className="mb-3">{props.name}</h6>
        {props.profit && (
          <h4 className="mb-3">
            <FontAwesomeIcon icon={faArrowUp} className="text-success me-2" />
            {props.profit}
          </h4>
        )}
        {props.loss && (
          <h4 className="mb-3">
            <FontAwesomeIcon icon={faArrowDown} className="text-danger me-2" />
            {props.loss}
          </h4>
        )}
        <Card.Text>{props.text}</Card.Text>
      </Card.Body>
    </Card>
  )
}
