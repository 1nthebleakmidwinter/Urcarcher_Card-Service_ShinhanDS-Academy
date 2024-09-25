import React from "react"

import {
  Form,
  Dropdown,
  NavItem,
  InputGroup,
  Button,
  Badge,
} from "react-bootstrap"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

import Link from "next/link"
import Avatar from "../Avatar"
import { faFile } from "@fortawesome/free-regular-svg-icons"

export default function Search() {
  const links = [
    {
      header: "Recent pages",
      links: [
        {
          name: "Posts",
          link: "/cms-post",
        },
        {
          name: "Widgets",
          link: "/widgets-stats",
        },
        {
          name: "Profile",
          link: "/pages-profile",
        },
      ],
    },
    {
      header: "Users",
      links: [
        {
          name: "Jason Doe",
          link: "/pages-profile",
          image: "/img/avatar-0.jpg",
        },
        {
          name: "Frank Williams",
          link: "/pages-profile",
          image: "/img/avatar-1.jpg",
        },
        {
          name: "Ashley Wood",
          link: "/pages-profile",
          image: "/img/avatar-2.jpg",
        },
      ],
    },
    {
      header: "Filters",
      links: [
        {
          name: "Search all posts",
          badge: "Posts",
          link: "#!",
        },
        {
          name: "Only in users",
          badge: "Users",
          link: "#!",
        },
        {
          name: "Only in campaigns",
          badge: "Campaigns",
          link: "#!",
        },
      ],
    },
  ]
  return (
    <Dropdown as={NavItem}>
      <Form className="ms-auto d-none d-lg-block me-4" id="searchForm">
        <Dropdown.Toggle
          as={InputGroup}
          size="sm"
          role="search"
          className="input-group-navbar"
        >
          <Form.Control size="sm" type="search" placeholder="Search ..." />
          <Button variant="transparent">
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </Dropdown.Toggle>
        <Dropdown.Menu
          data-bs-popper="none"
          className="text-sm dropdown-menu-animated"
        >
          {links.map((group, index) => (
            <React.Fragment key={group.header}>
              <Dropdown.Header className="text-uppercase fw-normal">
                {group.header}
              </Dropdown.Header>
              {group.links.map((item, index) => (
                <Link href={item.link} passHref key={index}>
                  <Dropdown.Item
                    className={`py-1 ${
                      item.image ? "d-flex align-items-center" : ""
                    }`}
                  >
                    {item.image && (
                      <Avatar
                        size="xs"
                        className="me-2"
                        border
                        priority
                        image={item.image}
                        alt={item.name}
                      />
                    )}
                    {!item.image && !item.badge && (
                      <FontAwesomeIcon icon={faFile} className="me-2" />
                    )}
                    {item.badge === "Posts" && (
                      <Badge bg="success-light" text="success" className="me-2">
                        {item.badge}
                      </Badge>
                    )}
                    {item.badge === "Users" && (
                      <Badge bg="danger-light" text="danger" className="me-2">
                        {item.badge}
                      </Badge>
                    )}
                    {item.badge === "Campaigns" && (
                      <Badge bg="warning-light" text="warning" className="me-2">
                        {item.badge}
                      </Badge>
                    )}
                    {item.name}
                  </Dropdown.Item>
                </Link>
              ))}
              {index < links.length - 1 && <Dropdown.Divider />}
            </React.Fragment>
          ))}
        </Dropdown.Menu>
      </Form>
    </Dropdown>
  )
}
