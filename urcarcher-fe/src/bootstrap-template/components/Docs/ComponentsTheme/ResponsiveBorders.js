import React from "react"

export default function ResponsiveBorders() {
  return (
    <div id="responsiveborders" className="docs-item">
      <h5 className="mb-4">Responsive borders</h5>
      <div className="docs-desc">
        <p>
          Responsive borders as an addition to Bootstrap's{" "}
          <a href="https://getbootstrap.com/docs/4.1/utilities/borders/">
            border utilities
          </a>
          .
        </p>
      </div>
      <div className="p-3 bg-gray-200 rounded">
        <h6 className="text-muted text-uppercase font-weight-normal mb-3">
          Class reference
        </h6>
        <p className="card-text">
          <code>.border-sm</code>, <code>.border-md</code>, etc.
        </p>
      </div>
    </div>
  )
}
