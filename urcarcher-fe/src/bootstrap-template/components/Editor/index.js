import React from "react"
import dynamic from "next/dynamic"
export default function index(props) {
  const QuillComponent = dynamic(() => import("./QuillComponent"), {
    ssr: false,
  })
  return <QuillComponent {...props} />
}
