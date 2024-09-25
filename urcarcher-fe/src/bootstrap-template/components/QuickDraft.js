import React, { useState } from "react"
import { Button, Card, Form } from "react-bootstrap"
import CardHeaderMore from "./CardHeaderMore"

export default function QuickDraft() {
  const [inputs, setInputs] = useState({})
  const onSubmit = (e) => {
    e.preventDefault()

    // Print inputs values to console
    console.log("title:", inputs.title)
    console.log("content:", inputs.content)
  }
  return (
    <Card>
      <Card.Header>
        <h5 className="card-heading">Quick draft</h5>
        <CardHeaderMore />
      </Card.Header>
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <div className="mb-4">
            <Form.Label htmlFor="quickDraftTitle">Title</Form.Label>
            <Form.Control
              id="quickDraftTitle"
              type="text"
              value={inputs.title || ""}
              onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
              required
            />
            <Form.Text>The title is how it appears on your site.</Form.Text>
          </div>
          <div className="mb-4">
            <Form.Label htmlFor="quickDraftText">Content</Form.Label>
            <Form.Control
              as="textarea"
              id="quickDraftText"
              name="quickDraftText"
              rows="5"
              placeholder="What's on your mind?"
              value={inputs.content || ""}
              required
              onChange={(e) =>
                setInputs({ ...inputs, content: e.target.value })
              }
            />
            <Form.Text>
              The description is not prominent by default; however, some themes
              may show it.
            </Form.Text>
          </div>
          <Button type="submit">Save draft</Button>
        </Form>
      </Card.Body>
      <Card.Footer className="py-4">
        <h6>Your Recent Drafts</h6>
        <ul className="list-unstyled text-sm card-text">
          <li className="mb-2">
            <a href="#!">Gear</a>{" "}
            <time className="text-muted">January 5, 2022</time>
          </li>
          <li>
            <a href="#!">Stories</a>{" "}
            <time className="text-muted">January 2, 2022</time>
          </li>
        </ul>
      </Card.Footer>
    </Card>
  )
}
