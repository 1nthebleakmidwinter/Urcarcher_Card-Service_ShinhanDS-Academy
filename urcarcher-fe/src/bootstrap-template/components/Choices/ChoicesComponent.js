import React, { useEffect, useRef } from "react"
import { Form } from "react-bootstrap"
import Choices from "choices.js"
export default function ChoicesSelect(props) {
  const inputRef = useRef(false)
  useEffect(() => {
    const textRemove = new Choices(inputRef.current, {
      delimiter: ",",
      editItems: true,
      removeItemButton: true,
    })

    // Example of how to retreive added items - https://github.com/Choices-js/Choices#events
    if (inputRef.current) {
      const value = (e) => {
        console.log(e)
      }
      inputRef.current.addEventListener("addItem", value)

      // UseEffect cleanup
      return () => inputRef.current?.removeEventListener("addItem", value)
    }

    return () => textRemove.destroy()
  }, [])
  return (
    <div>
      <Form.Control type="text" {...props} ref={inputRef} />
    </div>
  )
}
