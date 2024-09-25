import React, { useEffect, useRef, useState } from "react"
import sparkline from "@fnando/sparkline"

export default function SparklineComponent({
  data,
  strokeWidth,
  height,
  stroke,
  className,
  showTooltip,
}) {
  const sparklineRef = useRef(false)
  const tooltipRef = useRef(false)

  useEffect(() => {
    const tooltip = tooltipRef.current
    var options = {
      onmousemove(event, datapoint) {
        const date = new Date(datapoint.date)
          .toUTCString()
          .replace(/^.*?, (.*?) \d{2}:\d{2}:\d{2}.*?$/, "$1")
        if (showTooltip) {
          tooltip.hidden = false
          tooltip.textContent = `${date}: $${datapoint.value.toFixed(2)} USD`
          tooltip.style.top = `${event.offsetY}px`
          tooltip.style.left = `${event.offsetX + 20}px`
        }
      },

      onmouseout() {
        if (showTooltip) {
          tooltip.hidden = true
        }
      },
    }
    sparklineRef.current && sparkline(sparklineRef.current, data, options)
  }, [])

  return (
    <div className="position-relative">
      <svg
        ref={sparklineRef}
        width="100"
        height={height ? height : 20}
        strokeWidth={strokeWidth ? strokeWidth : 2}
        className={className ? className : ""}
        stroke={stroke}
        fill="rgba(0, 0, 255, .2)"
      />
      {showTooltip && (
        <span className="sparkline--tooltip" ref={tooltipRef} hidden></span>
      )}
    </div>
  )
}
