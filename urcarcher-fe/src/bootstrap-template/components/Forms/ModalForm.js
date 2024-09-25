import { Formik, Form as FormikForm, Field } from "formik"
import React, { useRef, useState } from "react"
import { Form, Button, Modal } from "react-bootstrap"

export default function ModalForm() {
  const [show, setShow] = useState(false)
  const toggleModal = () => setShow(!show)
  const submitButtonRef = useRef(false)
  return (
    <React.Fragment>
      <Button variant="primary" onClick={toggleModal}>
        Form in a simple modal
      </Button>
      <Modal show={show} onHide={toggleModal}>
        <Modal.Header className="border-0 bg-gray-100" closeButton>
          <Modal.Title as="h5" className="text-uppercase">
            Signin Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
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
              <div className="mb-3">
                <Form.Label className="text-uppercase" htmlFor="email">
                  Email
                </Form.Label>
                <Field
                  id="email3"
                  name="email3"
                  type="email"
                  placeholder="Email Address"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <Form.Label className="text-uppercase" htmlFor="email">
                  Password
                </Form.Label>
                <Field
                  id="password4"
                  name="password4"
                  type="password"
                  placeholder="Password"
                  className="form-control"
                />
              </div>
              <Button
                variant="primary"
                className="d-none"
                type="submit"
                ref={submitButtonRef}
              >
                Save Changes
              </Button>
            </FormikForm>
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => submitButtonRef.current.click()}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}
