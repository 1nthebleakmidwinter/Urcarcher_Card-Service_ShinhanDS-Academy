import React from "react"
import { Col, Container, Row } from "react-bootstrap"

export default function Footer() {
  return (
    <footer className="footer bg-white shadow align-self-end py-3 px-xl-5 w-100">
      <Container fluid>
        <Row>
          <Col md={6} className="text-center text-md-start fw-bold">
            <p className="mb-2 mb-md-0">Your company &copy; 2023</p>
          </Col>
          <Col md={6} className="text-center text-md-end text-gray-400">
            <p className="mb-0">Version 1.3.0</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
