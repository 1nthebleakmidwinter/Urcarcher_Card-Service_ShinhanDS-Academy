import React, { useEffect, useRef, useState } from "react"
import * as Ladda from "ladda"
import "ladda/dist/ladda-themeless.min.css"
import { Button } from "react-bootstrap"

export default function ProgressButton({
  label,
  type,
  variant,
  size,
  className,
}) {
  const buttonRef = useRef(null)

  const [laddaFunc, setLaddaFunc] = useState(null)

  useEffect(() => {
    if (Ladda) {
      setLaddaFunc(Ladda.create(buttonRef?.current))
    }
  }, [Ladda])

  const onClick = () => {
    laddaFunc.start()
    let value = 0

    const interval = setInterval(() => {
      value = Math.min(value + Math.random() * 0.1, 1)
      laddaFunc.setProgress(value)

      if (value === 1) {
        laddaFunc.setProgress(0)
        clearInterval(interval)
        laddaFunc.stop()
      }
    }, 200)
  }

  return (
    <Button
      ref={buttonRef}
      data-style={type}
      variant={variant ?? "primary"}
      size={size}
      className={`${className ? className : ""} `}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}
