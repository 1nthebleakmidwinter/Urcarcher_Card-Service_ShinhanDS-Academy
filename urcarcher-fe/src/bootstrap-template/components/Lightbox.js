import React from "react"
import Lightbox from "react-image-lightbox"
export default function LightboxComponent({
  data,
  setActiveImage,
  activeImage,
  setLightBoxOpen,
}) {
  const customStyles = {
    overlay: {
      zIndex: "1000",
    },
    bodyOpen: {
      position: "fixed",
    },
  }
  return (
    <Lightbox
      mainSrc={data[activeImage].img}
      nextSrc={data[(activeImage + 1) % data.length].img}
      prevSrc={data[(activeImage + data.length - 1) % data.length].img}
      onCloseRequest={() => setLightBoxOpen(false)}
      imageCaption={data[activeImage].caption.title}
      onMovePrevRequest={() =>
        setActiveImage((activeImage + data.length - 1) % data.length)
      }
      onMoveNextRequest={() => setActiveImage((activeImage + 1) % data.length)}
      enableZoom={false}
      reactModalStyle={customStyles}
    />
  )
}
