import React from "react"
import { Card } from "react-bootstrap"
import CardHeaderMore from "./CardHeaderMore"
import Icon from "./Icon"

export default function CardBlock({ title, icon, iconColor, content }) {
  return (
    <Card>
      <Card.Header>
        <h5 className="card-heading">{title}</h5>
        <CardHeaderMore />
      </Card.Header>
      <Card.Body>
        <div className="d-md-flex align-items-center">
          <div className="icon icon-xl bg-orange-light mx-auto me-3">
            <Icon className={iconColor} icon={icon} />
          </div>
          <div
            className="text-muted"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </Card.Body>
    </Card>
  )
}
