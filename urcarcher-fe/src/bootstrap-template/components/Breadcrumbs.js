import React from "react"
import Link from "next/link"
import { Breadcrumb } from "react-bootstrap"
export default function Breadcrumbs({ pages, title }) {
  return (
    <div className="page-breadcrumb">
      <Breadcrumb>
        <Link href="/" passHref>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Link>
        {pages &&
          pages.map((page) => (
            <Link href={page.link} passHref key={page.link}>
              <Breadcrumb.Item>{page.name}</Breadcrumb.Item>
            </Link>
          ))}
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}
