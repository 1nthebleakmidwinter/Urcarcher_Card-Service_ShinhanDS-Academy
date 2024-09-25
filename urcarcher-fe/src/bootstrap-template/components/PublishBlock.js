import React, { useState } from "react"
import { Row, Col, Card, Form, Button, Collapse } from "react-bootstrap"
import Datepicker from "../components/Datepicker"
export default function PublishBlock() {
  const [statusOpen, setStatusOpen] = useState(false)
  const [visibilityOpen, setVisibilityOpen] = useState(false)
  const [publishOpen, setPublishOpen] = useState(false)
  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="py-4">
        <h4 className="card-heading">Publish</h4>
      </Card.Header>
      <Card.Body className="text-gray-700">
        <div className="d-flex mb-4 justify-content-between">
          <Button size="sm" variant="outline-secondary">
            Save Draft
          </Button>
          <Button size="sm" variant="outline-secondary">
            Preview
          </Button>
        </div>
        <hr className="bg-gray-500" />
        <div className="mb-3">
          Status: <strong>Draft </strong>
          <a
            className="ms-2 text-sm"
            role="button"
            aria-expanded={statusOpen}
            aria-controls="collapseStatus"
            onClick={() => setStatusOpen(!statusOpen)}
          >
            Edit
          </a>
          <Collapse in={statusOpen}>
            <div className="py-2" id="collapseStatus">
              <Form.Select aria-label="Default select example" size="sm">
                <option>Draft</option>
                <option>Pending Review</option>
              </Form.Select>
            </div>
          </Collapse>
        </div>
        <div className="mb-3">
          Visibility: <strong>Public </strong>
          <a
            className="ms-2 text-sm"
            role="button"
            aria-expanded={visibilityOpen}
            aria-controls="collapseVisibility"
            onClick={() => setVisibilityOpen(!visibilityOpen)}
          >
            Edit
          </a>
          <Collapse in={visibilityOpen}>
            <div className="py-2" id="collapseVisibility">
              <Form.Check
                type="radio"
                name="visibility"
                id="visibility1"
                label="Public"
                defaultChecked
              />
              <Form.Check
                type="radio"
                name="visibility"
                id="visibility2"
                label="Password protected"
              />
              <Form.Check
                type="radio"
                name="visibility"
                id="visibility3"
                label="Private"
              />
            </div>
          </Collapse>
        </div>
        <div className="mb-3">
          Publish: <strong>immediately </strong>
          <a
            className="ms-2 text-sm"
            role="button"
            aria-expanded={publishOpen}
            aria-controls="collapsePublish"
            onClick={() => setPublishOpen(!publishOpen)}
          >
            Edit
          </a>
          <Collapse in={publishOpen}>
            <div className="py-3" id="collapsePublish">
              <Row className="g-2">
                <Col lg={6}>
                  <Datepicker
                    size="sm"
                    id="datePublished"
                    defaultValue="10/20/2017"
                  />
                </Col>
                <Col lg={6}>
                  <div className="d-flex align-items-center text-sm">
                    <span className="me-1">at</span>
                    <Form.Control
                      size="sm"
                      id="hoursPublished"
                      type="text"
                      defaultValue="8"
                      className="text-center"
                    />
                    <span className="mx-1">:</span>
                    <Form.Control
                      size="sm"
                      id="minutesPublished"
                      type="text"
                      defaultValue="00"
                      className="text-center"
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Collapse>
        </div>
      </Card.Body>
      <Card.Footer className="text-end">
        <Button variant="primary">Publish</Button>
      </Card.Footer>
    </Card>
  )
}
