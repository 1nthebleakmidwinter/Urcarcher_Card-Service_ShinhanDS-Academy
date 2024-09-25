import { Formik, Form as FormikForm, Field } from "formik"
import React from "react"
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap"

export default function InlineForm() {
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500))
        alert(JSON.stringify(values, null, 2))
      }}
    >
      <FormikForm>
        <Row lg={{ cols: "auto" }} className="g-3 align-items-center">
          <Col xs={12}>
            <Field
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              className="form-control"
            />
            <Form.Label className="visually-hidden" htmlFor="username">
              Username
            </Form.Label>
          </Col>
          <Col xs={12}>
            <InputGroup>
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="form-control"
              />
            </InputGroup>
          </Col>
          <Col xs={12}>
            <Field
              name="inlineFormCheck"
              type="checkbox"
              placeholder="Email"
              render={({ field }) => (
                <Form.Check
                  {...field}
                  label="Remember me"
                  id="inlineFormCheck"
                />
              )}
            />
          </Col>
          <Col xs={12}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </FormikForm>
    </Formik>
  )
}
