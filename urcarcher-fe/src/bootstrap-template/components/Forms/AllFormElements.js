import { Formik, Form as FormikForm, Field } from "formik"
import React from "react"
import { Form, Button, Row, Col, InputGroup, Dropdown } from "react-bootstrap"

export default function AllFormElements() {
  return (
    <Formik
      initialValues={
        {
          // initialValues
        }
      }
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500))
        alert(JSON.stringify(values, null, 2))
      }}
    >
      <FormikForm>
        <Row>
          <Col md={3}>
            <Form.Label htmlFor="normal">Normal</Form.Label>
          </Col>
          <Col md={9}>
            <Field
              id="normal"
              name="normal"
              type="text"
              className="form-control"
            />
          </Col>
        </Row>
        <hr className="bg-gray-400 my-4" />
        <Row>
          <Col md={3}>
            <Form.Label htmlFor="help-text">Help text</Form.Label>
          </Col>
          <Col md={9}>
            <Field
              id="help-text"
              name="help-text"
              type="text"
              className="form-control"
            />
            <Form.Text className="text-muted">
              A block of help text that breaks onto a new line and may extend
              beyond one line.
            </Form.Text>
          </Col>
        </Row>
        <hr className="bg-gray-400 my-4" />
        <Row>
          <Col md={3}>
            <Form.Label htmlFor="passwordExample">Password</Form.Label>
          </Col>
          <Col md={9}>
            <Field
              id="passwordExample"
              name="passwordExample"
              type="text"
              className="form-control"
            />
          </Col>
        </Row>
        <hr className="bg-gray-400 my-4" />
        <Row>
          <Col md={3}>
            <Form.Label htmlFor="placeholder">Placeholder</Form.Label>
          </Col>
          <Col md={9}>
            <Field
              id="placeholder"
              name="placeholder"
              type="text"
              placeholder="Placeholder"
              className="form-control"
            />
          </Col>
        </Row>
        <hr className="bg-gray-400 my-4" />
        <Row>
          <Col md={3}>
            <Form.Label>Ranges</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Label htmlFor="ranges">Example range</Form.Label>
            <input
              id="ranges"
              name="ranges"
              type="range"
              className="form-range"
            />
          </Col>
        </Row>
        <hr className="bg-gray-400 my-4" />
        <Row>
          <Col md={3}>
            <Form.Label htmlFor="disabled">Disabled</Form.Label>
          </Col>
          <Col md={9}>
            <Field
              id="disabled"
              name="disabled"
              type="text"
              placeholder="Disabled input here..."
              className="form-control"
              disabled
            />
          </Col>
        </Row>
        <hr className="bg-gray-400 my-4" />
        <Row>
          <Col md={3}>
            <Form.Label>
              Checkboxes & radios
              <br />
              <small className="text-primary">
                Bootstrap 5 custom controls
              </small>
            </Form.Label>
          </Col>
          <Col md={9}>
            <Field
              render={({ field }) => (
                <Form.Check
                  {...field}
                  label="Check this custom checkbox"
                  type="checkbox"
                  id="customCheck1"
                  className="mb-4"
                />
              )}
            />
            <Field
              render={({ field }) => (
                <Form.Check
                  {...field}
                  name="customRadioInline1"
                  label="Toggle this custom radio"
                  type="radio"
                  id="customRadio1"
                />
              )}
            />
            <Field
              render={({ field }) => (
                <Form.Check
                  {...field}
                  name="customRadioInline1"
                  label="Or toggle this other custom radio"
                  type="radio"
                  id="customRadio2"
                />
              )}
            />
          </Col>
        </Row>
        <hr className="bg-gray-400 my-4" />
        <Row>
          <Col md={3}>
            <Form.Label>Select</Form.Label>
          </Col>
          <Col md={9} className="mb-3">
            <Field name="account" as="select" className="form-select">
              <option>option 1</option>
              <option>option 2</option>
              <option>option 3</option>
              <option>option 4</option>
            </Field>
          </Col>
          <Col md={9} className="ms-auto">
            <Field
              name="account2"
              as="select"
              className="form-control rounded"
              multiple
            >
              <option>option 1</option>
              <option>option 2</option>
              <option>option 3</option>
              <option>option 4</option>
            </Field>
          </Col>
        </Row>
        <hr className="bg-gray-400 my-4" />
        <Row>
          <Col sm={3}>
            <Form.Label>Input with success</Form.Label>
          </Col>
          <Col sm={9}>
            <Field
              id="success"
              name="success"
              type="text"
              className="form-control is-valid"
            />
          </Col>
        </Row>
        <hr className="bg-gray-400 my-4" />
        <Row>
          <Col sm={3}>
            <Form.Label>Input with error</Form.Label>
          </Col>
          <Col sm={9}>
            <Field
              id="error"
              name="error"
              type="text"
              className="form-control is-invalid"
            />
            <div className="invalid-feedback">Please provide your name.</div>
          </Col>
        </Row>
        <hr className="bg-gray-400 my-4" />
        <Row>
          <Col md={3}>
            <Form.Label>Control sizing</Form.Label>
          </Col>
          <Col md={9}>
            <div className="mb-3">
              <Field
                id="lg"
                name="lg"
                type="text"
                placeholder=".input-lg"
                className="form-control form-control-lg"
              />
            </div>
            <div className="mb-3">
              <Field
                id="default"
                name="default"
                type="text"
                placeholder="Default input"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <Field
                id="sm"
                name="sm"
                type="text"
                placeholder=".input-sm"
                className="form-control form-control-sm"
              />
            </div>
          </Col>
        </Row>
        <hr className="bg-gray-400 my-4" />
        <Row>
          <Col sm={3}>
            <Form.Label>Column sizing</Form.Label>
          </Col>
          <Col sm={9}>
            <Row>
              <Col md={3}>
                <Field
                  id="md-3"
                  name="md"
                  type="text"
                  placeholder=".col-md-3"
                  className="form-control"
                />
              </Col>
              <Col md={4}>
                <Field
                  id="md-4"
                  name="md"
                  type="text"
                  placeholder=".col-md-4"
                  className="form-control"
                />
              </Col>
              <Col md={5}>
                <Field
                  id="md-5"
                  name="md"
                  type="text"
                  placeholder=".col-md-5"
                  className="form-control"
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <hr className="bg-gray-400 my-4" />
        <Row>
          <Col md={3}>
            <Form.Label>Input groups</Form.Label>
          </Col>
          <Col md={9}>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Field
                name="inputGroupText"
                type="text"
                className="form-control"
                aria-label="Dollar amount (with dot and two decimal places)"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Field
                name="inputGroupText2"
                type="text"
                className="form-control"
                aria-label="Dollar amount (with dot and two decimal places)"
              />
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Field
                name="inputGroupText3"
                type="text"
                className="form-control"
                aria-label="Amount (to the nearest dollar)"
              />
              <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <input
                  type="checkbox"
                  className="form-check-input mt-0"
                  aria-label="Checkbox for following text input"
                />
              </InputGroup.Text>
              <Field
                name="inputGroupText"
                type="text"
                className="form-control"
                aria-label="Text input with checkbox"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <input
                  type="radio"
                  className="form-check-input mt-0"
                  aria-label="Radio button for following text input"
                />
              </InputGroup.Text>
              <Field
                name="inputGroupText"
                type="text"
                className="form-control"
                aria-label="Text input with radio button"
              />
            </InputGroup>
          </Col>
        </Row>
        <hr className="bg-gray-400 my-4" />
        <Row>
          <Col md={3}>
            <Form.Label>Button addons</Form.Label>
          </Col>
          <Col md={9}>
            <InputGroup className="mb-3">
              <Button
                variant="outline-primary"
                id="button-addon1"
                type="button"
              >
                Button
              </Button>
              <Field
                name="inputGroupText"
                type="text"
                className="form-control"
                aria-label="Example text with button addon"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Field
                name="inputGroupText"
                type="text"
                className="form-control"
                aria-label="Recipient's username"
              />
              <Button variant="outline-info" id="button-addon2" type="button">
                Button
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <hr className="bg-gray-400 my-4" />
        <Row>
          <Col md={3}>
            <Form.Label>With dropdowns</Form.Label>
          </Col>
          <Col md={9}>
            <InputGroup className="mb-3">
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  Dropdown
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">Action</Dropdown.Item>
                  <Dropdown.Item href="#">Another action</Dropdown.Item>
                  <Dropdown.Item href="#">Something else</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#">Separated link</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Field
                name="inputGroupText"
                type="text"
                className="form-control"
                aria-label="Text input with dropdown button"
              />
            </InputGroup>
          </Col>
        </Row>
        <hr className="bg-gray-400 my-4" />
        <Row>
          <Col md={9} className="ms-auto">
            <Button variant="secondary" type="submit" className="me-1">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save changes
            </Button>
          </Col>
        </Row>
      </FormikForm>
    </Formik>
  )
}
