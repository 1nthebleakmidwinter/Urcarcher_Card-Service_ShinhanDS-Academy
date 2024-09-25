import React from "react"
import dynamic from "next/dynamic"
export default function index(props) {
  const DatepickerComponent = dynamic(() => import("./DatepickerComponent"), {
    ssr: false,
  })
  return <DatepickerComponent {...props} />
}
