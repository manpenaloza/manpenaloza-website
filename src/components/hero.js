import React from "react"
import styled from "styled-components";

const ParallaxWrapper = styled.div`
   width: 100vw;
    height:100vh;
    padding-top:20vh;
    box-sizing: border-box;
    transform-style: preserve-3d;
   
    &::before {
    content:"";
    width: 100vw;
    height: 100vh;
    top:0;
    left:0;
    background-image: url("trianglify.png");
    position: absolute;
    z-index: -1;
    transform:translateZ(-1px) scale(2);
    z-index: -1;
    }
`

const ParallaxContentWrapper = styled.div`
  margin: 0 auto;
    padding: 50px;
    width: 50%;
    background: rgba(49,100,25,0.3);
    clip-path: polygon(5% 0%, 92% 4%, 100% 89%, 0% 100%);
`;

const ParallaxText = styled.p``;

const Hero = (props) => {
    return (
        <ParallaxWrapper>
            <ParallaxContentWrapper>
                <ParallaxText>
                    {props.children}
                </ParallaxText>
            </ParallaxContentWrapper>
        </ParallaxWrapper>
    )
}

export default Hero;