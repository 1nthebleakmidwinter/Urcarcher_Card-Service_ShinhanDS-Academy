import React from "react"
import { Card, Button, ListGroup, Nav } from "react-bootstrap"

export default function CardMain({
  className,
  img,
  imgBottom,
  title,
  titleTag,
  subtitle,
  text,
  textMuted,
  button,
  content,
  list,
  links,
  titleTop,
  header,
  headerClass,
  footer,
  nav,
}) {
  const TitleBlock = () => {
    return (
      <React.Fragment>
        {title && <Card.Title as={titleTag}>{title}</Card.Title>}
        {subtitle && (
          <Card.Subtitle className="text-muted">{subtitle}</Card.Subtitle>
        )}
      </React.Fragment>
    )
  }

  return (
    <Card className={className ? className : ""}>
      {header && (
        <Card.Header className={headerClass ? headerClass : ""}>
          <div className="card-heading">{header}</div>
        </Card.Header>
      )}
      {nav && (
        <Card.Header className={headerClass ? headerClass : ""}>
          <Nav variant={nav.variant}>
            {nav.items.map((item, index) => (
              <Nav.Item key={item.name} key={index}>
                <Nav.Link
                  href={item.link}
                  active={item.active}
                  disabled={item.disabled}
                >
                  {item.name}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Card.Header>
      )}
      {titleTop && (title || subtitle) && (
        <Card.Body>
          <TitleBlock />
        </Card.Body>
      )}
      {!imgBottom && img && (
        <Card.Img
          src={img}
          alt="Card image cap"
          variant="top"
          className={titleTop ? "rounded-0" : ""}
        />
      )}

      <Card.Body>
        {!titleTop && (title || subtitle) && <TitleBlock />}
        {content}
        <Card.Text>{text}</Card.Text>
        {textMuted && (
          <Card.Text>
            <small className="text-muted">{textMuted}</small>
          </Card.Text>
        )}
        {button && (
          <Button
            variant={button.variant ? button.variant : "primary"}
            href={button.link}
          >
            {button.label}
          </Button>
        )}
      </Card.Body>
      {imgBottom && img && (
        <Card.Img src={img} alt="Card image cap" variant="bottom" />
      )}
      {list && (
        <ListGroup variant="flush">
          {list.map((item, index) => (
            <ListGroup.Item key={index} className="text-muted">
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      {links && (
        <Card.Body>
          {links.map((link, index) => (
            <Card.Link href={link.link} key={index}>
              {link.name}
            </Card.Link>
          ))}
        </Card.Body>
      )}
      {footer && <Card.Footer className="text-muted">{footer}</Card.Footer>}
    </Card>
  )
}
