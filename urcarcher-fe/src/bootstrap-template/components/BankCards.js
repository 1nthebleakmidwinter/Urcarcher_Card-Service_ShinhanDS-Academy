import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCcVisa,
  faCcMastercard,
  faCcDiscover,
} from "@fortawesome/free-brands-svg-icons"
import React from "react"
import { Card, Col, Row } from "react-bootstrap"

export default function BankCards({ data }) {
  return (
    <section className="mb-4 mb-lg-5">
      <h2 className="section-heading section-heading-ms mb-4 mb-lg-5">
        {data.name}
      </h2>
      <Row className="text-dark">
        {data.items.map((card, index) => {
          let gradient
          switch (index) {
            case 1:
              gradient = "blue"
              break
            case 2:
              gradient = "green"
              break
            default:
              gradient = "indigo"
          }
          return (
            <Col md={6} xl={4} className="mb-4" key={index}>
              <Card className={`credit-card bg-hover-gradient-${gradient}`}>
                <div className="credict-card-content">
                  <div className="h1 mb-3 mb-lg-1">
                    {card.type === "visa" && (
                      <FontAwesomeIcon icon={faCcVisa} />
                    )}
                    {card.type === "mastercard" && (
                      <FontAwesomeIcon icon={faCcMastercard} />
                    )}
                    {card.type === "discover" && (
                      <FontAwesomeIcon icon={faCcDiscover} />
                    )}
                  </div>
                  <div className="credict-card-bottom">
                    <div className="text-uppercase flex-shrink-0 me-1 mb-1">
                      <div className="fw-bold">Card Number</div>
                      <small className="text-gray-500">{card.number}</small>
                    </div>
                    <h4 className="mb-1">${card.content}</h4>
                  </div>
                </div>
                <a className="stretched-link" href={card.link} />
              </Card>
            </Col>
          )
        })}
      </Row>
    </section>
  )
}
