import React from "react"
import { faPaperPlane, faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Card, Form, InputGroup, ListGroup } from "react-bootstrap"
import Avatar from "./Avatar"
export default function Messages({ profile }) {
  return (
    <Card className="overflow-hidden mb-4">
      <Card.Header>
        <InputGroup>
          <Form.Control type="text" placeholder="Message" />
          <Button variant="outline-secondary">
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </InputGroup>
      </Card.Header>
      <ListGroup className="rounded-0">
        {profile.messages.map((message, index) => (
          <ListGroup.Item
            className="border-start-0 border-end-0 py-5 border-top-0"
            key={index}
          >
            <div className="d-flex">
              <div className="flex-shrink-0">
                <Avatar
                  image={profile.img}
                  alt={profile.name}
                  size="lg"
                  border
                />
              </div>
              <div className="flex-grow-1 ps-3">
                <small className="float-right">{message.time}</small>
                <h5 className="fw-bold">Nathan Andrews</h5>
                <div className="text-muted text-sm">{message.text}</div>
                {message.replies &&
                  message.replies.map((reply, replyIndex) => (
                    <div className="d-flex mt-4" key={replyIndex}>
                      <div className="flex-shrink-0">
                        <Avatar image={reply.img} alt={reply.author} border />
                      </div>
                      <div className="flex-grow-1 ps-3 text-sm text-muted">
                        <strong className="text-dark">{reply.author}: </strong>
                        {reply.text}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  )
}
