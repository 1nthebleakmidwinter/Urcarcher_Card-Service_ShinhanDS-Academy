import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import useWindowSize from "../hooks/useWindowSize"

let MapLeaflet
const Map = (props) => {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [tap, setTap] = useState(false)
  const size = useWindowSize()

  useEffect(() => {
    MapLeaflet = dynamic(() => import("./MapLeaflet"), {
      ssr: false,
    })
    setMapLoaded(true)
  }, [])

  useEffect(() => {
    if (mapLoaded) {
      setTap(size.width > 700)
      setDragging(size.width > 700)
    }
  }, [size, mapLoaded])
  return mapLoaded ? (
    <MapLeaflet dragging={dragging} tap={tap} {...props} style={props.style} />
  ) : (
    <p>loading</p>
  )
}

export default Map
