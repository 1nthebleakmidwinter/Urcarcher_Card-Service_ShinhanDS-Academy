import React, { useEffect, useRef } from "react"
import {
  Chart,
  CategoryScale,
  LineController,
  BarController,
  BarElement,
  PointElement,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js"

import { colors, gradients } from "./defaults"
export default function BarChart2({
  className,
  color,
  color2,
  values,
  values2,
  label,
  label2,
  dollar,
  labels,
  hideX,
  grid,
  min,
  max,
  gradient,
  gradient2,
  hideLegend,
}) {
  const chartRef = useRef(false)
  const options = {
    plugins: {
      legend: {
        display: !hideLegend,
      },
      tooltip: {
        mode: "nearest",
        intersect: false,
        callbacks: {
          label:
            dollar &&
            function (TooltipItem) {
              return "$" + TooltipItem.formattedValue
            },
        },
      },
    },
    scales: {
      xAxes: {
        display: !hideX,
        grid: {
          display: grid,
        },
      },

      yAxes: {
        display: true,
        min: min,
        max: max,
        grid: {
          display: grid,
          color: "#eee",
        },
      },
    },
  }
  useEffect(() => {
    Chart.register(
      LineController,
      CategoryScale,
      BarController,
      BarElement,
      PointElement,
      LinearScale,
      Tooltip,
      Legend
    )

    const data = {
      labels: labels,
      datasets: [
        {
          label: label,
          backgroundColor: gradient
            ? gradients(chartRef)[gradient]
            : colors[color],
          hoverBackgroundColor: gradient
            ? gradients(chartRef)[gradient]
            : colors[color],
          borderColor: gradient ? gradients(chartRef)[gradient] : colors[color],
          borderWidth: 0,
          data: values,
        },
        {
          label: label2,
          backgroundColor: gradient2
            ? gradients(chartRef)[gradient2]
            : colors[color2],
          hoverBackgroundColor: gradient2
            ? gradients(chartRef)[gradient2]
            : colors[color2],
          borderColor: gradient2
            ? gradients(chartRef)[gradient2]
            : colors[color2],
          borderWidth: 1,
          data: values2,
          hidden: !values2,
        },
      ],
    }
    Chart.defaults.font.family =
      "Poppins, system-ui, -apple-system, Roboto, Arial, system-ui, -apple-system, sans-serif"
    Chart.defaults.plugins.tooltip.padding = 10
    Chart.defaults.plugins.tooltip.backgroundColor = "rgba(0, 0, 0, 0.7)"
    Chart.defaults.scale.ticks.color = "rgba(0, 0, 0, 0.4)"
    const chart = new Chart(chartRef.current, {
      type: "bar",
      options: options,
      data: data,
    })
    return () => chart.destroy()
  }, [Legend, options])
  return <canvas className={className} ref={chartRef} />
}
