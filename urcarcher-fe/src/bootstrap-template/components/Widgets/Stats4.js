import React from "react"
import { Button, Card } from "react-bootstrap"
import Icon from "../Icon"
export default function Stats4(props) {
  return (
    <Card className="h-100">
      <Card.Body className="text-center">
        <div className={`icon icon-xl mx-auto mb-4 bg-${props.color}-light`}>
          <Icon icon={props.icon} className={"text-" + props.color} />
        </div>
        <h4 className="mt-3">
          <span className={`text-${props.color}`}>{props.number}</span>
          <span className="fw-normal"> {props.name}</span>
        </h4>
        <p className="mb-4">{props.text}</p>
        <Button variant={props.color} href={props.button.link}>
          {props.button.label}
        </Button>
      </Card.Body>
    </Card>
  )
}
