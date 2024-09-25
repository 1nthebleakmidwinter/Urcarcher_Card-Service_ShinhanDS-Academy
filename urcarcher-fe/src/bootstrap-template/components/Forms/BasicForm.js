import Axios from "axios"
import { Formik, Form as FormikForm, Field } from "formik"
import React, { useState } from "react"
import { Form, Button, Modal } from "react-bootstrap"

export default function BasicForm(props) {
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  const [modalMessage, setModalMessage] = useState(''); // 모달 메시지 상태 추가

  const handleShowModalWithTimeout = (message) => {
    setModalMessage(message);
    setShowModal(true); // 모달을 열기
    setTimeout(() => {
      setShowModal(false); // 2초 후 모달 닫기
    }, 2000); // 2초 동안 모달 유지
  };

  return (
    <>
      <Formik
        initialValues={{
          text: "",
          password: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500))

          console.log(values.password);
          if (values.password) {
            // 카드 삭제 및 비활성화
            if (props.cardId[0] === 'deleteCard') {
              Axios.post(`api/card/deletecard`, {
                cardId: String(props.cardId[1]),
                password: String(values.password)
              })
              .then((response) => {
                handleShowModalWithTimeout('카드가 삭제되었습니다.');
              })
              .catch((error) => {
                handleShowModalWithTimeout('카드 삭제가 실패하였습니다.');
              })
            }
          } else {
            handleShowModalWithTimeout('PIN번호를 입력해주세요.');
          }

          // 모달 작업이 완료되기 전에 props.setShowModal(false) 호출을 제거합니다.
        }}
      >
        <FormikForm>
          <div className="mb-3">
            <Form.Label className="text-uppercase" htmlFor="text">
              {props.textContent}
            </Form.Label>
            <Field
              id="text"
              name="text"
              type="text"
              placeholder="Reason"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <Form.Label className="text-uppercase" htmlFor="password">
              {props.passwordContent}
            </Form.Label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="form-control"
              maxLength="4"
            />
          </div>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              {props.buttonContent}
            </Button>
          </div>
        </FormikForm>
      </Formik>

      {/* 모달 컴포넌트 */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>알림</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
