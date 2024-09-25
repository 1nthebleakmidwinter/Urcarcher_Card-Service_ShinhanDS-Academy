import React from "react"
import { Card } from "react-bootstrap"
import Image from "../../CustomImage"

import src from "../../../../public/img/photos/sorasak-_UIN-pFfJ7c-unsplash.jpg"
export default function BackgroundImages() {
  return (
    <div id="backgroundimage" className="docs-item">
      <h5 className="mb-4">Background image</h5>
      <div className="docs-desc">
        <p>
          Utility class that turns a <code>&lt;img class="bg-image"&gt;</code>{" "}
          into a background image for its parent. Useful e.g. for carousels.
          Make sure that image's parent container and the content that should be
          placed over the image are relatively positioned.
        </p>
      </div>
      <Card className="position-relative py-5 overflow-hidden">
        <Image src={src} alt="" layout="fill" className="bg-image" />

        <Card.Body className="text-center position-relative">
          <h3 className="text-white text-uppercase mb-0">
            I have a background image
          </h3>
        </Card.Body>
      </Card>
    </div>
  )
}
