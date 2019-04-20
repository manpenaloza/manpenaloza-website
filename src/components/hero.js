import React from "react"
import styled, { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  html {
    overflow: hidden;
  } 
body {
    height: 100vh;
    perspective: 1px;
    transform-style: preserve-3d;
    overflow-x:hidden;
    overflow-y:visible;
}`

const ParallaxWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 5vh;
  box-sizing: border-box;
  transform-style: preserve-3d;
  
  @media (min-width: 768px) {
    padding-top: 15vh;
  }

  @media (min-width: 1024px) {
    padding-top: 20vh;
  }

  &::before {    
    content: "";
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-image: url("trianglify.png");
    position: absolute;
    z-index: -1;
    transform: translateZ(-1px) scale(2);
  }
`

const ParallaxContentWrapper = styled.div`
  margin: 0 auto;
  padding: 30px;
  width: 95%;
  background: rgba(49, 100, 25, 0.2);
  clip-path: polygon(5% 0%, 92% 4%, 100% 89%, 0% 100%);
  filter: drop-shadow(0px 10px 5px rgba(49, 100, 25, 0.2));

  @media (min-width: 768px) {
    padding: 60px;
    width: 90%;
  }

  @media (min-width: 1024px) {
    width: 60%;
  }
`

const ParallaxText = styled.p``

const Hero = props => {
  return (
    <ParallaxWrapper>
      <ParallaxContentWrapper>{props.renderContent}</ParallaxContentWrapper>
      <GlobalStyle />
    </ParallaxWrapper>
  )
}

export default Hero
