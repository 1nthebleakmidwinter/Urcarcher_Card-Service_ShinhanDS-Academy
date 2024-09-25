import React, { useEffect, useRef } from "react"
import { Donut } from "gaugeJS"

export default function GaugeComponent({ className, color, min, max, value }) {
  const gaugeRef = useRef(false)
  const valueRef = useRef(false)

  var opts = {
    angle: 0, // The span of the gauge arc
    lineWidth: 0.06, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0.6, // // Relative to gauge radius
      strokeWidth: 0.035, // The thickness
      color: "#fff", // Fill color
    },
    fontSize: 20,
    limitMax: false, // If false, max value increases automatically if value > maxValue
    limitMin: false, // If true, the min value of the gauge will be fixed
    colorStart: "#6F6EA0", // Colors
    colorStop: color ? color : "#864DD9", // just experiment with them
    strokeColor: "#eee", // to see which ones work best for you
    generateGradient: false,
    scaleOverride: true,
    highDpiSupport: true, // High resolution support
  }

  useEffect(() => {
    const gauge = new Donut(gaugeRef.current).setOptions(opts) // create sexy gauge!
    gauge.maxValue = max ? max : 3000 // set max gauge value
    gauge.setMinValue(min ? min : 0) // set min value
    gauge.set(value) // set actual value
    gauge.setTextField(valueRef.current)

    // Remove on production
    const loop = setInterval(() => {
      gauge.set(Math.floor(Math.random() * 3000))
    }, 5000)
    return () => clearInterval(loop)
  }, [])
  return (
    <div className="gauge-container">
      <canvas
        className={`gauge-canvas ${className ? className : ""}`}
        ref={gaugeRef}
      />
      <span className="gauge-label" ref={valueRef} />
    </div>
  )
}
