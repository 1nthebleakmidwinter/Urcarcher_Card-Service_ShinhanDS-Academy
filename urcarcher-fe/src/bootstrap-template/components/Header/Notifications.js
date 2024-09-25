import React from "react"
import { Dropdown, NavItem, NavLink } from "react-bootstrap"
import Icon from "../Icon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faUpload } from "@fortawesome/free-solid-svg-icons"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
export default function Notifications() {
  const notifications = [
    {
      type: "twitter",
      content: "You have 2 followers",
    },
    {
      type: "message",
      content: "You have 6 new messages",
    },
    {
      type: "system",
      content: "Server rebooted",
    },
    {
      type: "twitter",
      content: "You have 2 followers",
    },
  ]
  return (
    <Dropdown as={NavItem} className="me-2" align="end">
      <Dropdown.Toggle
        as={NavLink}
        className="text-gray-400 px-1 nav-link-icon"
        id="notifications"
      >
        <Icon icon="sales-up-1" className="svg-icon-md svg-icon-heavy" />
        <span className="notification-badge bg-green" />
      </Dropdown.Toggle>
      <Dropdown.Menu
        data-bs-popper="none"
        className="text-sm dropdown-menu-animated"
        aria-labelledby="notifications"
      >
        {notifications.map((notification, index) => (
          <Dropdown.Item href="#" key={index}>
            <div className="d-flex align-items-center">
              <div
                className={`icon icon-sm text-white ${
                  notification.type === "twitter" ? "bg-indigo" : "bg-blue"
                } ${notification.type === "message" ? "bg-green" : "bg-blue"}`}
              >
                {notification.type === "twitter" && (
                  <FontAwesomeIcon icon={faTwitter} />
                )}
                {notification.type === "system" && (
                  <FontAwesomeIcon icon={faUpload} />
                )}
                {notification.type === "message" && (
                  <FontAwesomeIcon icon={faEnvelope} />
                )}
              </div>
              <div className="text ms-2">
                <p className="mb-0">{notification.content}</p>
              </div>
            </div>
          </Dropdown.Item>
        ))}

        <Dropdown.Divider />
        <Dropdown.Item className="text-center" href="#">
          <small className="fw-bold text-uppercase">
            View all notifications
          </small>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
