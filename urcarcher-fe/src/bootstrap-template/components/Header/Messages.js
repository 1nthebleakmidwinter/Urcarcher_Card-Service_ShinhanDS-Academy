import React from "react"
import { Dropdown, NavItem, NavLink } from "react-bootstrap"
import Icon from "../Icon"
import Avatar from "../Avatar"

export default function Messages() {
  const messages = [
    {
      avatar: "/img/avatar-0.jpg",
      name: "Jason Doe",
    },
    {
      avatar: "/img/avatar-1.jpg",
      name: "Frank Williams",
    },
    {
      avatar: "/img/avatar-2.jpg",
      name: "Ashley Wood",
    },
  ]
  return (
    <Dropdown as={NavItem} className="me-2 me-lg-3" align="end">
      <Dropdown.Toggle
        as={NavLink}
        className="text-gray-400 px-1 nav-link-icon"
        id="messages"
      >
        <Icon icon="paper-plane-1" className="svg-icon-md svg-icon-heavy" />
        <span className="notification-badge notification-badge-number bg-primary">
          10
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu
        data-bs-popper="none"
        className="text-sm dropdown-menu-animated"
        aria-labelledby="messages"
      >
        {messages.map((message, index) => (
          <Dropdown.Item
            key={index}
            className="d-flex align-items-center p-3"
            href="#"
          >
            <Avatar
              image={message.avatar}
              alt={message.name}
              className="me-2"
              size="sm"
              border
            />

            <div className="pt-1">
              <h6 className="fw-bold mb-0">{message.name}</h6>
              <span className="text-muted text-sm">Sent you a message</span>
            </div>
          </Dropdown.Item>
        ))}

        <Dropdown.Divider />
        <Dropdown.Item className="text-center" href="#">
          <small className="fw-bold text-uppercase">View all messages</small>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
