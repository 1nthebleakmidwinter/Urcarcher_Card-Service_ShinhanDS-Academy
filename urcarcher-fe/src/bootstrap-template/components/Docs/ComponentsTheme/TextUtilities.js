import React from "react"

export default function TextUtilities() {
  return (
    <div id="textutilities" className="docs-item">
      <h5 className="mb-4">Text utilities</h5>
      <div className="docs-desc">
        <p>Text utility classes to control text size and more.</p>
      </div>
      <div className="p-3 bg-gray-200 rounded">
        <h6 className="text-muted text-uppercase font-weight-normal mb-3">
          Class reference
        </h6>
        <p className="card-text">
          <code>.text-gray-100</code> to <code>.text-gray-900</code> - grayscale
          text colours
        </p>
        <p className="card-text">
          <code>.text-sm</code>, <code>.text-lg</code>, <code>.text-xl</code> -
          text sizes
        </p>
        <p className="card-text">
          <code>.letter-spacing-1</code> to <code>.letter-spacing-5</code> -
          letter spacing 0.1em to 0.5em
        </p>
        <p className="card-text">
          <code>.z-index-1</code> to <code>.z-index-5</code> - z-index from 10
          to 50
        </p>
        <p className="card-text">
          <code>.text-hover-primary</code>, etc. - text colour on hover/focus
          for theme colours
        </p>
        <p className="card-text">
          <code>.overflow-visible</code> and <code>.overflow-hidden</code> -
          overflow control{" "}
        </p>
      </div>
    </div>
  )
}
