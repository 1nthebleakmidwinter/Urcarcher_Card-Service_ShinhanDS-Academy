import {
  faAddressBook as farAddressBook,
  faAddressCard as farAddressCard,
  faArrowAltCircleDown as farArrowAltCircleDown,
} from "@fortawesome/free-regular-svg-icons"
import {
  faAddressBook,
  faAddressCard,
  faAdjust,
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faAllergies,
  faAmbulance,
  faAmericanSignLanguageInterpreting,
  faAnchor,
  faAngleDoubleDown,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleDoubleUp,
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faArchive,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"
export default function IconsFontAwesome() {
  return (
    <div id="icons-bubbly" className="docs-item">
      <h5 className="mb-4">Icons - Font Awesome</h5>
      <div className="docs-desc">
        <p className="lead">
          Vector icons and social logos on your website with Font Awesome, the
          web’s most popular icon set and toolkit.
        </p>
        <p className="text-muted text-large">
          These icons are mostly used in buttons or for social network links.
          For a complete icon reference, see{" "}
          <a href="https://fontawesome.com/icons?d=gallery">here</a>.
        </p>
        <SyntaxHighlighter
          language="javascript"
          style={tomorrow}
          className="rounded shadow p-4"
        >
          {highlightCode}
        </SyntaxHighlighter>
      </div>
      <div className="mt-5">
        <ul className="list-unstyled">
          {icons.map((item, index) => (
            <li className="list-inline-item h5 mr-3" key={index}>
              <FontAwesomeIcon icon={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const highlightCode = `import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'

export default function IconsFontAwesome() {
    return (
        <FontAwesomeIcon icon={faAddressBook} />
    )
}
`
const icons = [
  faAddressBook,
  farAddressBook,
  faAddressCard,
  farAddressCard,
  faAdjust,
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faAllergies,
  faAmbulance,
  faAmericanSignLanguageInterpreting,
  faAnchor,
  faAngleDoubleDown,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleDoubleUp,
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faArchive,
  faArrowAltCircleDown,
  farArrowAltCircleDown,
]
