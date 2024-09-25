import React from "react";
import { Card } from "react-bootstrap";

function CardOverlay({ className, img, title, text, textMuted, style={}, titleSize, imgStyle }) {
  return (
    <Card className={`${className ? className : ""}`}>
      <Card.Img 
        src={img} 
        alt="Card image"
        style={imgStyle}
      />
      <Card.ImgOverlay className="d-flex flex-column justify-content-end p-0">
        <div style={style}>
          <Card.Title className="fw-bold" style={{fontSize:style.fontSize || '1rem'}}>{title}</Card.Title>
          <Card.Text className="mb-1">{text}</Card.Text>
          <Card.Text className="text-muted">
            <small>{textMuted}</small>
          </Card.Text>
        </div>
      </Card.ImgOverlay>
    </Card>
  );
}

// React.memo를 이용해 메모이제이션 적용
export default React.memo(CardOverlay);
