import React, { useEffect, useRef } from "react"
import {
  Chart,
  CategoryScale,
  DoughnutController,
  ArcElement,
  PointElement,
  LinearScale,
  Legend,
} from "chart.js"

import { colors } from "./defaults"

export default function DonutChart({
  className,
  color,
  labels,
  values,
  cutout,
  aspectRatio,
  hideLegend,
}) {
  const chartRef = useRef(false)
  const options = {
    plugins: {
      legend: {
        display: !hideLegend,
      },
    },
    cutout: cutout ? cutout : "90%",
    aspectRatio: aspectRatio ? aspectRatio : 2,
  }

  const data = {
    labels: labels,
    datasets: [
      {
        data: values,
        borderWidth: [0, 0],
        backgroundColor: [colors[color], "#eee"],
        hoverBackgroundColor: [colors[color], "#eee"],
      },
    ],
  }
  useEffect(() => {
    Chart.register(
      DoughnutController,
      CategoryScale,
      ArcElement,
      PointElement,
      LinearScale,
      Legend
    )
    Chart.defaults.font.family =
      "Poppins, system-ui, -apple-system, Roboto, Arial, system-ui, -apple-system, sans-serif"
    Chart.defaults.plugins.tooltip.padding = 10
    Chart.defaults.plugins.tooltip.backgroundColor = "rgba(0, 0, 0, 0.7)"
    Chart.defaults.scale.ticks.color = "rgba(0, 0, 0, 0.4)"

    const chart = new Chart(chartRef.current, {
      type: "doughnut",
      options: options,
      data: data,
    })
    return () => chart.destroy()
  }, [])
  return <canvas className={className} ref={chartRef} />
}
