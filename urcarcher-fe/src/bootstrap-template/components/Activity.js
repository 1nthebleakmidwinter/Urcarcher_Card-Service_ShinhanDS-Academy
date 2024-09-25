import React from "react"
import { Card, Col, Row } from "react-bootstrap"
import Avatar from "./Avatar"
import CardHeaderMore from "./CardHeaderMore"

export default function Activity() {
  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="card-heading">Latest activity</h5>
        <CardHeaderMore />
      </Card.Header>
      <Card.Body>
        <div className="list-group list-group-flush list-group-timeline">
          {activities.map((item, index) => (
            <div className="list-group-item px-0" key={index}>
              <Row>
                <Col xs="auto">
                  <Avatar image={item.user.img} className="me-2" border />
                </Col>
                <Col className="col ms-n3 pt-2 text-sm text-gray-800">
                  <strong className="text-dark">{item.user.name} </strong>{" "}
                  {item.text}
                  <div className="text-gray-500 small">{item.time}</div>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  )
}

const activities = [
  {
    text: "subscribed to your",
    time: "3m ago",
    user: {
      img: "/img/avatar-0.jpg",
      name: "Nielsen Cobb",
    },
  },
  {
    text: "liked your post 🎉",
    time: "4m ago",
    user: {
      img: "/img/avatar-1.jpg",
      name: "Margret Cote",
    },
  },
  {
    text: "placed an order.",
    time: "5m ago",
    user: {
      img: "/img/avatar-2.jpg",
      name: "Rachel Vinson",
    },
  },
  {
    text: 'commented on "How to season your new grill."',
    time: "6m ago",
    user: {
      img: "/img/avatar-3.jpg",
      name: "Gabrielle Aguirre",
    },
  },
  {
    text: " subscribed to your newsletter.",
    time: "7m ago",
    user: {
      img: "/img/avatar-4.jpg",
      name: "Spears Collier",
    },
  },
  {
    text: " liked your post 🎉",
    time: "8m ago",
    user: {
      img: "/img/avatar-5.jpg",
      name: "Keisha Thomas",
    },
  },
  {
    text: " placed an order.",
    time: "9m ago",
    user: {
      img: "/img/avatar-6.jpg",
      name: "Elisabeth Key",
    },
  },
  {
    text: 'commented on "How to season your new grill."',
    time: "10m ago",
    user: {
      img: "/img/avatar-7.jpg",
      name: "Patel Mack",
    },
  },
  {
    text: " subscribed to your newsletter.",
    time: "11m ago",
    user: {
      img: "/img/avatar-8.jpg",
      name: "Erika Whitaker",
    },
  },
  {
    text: " liked your post 🎉",
    time: "12m ago",
    user: {
      img: "/img/avatar-9.jpg",
      name: "Meyers Swanson",
    },
  },
  {
    text: " placed an order.",
    time: "13m ago",
    user: {
      img: "/img/avatar-10.jpg",
      name: "Townsend Sloan",
    },
  },
  {
    text: 'commented on "How to season your new grill."',
    time: "14m ago",
    user: {
      img: "/img/avatar-11.jpg",
      name: "Millicent Henry",
    },
  },
]
