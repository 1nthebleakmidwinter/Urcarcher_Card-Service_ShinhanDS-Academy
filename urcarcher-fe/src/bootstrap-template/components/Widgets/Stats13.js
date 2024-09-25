import React from "react"
import { Card } from "react-bootstrap"
import Icon from "../Icon"
export default function Stats13(props) {
  return (
    <Card className={`h-100`}>
      <Card.Body>
        <div
          className={`icon icon-lg float-end ${
            props.color ? "bg-" + props.color + "-light" : "bg-primary-light"
          }`}
          style={{ position: "relative", top: "-.8rem", right: "-.8rem" }}
        >
          <Icon
            className={`svg-icon-md svg-icon-heavy ${
              props.color ? "text-" + props.color : "text-primary"
            }`}
            icon={props.icon}
          />
        </div>
        <h6>{props.name}</h6>
        <h3 className={props.color ? "text-" + props.color : "text-primary"}>
          {props.number}
        </h3>
        <p className="text-muted text-sm mb-0">{props.date}</p>
      </Card.Body>
    </Card>
  )
}
