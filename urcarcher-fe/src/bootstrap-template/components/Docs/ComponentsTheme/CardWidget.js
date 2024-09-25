import React from "react"
import { Col, Row } from "react-bootstrap"
import {
  faClipboardCheck,
  faDollarSign,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons"
import Pill from "../../Pill"
import ExampleCode from "../../ExampleCode"
export default function CardWidget() {
  return (
    <div id="cardwidget" className="docs-item">
      <h5 className="mb-4">Pill component</h5>
      <div className="docs-desc">
        <p>
          Pill component, similar to Bootstrap's <code>.card</code>.{" "}
        </p>
        <ExampleCode highlightCode={widgetHighlight} />
        <Row className="mt-5">
          <Col lg="4">
            <Pill
              data={{
                name: "Completed cases",
                content: "127 new cases",
              }}
              color="indigo"
              icon={faClipboardCheck}
            />
          </Col>
          <Col lg="4">
            <Pill
              data={{
                name: "New Quotes",
                content: "214 new quotes",
              }}
              color="green"
              icon={faDollarSign}
              className="mb-4"
            />
          </Col>
          <Col lg="4">
            <Pill
              data={{
                name: "New clients",
                content: "25 new clients",
              }}
              color="blue"
              icon={faUserFriends}
              className="mb-4"
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

const widgetHighlight = `import { faUserFriends } from "@fortawesome/free-solid-svg-icons" 
import Pill from "../../components/Pill"

export default function page(props) {
  return (
    <Pill
      data={{
        name: "New clients",
        content: "25 new clients",
      }}
      color="blue"
      icon={faUserFriends}
      className="mb-4"
    />
  )
}`
