import React, { useEffect, useRef } from "react"
import {
  Chart,
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
  Filler,
} from "chart.js"

import { colors, gradients } from "./defaults"

export default function CustomLineChart({
  className,
  color,
  label,
  labels,
  values,
  min,
  max,
  dollar,
  hideLabels,
  grid,
  hideX,
}) {
  const chartRef = useRef(false)
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
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
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      xAxes: {
        grid: {
          display: grid,
        },
        display: hideX ? false : true,
      },

      yAxes: {
        min: min,
        max: max,
        type: "linear",
        grid: {
          display: grid,
          drawBorder: false,
        },
        display: hideLabels ? false : true,
      },
    },
  }

  useEffect(() => {
    Chart.register(
      LineController,
      CategoryScale,
      LineElement,
      PointElement,
      LinearScale,
      Tooltip,
      Filler
    )
    const data = {
      labels: labels,
      datasets: [
        {
          label: label,
          fill: true,
          lineTension: 0.3,
          backgroundColor: gradients(chartRef).primaryWhite,
          pointHoverBackgroundColor: colors[color],
          pointBorderColor: colors[color],
          borderColor: colors[color],
          borderCapStyle: "butt",
          borderDash: [],
          borderJoinStyle: "miter",
          borderWidth: 2,
          pointBackgroundColor: colors[color],
          pointBorderWidth: 5,
          pointHoverRadius: 5,
          pointHoverBorderColor: colors[color],
          pointHoverBorderWidth: 1,
          pointRadius: 0,
          pointHitRadius: 2,
          data: values,
          spanGaps: false,
        },
      ],
    }
    Chart.defaults.font.family =
      "Poppins, system-ui, -apple-system, Roboto, Arial, system-ui, -apple-system, sans-serif"
    Chart.defaults.plugins.tooltip.padding = 10
    Chart.defaults.plugins.tooltip.backgroundColor = "rgba(0, 0, 0, 0.7)"
    Chart.defaults.scale.ticks.color = "rgba(0, 0, 0, 0.4)"

    const chart = new Chart(chartRef.current, {
      type: "line",
      options: options,
      data: data,
    })
    return () => chart.destroy()
  }, [])
  return <canvas className={className} ref={chartRef} />
}
