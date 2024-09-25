import React from "react"
import { Card } from "react-bootstrap"
import CardHeaderMore from "./CardHeaderMore"
import Icon from "./Icon"

export default function AtGlance() {
  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="card-heading">At a glance</h5>
        <CardHeaderMore />
      </Card.Header>
      <Card.Body>
        <ul className="row list-unstyled card-text gy-4">
          <li className="col-sm-6 d-flex align-items-center">
            <div className="icon icon-md me-2 bg-blue-light">
              <Icon className="text-blue svg-icon-sm" icon="reading-1" />
            </div>

            <a className="text-dark text-sm" href="#!">
              <strong>112</strong> Posts
            </a>
          </li>
          <li className="col-sm-6 d-flex align-items-center">
            <div className="icon icon-md me-2 bg-blue-light">
              <Icon className="text-blue svg-icon-sm" icon="news-1" />
            </div>

            <a className="text-dark text-sm" href="#!">
              <strong>5</strong> Pages
            </a>
          </li>
          <li className="col-sm-6 d-flex align-items-center">
            <div className="icon icon-md me-2 bg-blue-light">
              <Icon className="text-blue svg-icon-sm" icon="chat-bubble-1" />
            </div>

            <a className="text-dark text-sm" href="#!">
              <strong>283</strong> Comments
            </a>
          </li>
          <li className="col-sm-6 d-flex align-items-center">
            <div className="icon icon-md me-2 bg-blue-light">
              <Icon className="text-blue svg-icon-sm" icon="time-1" />
            </div>

            <a className="text-dark text-sm" href="#!">
              <strong>4</strong> Comments in moderation
            </a>
          </li>
        </ul>
      </Card.Body>
      <Card.Footer className="py-4">
        <Card.Text className="text-muted text-sm">
          WordPress 5.9 running <a href="#!">Bubbly theme</a>.
        </Card.Text>
      </Card.Footer>
    </Card>
  )
}
