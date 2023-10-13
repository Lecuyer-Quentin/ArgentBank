import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

/**
 * Renders the layout of the ArgentBank website.
 * @returns {JSX.Element} The layout component.
 */
const Layout = () => {
  return (
      <>
          <Header />
          <main className='App'>
              <Outlet />
          </main>
          <Footer />
      </>
  )
}

export default Layout
