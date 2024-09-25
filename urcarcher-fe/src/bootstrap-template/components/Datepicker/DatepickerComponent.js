import React, { useEffect, useRef } from "react"
import { Form, InputGroup } from "react-bootstrap"
import { Datepicker, DateRangePicker } from "vanillajs-datepicker"

export default function DatepickerComponent(props) {
  const datepickerRef = useRef(false)
  useEffect(() => {
    const datepicker = props.range
      ? new DateRangePicker(datepickerRef.current, {
          buttonClass: "btn",
          format: "mm/dd/yyyy",
          autohide: props.autohide,
        })
      : new Datepicker(datepickerRef.current, {
          buttonClass: "btn",
          format: "mm/dd/yyyy",
          autohide: props.autohide,
          maxNumberOfDates: props.maxNumberOfDates,
        })
    return () => datepicker.destroy()
  }, [])
  return props.range ? (
    <InputGroup ref={datepickerRef}>
      <Form.Control type="text" />
      <InputGroup.Text>To</InputGroup.Text>
      <Form.Control type="text" />
    </InputGroup>
  ) : (
    <Form.Control
      defaultValue={props.defaultValue}
      size={props.size}
      type="text"
      ref={datepickerRef}
    />
  )
}
