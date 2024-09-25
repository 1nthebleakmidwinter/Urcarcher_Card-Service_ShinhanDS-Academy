import { Formik, Form as FormikForm, Field } from "formik"
import React from "react"
import { Form, Button } from "react-bootstrap"

export default function InputsFloatingLabels() {
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
        <div className="form-floating mb-3">
          <Field
            id="floatingInput"
            name="floatingInput"
            type="email"
            placeholder="name@example.com"
            className="form-control"
          />
          <Form.Label className="text-uppercase" htmlFor="floatingInput">
            Email
          </Form.Label>
        </div>
        <div className="form-floating mb-3">
          <Field
            id="floatingPassword"
            name="floatingPassword"
            type="password"
            placeholder="Password"
            className="form-control"
          />
          <Form.Label className="text-uppercase" htmlFor="floatingPassword">
            Password
          </Form.Label>
        </div>
        <Button variant="outline-primary" type="submit">
          Submit
        </Button>
      </FormikForm>
    </Formik>
  )
}
