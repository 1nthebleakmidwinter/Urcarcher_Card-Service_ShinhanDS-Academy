import React from "react"
import { Card } from "react-bootstrap"
import Icon from "../Icon"
export default function Stats12(props) {
  return (
    <Card className={`h-100 bg-${props.color}-light`}>
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <h6>{props.name}</h6>
          <h3
            className={`mb-0 ${
              props.color ? "text-" + props.color : "text-primary"
            }`}
          >
            {props.number}
          </h3>
        </div>
        <Icon
          icon={props.icon}
          className={props.color ? "text-" + props.color : "text-primary"}
        />
      </Card.Body>
    </Card>
  )
}
