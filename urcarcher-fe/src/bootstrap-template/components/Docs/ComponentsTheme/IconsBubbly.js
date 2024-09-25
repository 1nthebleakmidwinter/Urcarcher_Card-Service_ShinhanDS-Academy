import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"
import Icon from "../../Icon"

import React from "react"
import { Col, Row } from "react-bootstrap"

export default function IconsBubbly() {
  return (
    <div id="icons-bubbly" className="docs-item">
      <h5 className="mb-4">Icons - Bubbly</h5>
      <div className="docs-desc">
        <p>
          This theme also comes with a <strong>150+ Premium SVG icons</strong>{" "}
          with appropriate license. No additional purchase is necessary.
        </p>
        <p className="lead">
          You can use new <strong>Icon</strong> component to conveniently
          display icons.
        </p>
        <SyntaxHighlighter
          language="javascript"
          style={tomorrow}
          className="rounded shadow p-4"
        >
          {iconHighlight}
        </SyntaxHighlighter>
        <p className="text-muted text-large">
          For a complete icon reference, see{" "}
          <a href="https://demo.bootstrapious.com/bubbly/1-1/icons/demo.html">here</a>.
        </p>
      </div>
      <Row className="mt-5">
        {orionIcons.map((item, index) => (
          <Col
            xs={3}
            md={2}
            className="d-flex justify-content-center"
            key={index}
          >
            <Icon icon={item} className="w-3rem h-3rem mb-5" />
          </Col>
        ))}
      </Row>
    </div>
  )
}
const iconHighlight = `<Icon icon="smartphone-1" className="w-3rem h-3rem mb-5 svg-icon-light" />`

const orionIcons = [
  "smartphone-1",
  "discount-1",
  "airplane-mode-1",
  "destination-map-1",
  "beach-1",
  "dollar-sign-1",
  "sales-performance-up-1",
  "pen-1",
  "pay-1",
  "giftbox-1",
  "store-1",
  "bank-cards-1",
]
