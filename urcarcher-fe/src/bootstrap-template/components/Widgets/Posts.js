import { faPortrait } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

import { Card, Button, Row, Col } from "react-bootstrap"
import CardHeaderMore from "../CardHeaderMore"
import Image from "../CustomImage"
export default function Posts({ data }) {
  return (
    <Card className="h-100">
      <Card.Header>
        <h5 className="card-heading">Latest Posts</h5>
        <CardHeaderMore />
      </Card.Header>
      <Card.Body>
        {data.map((item, index) => (
          <Row className="mb-3" key={index}>
            <Col xs="auto" className="pe-0">
              <div style={{ width: "100px" }}>
                <Image
                  layout="responsive"
                  width={100}
                  height={66}
                  src={item.img}
                  alt={item.name}
                  priority={item.priority}
                  className="img-fluid rounded"
                />
              </div>
            </Col>
            <Col>
              <a className="text-decoration-none" href="#!">
                <h6>{item.name}</h6>
              </a>
              <p className="text-sm mb-1">
                <FontAwesomeIcon icon={faPortrait} className="me-1" />
                {item.person} | {item.type}
              </p>
              <p className="text-muted text-sm mb-0">{item.text}</p>
            </Col>
          </Row>
        ))}
      </Card.Body>
      <Card.Footer className="text-end">
        <Button>View all posts</Button>
      </Card.Footer>
    </Card>
  )
}
