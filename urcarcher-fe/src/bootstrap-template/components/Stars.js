import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

const Stars = (props) => {
  const starsArray = []
  for (let i = 1; i <= 5; i++) {
    i <= props.stars
      ? starsArray.push(
          <a href="#!" key={i}>
            <FontAwesomeIcon icon={faStar} className="text-warning" />
          </a>
        )
      : starsArray.push(
          <a href="#!" key={i}>
            <FontAwesomeIcon icon={faStar} className="text-gray-500" />
          </a>
        )
  }
  return starsArray
}

export default Stars
