export const colors = {
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
  lightPurple: "#d0d2f3",
}

export const gradients = (chartRef) => {
  const gradients = {}
  if (chartRef.current) {
    var context = chartRef.current.getContext("2d")

    gradients.whiteBlue = context.createLinearGradient(0, 0, 300, 300)
    gradients.whiteBlue.addColorStop(0, "rgba(255,255,255, 0.8)")
    gradients.whiteBlue.addColorStop(1, "rgba(70,80,221, 0.8)")

    gradients.pinkBlue = context.createLinearGradient(140, 0, 150, 300.0)
    gradients.pinkBlue.addColorStop(0, "rgba(63,94,251,.85)")
    gradients.pinkBlue.addColorStop(1, "rgba(252,70,107, .85)")

    gradients.primaryWhite = context.createLinearGradient(0, 0, 0, 200)
    gradients.primaryWhite.addColorStop(0, colors.primary)
    gradients.primaryWhite.addColorStop(1, colors.white)
  }

  return gradients
}
