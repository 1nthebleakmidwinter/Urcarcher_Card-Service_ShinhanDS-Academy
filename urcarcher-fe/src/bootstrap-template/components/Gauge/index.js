import React from "react"
import dynamic from "next/dynamic"

export default function Gauge(props) {
  const GaugeComponent = dynamic(() => import("./GaugeComponent"), {
    ssr: false,
  })

  return <GaugeComponent {...props} />
}
