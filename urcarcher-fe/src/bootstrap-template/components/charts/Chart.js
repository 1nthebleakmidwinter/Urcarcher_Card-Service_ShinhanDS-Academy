import React, { useEffect, useRef } from "react"
import {
  Chart,
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js"
export default function ChartComponent({ className, type, data, options }) {
  const chartRef = useRef(false)

  useEffect(() => {
    const colors = {
      primary: "#4650dd",
      blue: "#0d6efd",
      indigo: "#6610f2",
      purple: "#6f42c1",
      pink: "#d63384",
      pinkLighter: "#e685b5",
      red: "#dc3545",
      orange: "#fd7e14",
      yellow: "#ffc107",
      green: "#35b653",
      teal: "#20c997",
      cyan: "#17a2b8",
      white: "#fff",
    }
    let canvasContext = document.createElement("canvas").getContext("2d")
    let whiteBlue = canvasContext.createLinearGradient(0, 0, 300, 300)
    whiteBlue.addColorStop(0, "rgba(255,255,255, 0.8)")
    whiteBlue.addColorStop(1, "rgba(70,80,221, 0.8)")

    let pinkBlue = canvasContext.createLinearGradient(140, 0, 150, 300.0)
    pinkBlue.addColorStop(0, "rgba(63,94,251,.85)")
    pinkBlue.addColorStop(1, "rgba(252,70,107, .85)")

    let primaryWhite = canvasContext.createLinearGradient(0, 0, 0, 200)
    primaryWhite.addColorStop(0, colors.primary)
    primaryWhite.addColorStop(1, colors.white)
    const gradients = {
      whiteBlue: whiteBlue,
      pinkBlue: pinkBlue,
      primaryWhite: primaryWhite,
    }
    Chart.register(
      LineController,
      CategoryScale,
      LineElement,
      PointElement,
      LinearScale,
      Tooltip,
      Title
    )
    Chart.defaults.font.family =
      "Poppins, system-ui, -apple-system, Roboto, Arial, system-ui, -apple-system, sans-serif"
    Chart.defaults.plugins.tooltip.padding = 10
    Chart.defaults.plugins.tooltip.backgroundColor = "rgba(0, 0, 0, 0.7)"
    Chart.defaults.scale.ticks.color = "rgba(0, 0, 0, 0.4)"
    console.log(Chart.defaults)
    const chart = new Chart(chartRef.current, {
      type: type,
      options: options,
      data: data,
    })
    return () => chart.destroy()
  }, [])
  return (
    <div>
      <canvas className={className} ref={chartRef} />
    </div>
  )
}
