import React, { useState } from "react"
import { Button, Collapse } from "react-bootstrap"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"
export default function ExampleCode({ highlightCode, bottomMargin }) {
  const [showExample, setShowExample] = useState(false)
  return (
    <div className={bottomMargin ? "mb-3" : ""}>
      <Button
        onClick={() => setShowExample(!showExample)}
        aria-expanded={showExample}
        variant="link"
        className="p-0"
      >
        Show code example
      </Button>
      <Collapse in={showExample}>
        <div className="py-3">
          <SyntaxHighlighter
            language="javascript"
            style={tomorrow}
            className="rounded shadow p-4"
          >
            {highlightCode}
          </SyntaxHighlighter>
        </div>
      </Collapse>
    </div>
  )
}
