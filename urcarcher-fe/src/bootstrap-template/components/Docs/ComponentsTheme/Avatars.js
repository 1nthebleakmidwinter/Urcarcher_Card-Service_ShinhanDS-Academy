import React from "react"
import Avatar from "../../Avatar"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { Col, Row } from "react-bootstrap"
export default function Avatars() {
  return (
    <div id="avatar" className="docs-item">
      <h5 className="mb-4">Avatar</h5>
      <div className="docs-desc">
        <p>
          Component to display your user image. You can use props{" "}
          <code className="d-block">.avatar-xxl p-2</code>
          Classes to format your user images. You can combine avatar classes
          with padding utility class to give to the image a nice white border.
        </p>
        <h6 className="text-dark">Supported props for Avatar component:</h6>
        <ul>
          <li>
            <b>className</b> - classes for <code>Avatar</code> element
          </li>
          <li>
            <b>size</b> - avatar size <code>xxl, xl, lg, sm</code>. Leave empty
            for default size.
          </li>
          <li>
            <b>image</b> - image url
          </li>
          <li>
            <b>alt</b> - image alt
          </li>
          <li>
            <b>border</b> - if true, border will be shown around avatar.
          </li>
        </ul>
      </div>
      <Row className="align-items-center text-center mb-3">
        <Col xs="auto">
          <Avatar image="/img/avatar-0.jpg" alt="Image" size="xxl" border />
        </Col>
        <Col xs="auto">
          <Avatar image="/img/avatar-1.jpg" size="xl" border />
        </Col>
        <Col xs="auto">
          <Avatar image="/img/avatar-2.jpg" size="lg" border />
        </Col>
        <Col xs="auto">
          <Avatar image="/img/avatar-3.jpg" border />
        </Col>
        <Col xs="auto">
          <Avatar image="/img/avatar-4.jpg" size="sm" border />
        </Col>
      </Row>
      <SyntaxHighlighter
        language="javascript"
        style={tomorrow}
        className="rounded shadow p-4"
      >
        {highlightAvatarXXL}
      </SyntaxHighlighter>
    </div>
  )
}

const highlightAvatarXXL = `<Avatar
  image="/img/avatar-0.jpg"
  alt="Image"
  className="mb-3"
  size="xxl"
  border
/>`
