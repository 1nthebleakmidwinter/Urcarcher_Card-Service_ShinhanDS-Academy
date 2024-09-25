import React, { useEffect, useRef, useState } from "react"
import * as Ladda from "ladda"
import "ladda/dist/ladda-themeless.min.css"
import { Button } from "react-bootstrap"
export default function LoadingButton({
  type,
  label,
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
    setTimeout(() => {
      laddaFunc.stop()
    }, 2000)
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
