import { Formik, Form as FormikForm, Field } from "formik"
import React from "react"
import { Form, Button, Row, Col } from "react-bootstrap"

export default function HorizontalForm() {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500))
        alert(JSON.stringify(values, null, 2))
      }}
    >
      <FormikForm>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Label className="text-uppercase" htmlFor="email">
              Email
            </Form.Label>
          </Col>
          <Col md={9}>
            <Field
              id="email2"
              name="email2"
              type="email"
              placeholder="Email Address"
              className="form-control"
            />
            <Form.Text className="text-muted ms-3">
              Example help text that remains unchanged.
            </Form.Text>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Label className="text-uppercase" htmlFor="password">
              Password
            </Form.Label>
          </Col>
          <Col md={9}>
            <Field
              id="password2"
              name="password2"
              type="password"
              placeholder="Password"
              className="form-control"
            />
            <Form.Text className="text-muted ms-3">
              Example help text that remains unchanged.
            </Form.Text>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={9} className="ms-auto">
            <Button variant="primary" type="submit">
              Sign in
            </Button>
          </Col>
        </Row>
      </FormikForm>
    </Formik>
  )
}
