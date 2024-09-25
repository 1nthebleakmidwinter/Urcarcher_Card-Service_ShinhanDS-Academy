import React, { useEffect, useRef } from "react"

import Choices from "choices.js"
export default function ChoicesComponent(props) {
  const inputRef = useRef(false)
  useEffect(() => {
    const select = new Choices(inputRef.current, {
      placeholder: true,
      searchPlaceholderValue: "Search",
      itemSelectText: "Select",
      removeItemButton: true,
    })

    return () => select.destroy()
  }, [])
  return (
    <div style={{ zIndex: 10 }} className="position-relative">
      <select
        className={props.className ? props.className : ""}
        ref={inputRef}
        multiple={props.multiple}
        defaultValue={props.multiple ? props.selected : false}
      >
        {props.options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
