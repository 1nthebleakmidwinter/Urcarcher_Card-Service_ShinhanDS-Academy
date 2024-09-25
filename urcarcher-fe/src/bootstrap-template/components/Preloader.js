import React from "react"

export default function Preloader({ type, variant, center }) {
  const Preloader = () => {
    const bgClass = variant ? "bg-" + variant : ""
    const textClass = variant ? "text-" + variant : ""
    switch (type) {
      case "double-bounce":
        return (
          <div className="sk-double-bounce">
            <div
              className={`sk-child sk-double-bounce1 ${
                variant ? "bg-" + variant : ""
              }`}
            />
            <div
              className={`sk-child sk-double-bounce2 ${
                variant ? "bg-" + variant : ""
              }`}
            />
          </div>
        )
      case "wave":
        return (
          <div className="sk-wave">
            <div className={`sk-rect sk-rect1 ${bgClass}`}></div>
            <div className={`sk-rect sk-rect2 ${bgClass}`}></div>
            <div className={`sk-rect sk-rect3 ${bgClass}`}></div>
            <div className={`sk-rect sk-rect4 ${bgClass}`}></div>
            <div className={`sk-rect sk-rect5 ${bgClass}`}></div>
          </div>
        )
      case "wandering-cubes":
        return (
          <div className="sk-wandering-cubes">
            <div className={`sk-cube sk-cube1 ${bgClass}`}></div>
            <div className={`sk-cube sk-cube2 ${bgClass}`}></div>
          </div>
        )
      case "pulse":
        return (
          <div
            className={`${
              center ? "spinner" : "sk-spinner"
            } sk-spinner-pulse ${bgClass}`}
          />
        )
      case "chasing-dots":
        return (
          <div className="sk-chasing-dots">
            <div className={`sk-child sk-dot1 ${bgClass}`}></div>
            <div className={`sk-child sk-dot2 ${bgClass}`}></div>
          </div>
        )
      case "three-bounce":
        return (
          <div className="sk-three-bounce">
            <div className={`sk-child sk-bounce1 ${bgClass}`}></div>
            <div className={`sk-child sk-bounce2 ${bgClass}`}></div>
            <div className={`sk-child sk-bounce3 ${bgClass}`}></div>
          </div>
        )
      case "circle":
        return (
          <div className={`sk-circle ${textClass}`}>
            <div className={`sk-circle1 sk-child`}></div>
            <div className={`sk-circle2 sk-child`}></div>
            <div className={`sk-circle3 sk-child`}></div>
            <div className={`sk-circle4 sk-child`}></div>
            <div className={`sk-circle5 sk-child`}></div>
            <div className={`sk-circle6 sk-child`}></div>
            <div className={`sk-circle7 sk-child`}></div>
            <div className={`sk-circle8 sk-child`}></div>
            <div className={`sk-circle9 sk-child`}></div>
            <div className={`sk-circle10 sk-child`}></div>
            <div className={`sk-circle11 sk-child`}></div>
            <div className={`sk-circle12 sk-child`}> </div>
          </div>
        )
      case "fading-circle":
        return (
          <div className={`sk-fading-circle ${textClass}`}>
            <div className={`sk-circle1 sk-circle `}></div>
            <div className={`sk-circle2 sk-circle`}></div>
            <div className={`sk-circle3 sk-circle`}></div>
            <div className={`sk-circle4 sk-circle`}></div>
            <div className={`sk-circle5 sk-circle`}></div>
            <div className={`sk-circle6 sk-circle`}></div>
            <div className={`sk-circle7 sk-circle`}></div>
            <div className={`sk-circle8 sk-circle`}></div>
            <div className={`sk-circle9 sk-circle`}></div>
            <div className={`sk-circle10 sk-circle`}></div>
            <div className={`sk-circle11 sk-circle`}></div>
            <div className={`sk-circle12 sk-circle`}> </div>
          </div>
        )
      case "folding-cube":
        return (
          <div className={`sk-folding-cube ${textClass}`}>
            <div className={`sk-cube1 sk-cube`}></div>
            <div className={`sk-cube2 sk-cube`}></div>
            <div className={`sk-cube4 sk-cube`}></div>
            <div className={`sk-cube3 sk-cube`}></div>
          </div>
        )
      default:
        return <div className={`sk-rotating-plane ${bgClass}`} />
    }
  }
  return <Preloader />
}
