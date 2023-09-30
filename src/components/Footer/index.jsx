import React from 'react'

/**
 * Renders the footer component with the current year and the Argent Bank copyright notice.
 * @returns {JSX.Element} The footer component.
 */
const Footer = () => {

    const date = new Date().getFullYear().toString()
    const copyrigth = `© ${date} Argent Bank`
  return (
      <footer>
          <p>{copyrigth}</p>
      </footer>
  )
}

export default Footer