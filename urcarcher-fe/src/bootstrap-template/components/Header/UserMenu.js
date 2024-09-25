import React from "react"

import { Dropdown, NavItem, NavLink } from "react-bootstrap"

import Link from "next/link"
import Avatar from "../Avatar"

export default function UserMenu() {
  return (
    <Dropdown as={NavItem} className="ms-auto" align="end">
      <Dropdown.Toggle as={NavLink} className="pe-0" id="userInfo">
        <Avatar image="/img/avatar-6.jpg" alt="Jason Doe" border priority />
      </Dropdown.Toggle>
      <Dropdown.Menu
        className="dropdown-menu-animated"
        aria-labelledby="userInfo"
        data-bs-popper="none"
      >
        <Dropdown.Header className="text-gray-700">
          <h6 className="text-uppercase font-weight-bold">Mark Stephen</h6>
          <small>Web Developer</small>
        </Dropdown.Header>
        <Dropdown.Divider />
        <Dropdown.Item href="#">Settings</Dropdown.Item>
        <Dropdown.Item href="#">Activity log </Dropdown.Item>
        <Dropdown.Divider />
        <Link href="/login" passHref>
          <Dropdown.Item>Logout</Dropdown.Item>
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  )
}
