import React from "react"
import { Badge } from "react-bootstrap"

import Icon from "../../Icon"
export default function Badges() {
  return (
    <div id="badges" className="docs-item">
      <h5 className="mb-4">Badges</h5>
      <div className="docs-desc">
        <p>Small count and labeling component.</p>
      </div>
      <h6 className="text-uppercase fw-normal">Classic Badges</h6>
      <div className="mb-4">
        <Badge bg="primary" className="me-2 p-2">
          primary
        </Badge>
        <Badge bg="secondary" className="me-2 p-2">
          secondary
        </Badge>
        <Badge bg="success" className="me-2 p-2">
          success
        </Badge>
        <Badge bg="warning" className="me-2 p-2">
          warning
        </Badge>
        <Badge bg="info" className="me-2 p-2">
          info
        </Badge>
        <Badge bg="danger" className="me-2 p-2">
          danger
        </Badge>
      </div>
      <h6 className="text-uppercase fw-normal">Pill Badges</h6>
      <div className="mb-4">
        <Badge bg="primary" className="me-2 p-2" pill>
          primary
        </Badge>
        <Badge bg="secondary" className="me-2 p-2" pill>
          secondary
        </Badge>
        <Badge bg="success" className="me-2 p-2" pill>
          success
        </Badge>
        <Badge bg="warning" className="me-2 p-2" pill>
          warning
        </Badge>
        <Badge bg="info" className="me-2 p-2" pill>
          info
        </Badge>
        <Badge bg="danger" className="me-2 p-2" pill>
          danger
        </Badge>
      </div>
      <h6 className="text-uppercase fw-normal">Light Badges</h6>
      <div className="mb-4">
        <Badge bg="primary-light" text="primary" className="me-2 p-2" pill>
          primary
        </Badge>
        <Badge bg="secondary-light" text="secondary" className="me-2 p-2" pill>
          secondary
        </Badge>
        <Badge bg="success-light" text="success" className="me-2 p-2" pill>
          success
        </Badge>
        <Badge bg="warning-light" text="warning" className="me-2 p-2" pill>
          warning
        </Badge>
        <Badge bg="info-light" text="info" className="me-2 p-2" pill>
          info
        </Badge>
        <Badge bg="danger-light" text="danger" className="me-2 p-2" pill>
          danger
        </Badge>
      </div>
      <h6 className="text-uppercase fw-normal">Notification Badges</h6>
      <a
        className="position-relative text-gray-400 p-2 me-3 text-decoration-none"
        href="#"
      >
        <Icon icon="paper-plane-1" className="svg-icon-md svg-icon-heavy" />
        <span className="notification-badge notification-badge-number bg-primary">
          10
        </span>
      </a>
      <a
        className="position-relative text-gray-400 py-2 px-1 me-3 text-decoration-none"
        href="#"
      >
        <Icon icon="smartphone-1" className="svg-icon-md svg-icon-heavy" />
        <span className="notification-badge notification-badge-number bg-warning">
          5
        </span>
      </a>
      <a
        className="position-relative text-gray-400 py-2 px-1 me-3 text-decoration-none"
        href="#"
      >
        <Icon icon="sales-up-1" className="svg-icon-md svg-icon-heavy" />
        <span className="notification-badge bg-green" />
      </a>
      <a
        className="position-relative text-gray-400 py-2 px-1 me-3 text-decoration-none"
        href="#"
      >
        <Icon icon="bank-cards-1" className="svg-icon-md svg-icon-heavy" />
        <span className="notification-badge bg-blue" />
      </a>
    </div>
  )
}
