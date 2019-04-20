import React, { Fragment } from "react"
import { Link } from "gatsby"
import Hero from "./hero"
import styled, { css } from "styled-components"

import { rhythm, scale } from "../utils/typography"
import Bio from "./bio"

const RootWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(25)};
  padding: 0 ${rhythm(3 / 4)};
  perspective: 1000px; // exists to give perspective to the blog post teaser wrappers
  ${props =>
    props.withHero &&
    // upcoming styles required to support cool hero appearance
    css`
      position: relative;
      z-index: 2;
      padding-top:20vh;
      background: rgba(255, 255, 255, 0.4);
      clip-path: polygon(0% 5%, 100% 0%, 1000% 100%, 0% 100%);
      transform: translateZ(0); // usage here IS A BIG FUCKIN' MESSUP: dirty hack only exists as chrome did not properly apply z-index on initial load. Huge thx to @morewry mentioning/fixing this here https://stackoverflow.com/questions/3485365/how-can-i-force-webkit-to-redraw-repaint-to-propagate-style-changes
    `}
  
  @media(min-width: 768px) {
    padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
  }
`

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header
    const fontScale =
      typeof window !== "undefined" && window.innerWidth < 768
        ? scale(0.6)
        : scale(1.5)

    if (location.pathname === rootPath) {
      header = (
        <Hero
          renderContent={[
            <h1
              style={{
                ...(typeof window !== "undefined" && fontScale),
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
            </h1>,
            <Bio />,
          ]}
        />
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
    return [
      location.pathname === rootPath ? header : <header>{header}</header>,
      <RootWrapper withHero={location.pathname === rootPath && header}>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </RootWrapper>,
    ]
  }
}

export default Layout
