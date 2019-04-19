import React from "react"
import { Link } from "gatsby"
import Hero from './hero';
import { createGlobalStyle } from 'styled-components';

import { rhythm, scale } from "../utils/typography"
import Bio from "./bio";

const GlobalStyle = createGlobalStyle`
  html {
    overflow: hidden;
}
body {
    height: 100vh;
    perspective: 1px;
    transform-style: preserve-3d;
    overflow-x:hidden;
    overflow-y:auto;
}
`

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header
    const fontScale = typeof window !== 'undefined' && window.innerWidth < 768 ? scale(.6) : scale(1.5);

      if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...(typeof window !== 'undefined' && fontScale),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return ([
      location.pathname === rootPath && <Hero>{header}<Bio/></Hero>,
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {location.pathname !== rootPath && <header>{header}</header>}
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
        <GlobalStyle/>
      </div>
    ])
  }
}

export default Layout
