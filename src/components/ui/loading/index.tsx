import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { zIndex } from "@/styles/theme";

export default function Loading(){
    return(
        <Container>
            <Loader/>
        </Container>
    )
}

const Container = styled.div`
    z-index: ${zIndex.overlay};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
`
const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`
const Loader = styled.div`
    width: 60px;
    height: 60px;
    border: 6px solid #f3f3f3;
    border-top: 6px solid #2E6FF2;
    border-radius: 50%;
    animation: ${rotate} 1s linear infinite;
`