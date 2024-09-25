import {
  faFacebook,
  faFacebookSquare,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Card, Table, Button } from "react-bootstrap"
import CardHeaderMore from "../CardHeaderMore"
export default function Updates({ data }) {
  return (
    <Card className="card-table h-100">
      <Card.Header>
        <h5 className="card-heading">Feed</h5>
        <CardHeaderMore />
      </Card.Header>
      <Card.Body className="py-3">
        <Table borderless hover className="mb-0">
          <tbody className="align-middle">
            {data.map((item, index) => {
              let icon
              let color
              let textColor
              switch (item.type) {
                case "twitter":
                  icon = faTwitter
                  color = "indigo-light"
                  textColor = "indigo"
                  break
                case "upload":
                  icon = faUpload
                  color = "gray-200"
                  textColor = "gray-700"
                  break
                case "facebook":
                  icon = faFacebookSquare
                  color = "blue-light"
                  textColor = "blue"
                  break
                default:
                  icon = faEnvelope
                  color = "green-light"
                  textColor = "green"
              }
              return (
                <tr key={index}>
                  <td className="position-relative">
                    <div
                      className={`icon icon-sm float-start me-2 bg-${color} text-${textColor}`}
                    >
                      <FontAwesomeIcon icon={icon} />
                    </div>
                    <strong className="d-inline-block mt-1 text-gray-700">
                      {item.content}
                    </strong>
                    <a className="stretched-link" href="#!"></a>
                  </td>
                  <td className="position-relative">
                    <span className="text-muted text-sm float-end">
                      {item.date}
                    </span>
                    <a className="stretched-link" href="#!"></a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer className="d-grid p-0 overflow-hidden">
        <Button className="py-3 text-uppercase rounded-0" href="#!">
          See All Updates
        </Button>
      </Card.Footer>
    </Card>
  )
}
