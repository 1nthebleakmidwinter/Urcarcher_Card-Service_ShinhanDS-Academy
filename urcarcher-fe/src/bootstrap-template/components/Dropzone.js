import React, { useCallback, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { useDropzone } from "react-dropzone"
import Image from "./CustomImage"
export default function Dropzone({ className }) {
  const [uploadedFiles, setUploadedFiles] = useState(null)
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    const filesArr = [
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]
    setUploadedFiles((prev) =>
      prev?.length > 0 ? [...prev, ...filesArr] : [...filesArr]
    )
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    onDrop,
  })

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${className ? className : ""}`}
      style={{ cursor: "pointer" }}
    >
      <input {...getInputProps()} />

      <div className="dz-message">
        <p>Drop files here or click to upload.</p>
        <p>
          <span className="note">
            (This is just a demo dropzone. Selected files are{" "}
            <strong>not</strong> actually uploaded.)
          </span>
        </p>
      </div>
      <Row className="mt-4">
        {uploadedFiles?.map((file) => (
          <Col xs={6} md={4} lg={3} key={file.name}>
            <div
              style={{ aspectRatio: "1/1" }}
              className="position-relative rounded overflow-hidden shadow mb-4"
            >
              <Image
                src={file.preview}
                className="img-fluid"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}
