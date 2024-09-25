import React from "react"
import { Row, Col, Card } from "react-bootstrap"
import Image from "../../CustomImage"

import src from "../../../../public/img/photos/sorasak-_UIN-pFfJ7c-unsplash.jpg"
export default function ImageOverlay() {
  return (
    <div id="imageoverlay" className="docs-item">
      <h5 className="mb-4">Image overlay</h5>
      <div className="docs-desc">
        <p>
          Utility class that darkens or lightens the backround image of the
          element to enhance the legibility. It can be used with cards, carousel
          slides, etc.
        </p>
        <p>
          Gradient overlay adds vertical gradient that's darkest on the bottom
          third of the element.
        </p>
      </div>
      <Row>
        <Col lg={6} xl={4}>
          <Card className="mb-5 border-0 text-white dark-overlay shadow-lg">
            <Card.Img
              src="/img/photos/elizabeth-gottwald-dnIWYrliZfU-unsplash.jpg"
              alt=""
            />
            <a className="tile-link" href="/category" />
            <Card.ImgOverlay className="d-flex align-items-center">
              <div className="w-100 overlay-content">
                <h2 className="text-center mb-0">Dark overlay </h2>
              </div>
            </Card.ImgOverlay>
          </Card>
        </Col>
        <Col lg={6} xl={4}>
          <Card className="mb-5 border-0 text-center light-overlay shadow-lg">
            <Card.Img
              src="/img/photos/elizabeth-gottwald-dnIWYrliZfU-unsplash.jpg"
              alt=""
            />
            <a className="tile-link" href="/category" />
            <Card.ImgOverlay className="d-flex align-items-center">
              <div className="w-100 overlay-content">
                <h2 className="text-center mb-0">Light overlay </h2>
              </div>
            </Card.ImgOverlay>
          </Card>
        </Col>
        <Col lg={6} xl={4}>
          <Card className=" mb-5 border-0 text-center gradient-overlay shadow-lg">
            <Card.Img
              src="/img/photos/elizabeth-gottwald-dnIWYrliZfU-unsplash.jpg"
              alt=""
            />
            <a className="tile-link" href="/category" />
            <div className="card-img-overlay-bottom z-index-20 text-white">
              <Card.Text className="h5">Gradient Overlay</Card.Text>
            </div>
          </Card>
        </Col>
      </Row>
      <div className="p-3 bg-gray-200 rounded">
        <h6 className="text-muted text-uppercase font-weight-normal mb-3">
          Class reference
        </h6>
        <Card.Text>
          <code>.dark-overlay</code>, <code>.light-overlay</code>,{" "}
          <code>.gradient-overlay</code> - CSS class to be used on the element
        </Card.Text>
        <Card.Text>
          <code>.overlay-content</code> - use this class on the element's
          content to increase its Z-index and move it above the overlay layer
        </Card.Text>
      </div>
    </div>
  )
}
