/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {colors} from "@/styles/theme"
import { mq } from './media'

export const globalStyles = css`
  @font-face {
    font-family: 'Paperlogy';
    src: url('/assets/fonts/Paperlogy-1Thin.ttf') format('truetype');
    font-weight: 100;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Paperlogy';
    src: url('/assets/fonts/Paperlogy-2ExtraLight.ttf') format('truetype');
    font-weight: 200;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Paperlogy';
    src: url('/assets/fonts/Paperlogy-3Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Paperlogy';
    src: url('/assets/fonts/Paperlogy-4Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Paperlogy';
    src: url('/assets/fonts/Paperlogy-5Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Paperlogy';
    src: url('/assets/fonts/Paperlogy-6SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Paperlogy';
    src: url('/assets/fonts/Paperlogy-7Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Paperlogy';
    src: url('/assets/fonts/Paperlogy-8ExtraBold.ttf') format('truetype');
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Paperlogy';
    src: url('/assets/fonts/Paperlogy-9Black.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Paperlogy', sans-serif;
  }

  button, input, textarea, select {
    font-family: inherit;
  }

  .main-container {
    width: 84.5vw;
    max-width: 84.5vw;
    height: 100vh;
    max-height: 100vh;

    ${mq.mobile} {
      width: 100vw;
      max-width: 100vw;
      height: 92vh;
      max-height: 92vh;
    }
  }

  body {
    font-family: 'Paperlogy', sans-serif;
    background-color: ${colors.background};
    color: ${colors.text};
  }
`