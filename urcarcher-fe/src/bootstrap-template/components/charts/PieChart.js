import React, { useEffect, useRef } from "react"
import {
  Chart,
  CategoryScale,
  PieController,
  ArcElement,
  PointElement,
  LinearScale,
  Legend,
} from "chart.js"

export default function ChartComponent({
  className,
  color,
  labels,
  values,
  hideLegend,
  aspectRatio,
}) {
  const chartRef = useRef(false)
  const options = {
    plugins: {
      legend: {
        display: !hideLegend,
      },
    },
    aspectRatio: aspectRatio ? aspectRatio : 2,
  }

  const data = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: color,
        hoverBackgroundColor: color,
      },
    ],
  }
  useEffect(() => {
    Chart.register(
      PieController,
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
      type: "pie",
      options: options,
      data: data,
    })
    return () => chart.destroy()
  }, [])
  return <canvas className={className} ref={chartRef} />
}
