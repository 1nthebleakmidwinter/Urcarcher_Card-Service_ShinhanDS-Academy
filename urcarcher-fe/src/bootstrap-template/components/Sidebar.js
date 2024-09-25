import React, { useEffect, useState } from "react"
import Icon from "./Icon"
import Router from "next/router"
import data from "../data/sidebar.json"
import { Badge, Collapse } from "react-bootstrap"
import { useRouter } from "next/router"
import ActiveLink from "./ActiveLink"
export default function Sidebar({ sidebarShrink }) {
  const [dropdown, setDropdown] = useState({})
  const [activeParent, setActiveParent] = useState()
  const router = useRouter()
  const toggleDropdown = (e, name) => {
    e && e.preventDefault()
    setDropdown({ ...dropdown, [name]: !dropdown[name] })
  }

  const highlightDropdownParent = () => {
    data.map((block) => {
      block.items.map((item) => {
        item.links &&
          item.links.map((link) => {
            if (link.link && link.link === Router.route) {
              toggleDropdown(false, item.name)
              setActiveParent(item.name)
            }
          })
      })
    })
  }
  useEffect(() => {
    highlightDropdownParent()
    router.events.on("routeChangeComplete", highlightDropdownParent)
    return () => {
      router.events.off("routeChangeComplete", highlightDropdownParent)
    }
  }, [])

  return (
    <div
      className={`sidebar py-3 ${sidebarShrink ? "shrink show" : ""}`}
      id="sidebar"
    >
      {data.map((block) => (
        <React.Fragment key={block.name}>
          <h6 className="sidebar-heading">{block.name}</h6>
          <ul className="list-unstyled">
            {block.items.map((item) => (
              <li key={item.name} className="sidebar-list-item">
                <ActiveLink href={item.link} activeClassName="active">
                  <a
                    className={`sidebar-link text-muted ${
                      activeParent === item.name ? "active" : ""
                    }`}
                    onClick={(e) =>
                      item.links
                        ? toggleDropdown(e, item.name)
                        : (setDropdown({}), setActiveParent(item.name))
                    }
                    data-bs-toggle={item.links && "collapse"}
                    role={item.links && "button"}
                    aria-expanded={dropdown[item.name]}
                  >
                    <Icon className="svg-icon-md me-3" icon={item.icon} />

                    <span className="sidebar-link-title">{item.name}</span>
                  </a>
                </ActiveLink>
                {item.links && (
                  <Collapse in={dropdown[item.name]}>
                    <ul className="sidebar-menu list-unstyled">
                      {item.links.map((link) => (
                        <li key={link.name} className="sidebar-list-item">
                          <ActiveLink href={link.link} activeClassName="active">
                            <a
                              className="sidebar-link text-muted"
                              onClick={() => setActiveParent(item.name)}
                            >
                              {link.name}
                              {link.new && (
                                <Badge
                                  bg="info"
                                  className="ms-2 text-decoration-none"
                                >
                                  New
                                </Badge>
                              )}
                            </a>
                          </ActiveLink>
                        </li>
                      ))}
                    </ul>
                  </Collapse>
                )}
              </li>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </div>
  )
}
