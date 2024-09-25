import React from "react"
import { ProgressBar } from "react-bootstrap"
export default function Stats14(props) {
  return (
    <React.Fragment>
      <h6 className="subtitle fw-normal text-muted">{props.name}</h6>
      <h5 className="m-b-25">
        {props.number}
        <span
          className={`ms-3 float-end ${
            props.color ? "text-" + props.color : "text-primary"
          }`}
        >
          {props.number2}
        </span>
      </h5>
      <ProgressBar variant={props.color} now={props.progress} />
    </React.Fragment>
  )
}
