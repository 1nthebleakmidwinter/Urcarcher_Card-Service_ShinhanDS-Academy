import React, { useEffect, useRef } from "react"
import {
  Chart,
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js"

import { colors } from "./defaults"

export default function LineChart({
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
  hideLegend,
}) {
  const chartRef = useRef(false)
  const options = {
    plugins: {
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
      legend: {
        display: !hideLegend,
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      xAxis: {
        grid: {
          display: grid !== undefined,
          drawBorder: grid !== undefined,
        },
        display: hideLabels ? false : true,
      },

      yAxis: {
        min: min,
        max: max,
        grid: {
          display: grid !== undefined,
          drawBorder: grid !== undefined,
        },
        display: hideLabels ? false : true,
      },
    },
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        fill: true,
        tension: 0.4,
        backgroundColor: "transparent",
        borderColor: colors[color],
        pointBorderColor: colors[color],
        pointHoverBackgroundColor: colors[color],
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        borderWidth: 3,
        pointBackgroundColor: colors[color],
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        pointHitRadius: 1,
        data: values,
        spanGaps: false,
      },
    ],
  }
  useEffect(() => {
    Chart.register(
      LineController,
      CategoryScale,
      LineElement,
      PointElement,
      LinearScale,
      Tooltip,
      Legend
    )
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
