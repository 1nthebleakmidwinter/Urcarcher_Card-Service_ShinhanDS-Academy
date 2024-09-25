import React, { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import L, { latLngBounds } from "leaflet"
import "leaflet/dist/leaflet.css"

export default function MapLeaflet(props) {
  const tileLayer = {
    tiles: {
      basic:
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    },

    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
  }
  const [hover, setHover] = useState(false)
  const icon = L.icon({
    iconUrl: "/img/map-marker-default.svg",
    shadowUrl: "",
    iconRetinaUrl: "/img/map-marker-default.svg",
    iconSize: [50, 50],
    popupAnchor: [0, -18],
    tooltipAnchor: [0, 19],
  })

  const highlightIcon = L.icon({
    iconUrl: "/img/map-marker-hover.svg",
    shadowUrl: "",
    iconRetinaUrl: "/img/map-marker-hover.svg",
    iconSize: [50, 50],
    popupAnchor: [0, -18],
    tooltipAnchor: [0, 19],
  })
  const [bounded, setBounded] = useState(false)
  const SetBounds = () => {
    const map = useMap()
    const data = props.geoJSON.features
    let markerBounds = latLngBounds([])

    useEffect(() => {
      data.forEach((item) => {
        markerBounds.extend([
          item.geometry.coordinates[1],
          item.geometry.coordinates[0],
        ])
      })
      !bounded && markerBounds.isValid() && map.fitBounds(markerBounds) // <===== Error: Bounds are not valid.
      setBounded(true)
    }, [bounded])

    return null
  }
  return (
    <MapContainer
      zoom={props.zoom}
      className={props.className}
      center={props.center}
      tap={props.tap}
      style={props.style}
    >
      <TileLayer
        url={props.light ? tileLayer.tiles.light : tileLayer.tiles.basic}
        attribution={tileLayer.attribution}
      />
      {!props.geoJSON && (
        <Marker
          position={props.center}
          eventHandlers={{
            mouseover: () => {
              setHover(true)
            },
            mouseout: () => {
              setHover(false)
            },
          }}
          icon={hover ? highlightIcon : icon}
        >
          <Popup className="map-custom-popup" minWidth="400">
            <div className="p-4">
              <h5>Info Window Content</h5>
              <p className="mb-0">
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Vestibulum tortor quam,
                feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu
                libero sit amet quam egestas semper. Aenean ultricies mi vitae
                est. Mauris placerat eleifend leo.
              </p>
            </div>
          </Popup>
        </Marker>
      )}
      {props.geoJSON &&
        props.geoJSON.features &&
        props.geoJSON.features.map((feature) => {
          const data = feature.properties
          return (
            <Marker
              key={data.id}
              position={[
                feature.geometry.coordinates[1],
                feature.geometry.coordinates[0],
              ]}
              eventHandlers={{
                mouseover: () => {
                  setHover(data.id)
                },
                mouseout: () => {
                  setHover(false)
                },
              }}
              icon={hover === data.id ? highlightIcon : icon}
            >
              <Popup className="map-custom-popup" maxWidth="600" minWidth="200">
                <div className="popup-venue">
                  {data.image ? (
                    <div
                      className={`image d-none d-md-block`}
                      style={{
                        backgroundImage: `url(/img/photos/${data.image})`,
                      }}
                    />
                  ) : (
                    <div className="image" />
                  )}
                  <div className="text">
                    {data.name && (
                      <h6>
                        <a href={data.link}>{data.name}</a>
                      </h6>
                    )}
                    {data.about && <p>{data.about}</p>}
                    {data.address && (
                      <p className="text-muted mb-1">{data.address}</p>
                    )}
                    {data.email && (
                      <p className="text-muted mb-1">
                        <i className="fas fa-envelope-open fa-fw text-dark mr-2" />
                        <a href={`mailto:${data.email}`}>{data.email}</a>
                      </p>
                    )}
                    {data.phone && (
                      <p className="text-muted mb-1">
                        <i className="fa fa-phone fa-fw text-dark mr-2" />
                        {data.phone}
                      </p>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      {props.geoJSON && <SetBounds />}
    </MapContainer>
  )
}
