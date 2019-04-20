/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from 'styled-components'

import { rhythm } from "../utils/typography"

const Wrapper = styled.section`
 margin-bottom: ${rhythm(2.5)};
 display: flex;
 flex-direction: column;
  align-items: center;
   
 @media(min-width: 768px) {
  flex-direction: row;
    align-items: initial; 
 }
`

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <Wrapper>
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 100, // required instead of 'width: 100' as gatsby-image does some weired stylings regarding images
                maxWidth: 100, // required instead of 'width: 100' as gatsby-image does some weired stylings regarding images
                height: 100,
                borderRadius: `100%`,
              }}
              imgStyle={
                {
                  // borderRadius: `20%`,
                }
              }
            />
            <p>
              My name is <strong>{author}</strong>. I live in Austria and work
              as a web developer building things to enrich the internet and
              improve business success of{" "}
              <a href="https://www.blue-tomato.com ">Blue Tomato</a>. On
              Twitter:{" "}
              <a href="https://www.twitter.com/manpenaloza">@manpenaloza</a>.
              {` `}
            </p>
          </Wrapper>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 200, height: 200) {
          ...GatsbyImageSharpFixed_tracedSVG
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
