import React from "react"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
export default function EditProfile({ data }) {
  return (
    <Card className="mb-4">
      <Form>
        <Card.Header>
          <h4 className="card-heading">{data.name}</h4>
        </Card.Header>
        <Card.Body>
          <Row>
            {data.inputs.map((input, index) => (
              <Col sm={6} md={input.size.md} key={index}>
                {(input.type === "text" ||
                  input.type === "email" ||
                  input.type === "number") && (
                  <div className="mb-4">
                    <Form.Label>{input.label}</Form.Label>
                    <Form.Control
                      type={input.type}
                      placeholder={input.placeholder}
                      defaultValue={input.defaultValue}
                    />
                  </div>
                )}
                {input.type === "select" && (
                  <div className="mb-4">
                    <Form.Label>{input.label}</Form.Label>
                    <Form.Control as="select">
                      {input.options.map((option, index) => (
                        <option key={option} key={index}>
                          {option}
                        </option>
                      ))}
                    </Form.Control>
                  </div>
                )}
              </Col>
            ))}
            <Col md={12}>
              <div className="mb-0">
                <Form.Label>{data.aboutMe.name}</Form.Label>

                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder={data.aboutMe.placeholder}
                  defaultValue={data.aboutMe.text}
                />
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-end">
          <Button variant="primary" type="submit">
            Update Profile
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  )
}
