import React, { useEffect, useRef, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.bubble.css"
import "quill/dist/quill.snow.css"
export default function QuillComponent({ text, withEditor, className }) {
  const editorContainerRef = useRef(false)
  const [loaded, setLoaded] = useState(false)
  const [content, setContent] = useState(false)
  var toolbarOptions = [
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    ["bold", "italic", "underline", "strike"], // toggled buttons

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ header: 1 }, { header: 2 }], // custom button values
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],

    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ align: [] }],
    ["link", "image"],
    ["clean"], // remove formatting button
  ]
  useEffect(() => {
    if (!loaded) {
      const quillFunc = new Quill(editorContainerRef.current, {
        modules: {
          toolbar: withEditor && toolbarOptions,
        },
        placeholder: "Compose an epic...",
        theme: withEditor ? "snow" : "bubble", // Specify theme in configuration
      })
      quillFunc.root.style.maxHeight = "1000px"
      quillFunc.root.style.minHeight = "300px"
      quillFunc.on("text-change", function (delta, oldDelta, source) {
        // Use this if you need Delta object
        // setContent(quillFunc.getContents())

        setContent(quillFunc.root.innerHTML)
      })
      setLoaded(true)
    }
  }, [withEditor])

  // Here you can read content of editor as HTML
  console.log(content)
  return (
    <div>
      <div
        className={`bg-white ${className ? className : ""}`}
        ref={editorContainerRef}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  )
}
