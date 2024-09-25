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
  labels,
  label,
  label2,

  values,
  values2,
  min,
  max,
  dollar,
  hideLabels,
  grid,
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
        display: hideLabels ? false : true,
      },

      yAxes: {
        min: min,
        max: max,

        grid: {
          display: grid,
          drawBorder: grid,
        },
        display: hideLabels ? false : true,
      },
    },
    elements: {
      line: {
        z: 25,
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
          backgroundColor: gradients(chartRef).whiteBlue,
          borderColor: gradients(chartRef).whiteBlue,
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          borderWidth: 1,
          pointBorderColor: gradients(chartRef).whiteBlue,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: colors.primary,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 15,
          data: values,
          spanGaps: false,
        },
        {
          label: label2,
          fill: true,
          lineTension: 0.3,
          backgroundColor: gradients(chartRef).pinkBlue,
          borderColor: gradients(chartRef).pinkBlue,
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          borderWidth: 1,
          pointBorderColor: gradients(chartRef).pinkBlue,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: colors.pink,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: values2,
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
