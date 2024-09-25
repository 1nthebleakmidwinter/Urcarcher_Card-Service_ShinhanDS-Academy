import React from "react"
import Avatar from "../components/Avatar"
export default function SupportBlock() {
  return (
    <React.Fragment>
      <h4 className="subtitle text-primary mb-4">
        Get Support From Real People
      </h4>
      <p className="text-muted mb-5">
        Samsa was a travelling salesman - and above it there hung a picture that
        he had recently cut out of an illustrated magazine and housed in a nice,
        gilded frame.
      </p>
      <ul className="list-unstyled d-flex flex-wrap justify-content-center">
        <li>
          <a href="#">
            <Avatar
              image="/img/avatar-1.jpg"
              alt=""
              size="lg"
              border
              className="hover-animate mx-2"
            />
            <Avatar
              image="/img/avatar-2.jpg"
              alt=""
              size="lg"
              border
              className="hover-animate mx-2"
            />
            <Avatar
              image="/img/avatar-3.jpg"
              alt=""
              size="lg"
              border
              className="hover-animate mx-2"
            />
            <Avatar
              image="/img/avatar-4.jpg"
              alt=""
              size="lg"
              border
              className="hover-animate mx-2"
            />
            <Avatar
              image="/img/avatar-5.jpg"
              alt=""
              size="lg"
              border
              className="hover-animate mx-2"
            />
          </a>
        </li>
      </ul>
    </React.Fragment>
  )
}
