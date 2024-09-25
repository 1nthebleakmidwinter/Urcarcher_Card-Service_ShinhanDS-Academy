import React from "react"
import dynamic from "next/dynamic"
import "@toast-ui/calendar/dist/toastui-calendar.min.css"
import "tui-date-picker/dist/tui-date-picker.css"
import "tui-time-picker/dist/tui-time-picker.css"

export default function index(props) {
  const Calendar = dynamic(() => import("@toast-ui/react-calendar"), {
    ssr: false,
  })
  return <Calendar {...props} />
}
