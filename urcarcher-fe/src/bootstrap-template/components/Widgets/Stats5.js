import React from "react"
import {
  Button,
  Card,
  OverlayTrigger,
  ProgressBar,
  Tooltip,
} from "react-bootstrap"
import Avatar from "../Avatar"
export default function Stats5(props) {
  return (
    <Card className="h-100">
      <Card.Body>
        <Button
          className="float-end"
          href={props.button.link}
          variant={props.color}
        >
          {props.button.label}
        </Button>
        <h4 className="h6">{props.name}</h4>
        <p className={`text-${props.color}`}>{props.category}</p>
        <p className="text-muted">{props.text}</p>
        <div className="mb-3">
          <div className="d-inline-block me-3">
            <div className="h3 mb-1">23</div>
            <div className="text-muted text-sm">Updates</div>
          </div>
          <div className="d-inline-block">
            <div className="h3 mb-1">2</div>
            <div className="text-muted text-sm">Milestones</div>
          </div>
        </div>
        <div className="mb-4">
          {props.participants.map((participant, index) => (
            <OverlayTrigger
              key={index}
              placement="top"
              overlay={
                <Tooltip id={"tooltip-" + participant.name}>
                  {participant.name}
                </Tooltip>
              }
            >
              <div className="avatar-stacked d-inline-block">
                <Avatar
                  size="sm"
                  border
                  image={participant.img}
                  alt={participant.name}
                />
              </div>
            </OverlayTrigger>
          ))}
        </div>
        <p className="sr-only">Progress</p>
        <ProgressBar now={props.progress} variant={props.color} />
      </Card.Body>
    </Card>
  )
}
