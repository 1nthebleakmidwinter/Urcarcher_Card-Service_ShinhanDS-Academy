import React from "react"
import { Card } from "react-bootstrap"
import {
  faDropbox,
  faApple,
  faAndroid,
} from "@fortawesome/free-brands-svg-icons"
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default function Transactions({ data }) {
  return (
    <Card className="mb-5 mb-lg-0">
      <Card.Header>
        <div className="card-heading">{data.name}</div>
      </Card.Header>
      <Card.Body>
        <p className="text-gray-500 mb-5">{data.subtitle}</p>
        {data.items.map((transaction, index) => {
          let color
          let icon

          switch (transaction.type) {
            case "appstore":
              color = "green"
              icon = faApple
              break
            case "shopping":
              color = "blue"
              icon = faShoppingBasket
              break
            case "playstore":
              color = "red"
              icon = faAndroid
              break
            default:
              color = "indigo"
              icon = faDropbox
          }
          return (
            <div
              className="d-flex justify-content-between align-items-start align-items-sm-center mb-4 flex-column flex-sm-row"
              key={index}
            >
              <div className="left d-flex align-items-center">
                <div className="icon icon-lg shadow me-3 text-gray-700">
                  <FontAwesomeIcon icon={icon} />
                </div>
                <div className="text">
                  <h6 className="mb-0 d-flex align-items-center">
                    <span>{transaction.name}</span>
                    <span className={`dot dot-sm ms-2 bg-${color}`}></span>
                  </h6>
                  <small className="text-gray-500">{transaction.content}</small>
                </div>
              </div>
              <div className={`right ms-5 ms-sm-0 ps-3 ps-sm-0 text-${color}`}>
                <h5>{transaction.price}</h5>
              </div>
            </div>
          )
        })}
      </Card.Body>
    </Card>
  )
}
