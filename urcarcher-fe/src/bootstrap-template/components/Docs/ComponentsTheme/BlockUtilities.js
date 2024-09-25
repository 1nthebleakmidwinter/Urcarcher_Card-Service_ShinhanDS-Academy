import React from "react"

export default function BlockUtilities() {
  return (
    <div id="blockutilities" className="docs-item">
      <h5 className="mb-4">Block utilities</h5>
      <div className="docs-desc">
        <p>Additional utility classes, for block elements mostly.</p>
      </div>
      <div className="p-3 bg-gray-200 rounded">
        <h6 className="text-muted text-uppercase font-weight-normal mb-3">
          Class reference
        </h6>
        <p className="card-text">
          <code>.bg-gray-100</code> to <code>.bg-gray-900</code> - grayscale
          backgrounds
        </p>
        <p className="card-text">
          <code>.bg-primary-light</code>, <code>.bg-secondary-light</code> -
          lighter backgrounds for the theme colours
        </p>
        <p className="card-text">
          <code>.opacity-1</code> to <code>.opacity-9</code> - opacity helper
        </p>
        <p className="card-text">
          <code>.hover-scale</code> - scale element on hover
        </p>
        <p className="card-text">
          <code>.hover-animate</code> - move element up by few pixels on hover
        </p>
        <p className="card-text">
          <code>.hover-scale-bg-image</code> - scale element's background
          picture on hover
        </p>
      </div>
    </div>
  )
}
