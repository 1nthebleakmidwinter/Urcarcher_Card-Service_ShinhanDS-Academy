import React, { useState } from "react"
import Head from "next/head"
import NextNprogress from "nextjs-progressbar"
import Header from "./Header"
import SvgIcons from "./SvgIcons"
import Sidebar from "./Sidebar"
import Footer from "./Footer"
const Layout = (pageProps) => {
  const [sidebarShrink, setSidebarShrink] = useState(false)
  return (
    <div className={pageProps.className}>
      <Head>
        <title>
          {`${pageProps.title} - Boootstrap 5 Admin React template by
          Bootstrapious.com`}
        </title>
      </Head>
      <NextNprogress color="#4E66F8" options={{ showSpinner: false }} />
      {!pageProps.hideHeader && (
        <Header
          setSidebarShrink={setSidebarShrink}
          sidebarShrink={sidebarShrink}
        />
      )}

      <div className="d-flex align-items-stretch">
        {!pageProps.hideSidebar && <Sidebar sidebarShrink={sidebarShrink} />}
        <div
          className={`page-holder ${
            pageProps.pageHolderClass
              ? pageProps.pageHolderClass
              : "bg-gray-100"
          }`}
        >
          {pageProps.children}
          {!pageProps.hideFooter && <Footer />}
        </div>
      </div>
      <SvgIcons />
    </div>
  )
}

export default Layout
