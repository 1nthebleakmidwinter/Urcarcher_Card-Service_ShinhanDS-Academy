import React from "react"

import dynamic from "next/dynamic"
export function Choices(props) {
  const ChoicesComponent = dynamic(() => import("./ChoicesComponent"), {
    ssr: false,
  })

  return <ChoicesComponent {...props} />
}

export function ChoicesSelect(props) {
  const ChoicesSelect = dynamic(() => import("./ChoicesSelect"), {
    ssr: false,
  })

  return <ChoicesSelect {...props} />
}
