import { Badge, Card, Dropdown, ProgressBar } from "react-bootstrap"
import CardHeaderMore from "./CardHeaderMore"
import React from "react"
import Avatar from "./Avatar"
import {
  faEdit,
  faEllipsisV,
  faExpandArrowsAlt,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import DataTable from "./DataTable"
export default function Contracts() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "user.name",
        Cell: ({ cell: { value }, row: { values, original } }) => {
          return (
            <div className="d-flex align-items-center">
              <Avatar
                image={original.user.img}
                text={original.user.text}
                variant={original.user.variant}
                alt={original.user.name}
                border
                className={`me-2`}
                style={original.user.text && { padding: "0.25rem" }}
              />
              <div className="pt-1">
                <strong>{value}</strong>
                <br />
                <span className="text-muted text-sm">
                  {original.user.email}
                </span>
              </div>
            </div>
          )
        },
      },
      {
        Header: "Company",
        accessor: "company.name",
        Cell: ({ cell: { value }, row: { values, original } }) => {
          return (
            <div>
              <strong>{value}</strong>
              <br />
              <span className="text-muted">{original.company.subtitle}</span>
            </div>
          )
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell: { value } }) => {
          let status
          switch (value) {
            case "closed":
              status = (
                <Badge bg="danger-light" text="danger">
                  <span className="indicator" />
                  Closed
                </Badge>
              )
              break
            case "on-hold":
              status = (
                <Badge bg="warning-light" text="warning">
                  <span className="indicator" />
                  On hold
                </Badge>
              )
              break
            case "in-progress":
              status = (
                <Badge bg="info-light" text="info">
                  <span className="indicator" />
                  In Progress
                </Badge>
              )
              break
            default:
              status = (
                <Badge bg="success-light" text="success">
                  <span className="indicator" />
                  Open
                </Badge>
              )
          }
          return <div>{status}</div>
        },
      },

      {
        Header: "Contract",
        accessor: "contract",
        Cell: ({ cell: { value } }) => {
          return (
            <div
              className="d-flex align-items-center"
              style={{ minWidth: 125 }}
            >
              <span className="me-2">{value}%</span>
              <ProgressBar now={value} className="progress-table" />
            </div>
          )
        },
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ cell: { value } }) => {
          return (
            <div className="d-flex align-items-center justify-content-between">
              <span className="me-3">{value}</span>
              <div>
                <Dropdown align="end">
                  <Dropdown.Toggle variant="header-more">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="text-sm">
                    <Dropdown.Item href="#!">
                      <FontAwesomeIcon
                        icon={faExpandArrowsAlt}
                        className="me-2 opacity-5"
                      />
                      Expand
                    </Dropdown.Item>
                    <Dropdown.Item href="#!">
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="me-2 opacity-5"
                      />
                      Edit
                    </Dropdown.Item>

                    <Dropdown.Item href="#!">
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="me-2 opacity-5"
                      />
                      Remove
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          )
        },
      },
    ],
    []
  )
  return (
    <Card className="card-table mb-4">
      <Card.Header>
        <div className="card-heading">Latest contracts</div>
        <CardHeaderMore />
      </Card.Header>
      <Card.Body>
        <DataTable columns={columns} items={contracts} />
      </Card.Body>
    </Card>
  )
}

const contracts = [
  {
    user: {
      name: "Sargent Gray",
      img: "/img/avatar-7.jpg",
      email: "sargentgray@orbean.com",
    },
    company: {
      name: "Orbean",
      subtitle: "Allison",
    },
    status: "closed",
    contract: 49,
    date: "2021/01/20",
  },
  {
    user: {
      name: "Margret Cote",
      text: "N",
      variant: "primary-light",
      email: "margretcote@zilidium.com",
    },
    company: {
      name: "Zilidium",
      subtitle: "Foxworth",
    },
    status: "on-hold",
    contract: 13,
    date: "2021/03/01",
  },
  {
    user: {
      name: "Nielsen Cobb",
      img: "/img/avatar-2.jpg",
      email: "nielsencobb@memora.com",
    },
    company: {
      name: "Memora",
      subtitle: "Graniteville",
    },
    status: "open",
    contract: 30,
    date: "2021/11/26",
  },
  {
    user: {
      name: "Rachel Vinson",
      img: "/img/avatar-3.jpg",
      email: "rachelvinson@chorizon.com",
    },
    company: {
      name: "Chorizon",
      subtitle: "Eastmont",
    },
    status: "in-progress",
    contract: 100,
    date: "2021/08/07",
  },
  {
    user: {
      name: "Spears Collier Gray",
      img: "/img/avatar-5.jpg",
      email: "spearscollier@remold.com",
    },
    company: {
      name: "Remold",
      subtitle: "Hebron",
    },
    status: "open",
    contract: 6,
    date: "2021/05/23",
  },
  {
    user: {
      name: "Sargent Gray",
      img: "/img/avatar-7.jpg",
      email: "sargentgray@orbean.com",
    },
    company: {
      name: "Orbean",
      subtitle: "Allison",
    },
    status: "closed",
    contract: 49,
    date: "2021/01/20",
  },

  {
    user: {
      name: "Nielsen Cobb",
      img: "/img/avatar-2.jpg",
      email: "nielsencobb@memora.com",
    },
    company: {
      name: "Memora",
      subtitle: "Graniteville",
    },
    status: "open",
    contract: 30,
    date: "2021/11/26",
  },
  {
    user: {
      name: "Spears Collier Gray",
      img: "/img/avatar-5.jpg",
      email: "spearscollier@remold.com",
    },
    company: {
      name: "Remold",
      subtitle: "Hebron",
    },
    status: "open",
    contract: 6,
    date: "2021/05/23",
  },
  {
    user: {
      name: "Margret Cote",
      text: "N",
      variant: "primary-light",
      email: "margretcote@zilidium.com",
    },
    company: {
      name: "Zilidium",
      subtitle: "Foxworth",
    },
    status: "on-hold",
    contract: 13,
    date: "2021/03/01",
  },
]
