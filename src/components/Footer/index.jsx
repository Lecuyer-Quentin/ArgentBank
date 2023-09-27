import React from 'react'

const Footer = () => {

    const date = new Date().getFullYear().toString()
    const copyrigth = `© Copyright ${date} Argent Bank`
  return (
      <footer>
          <p>{copyrigth}</p>
      </footer>
  )
}

export default Footer