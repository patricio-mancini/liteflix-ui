'use client'

import { css, Global } from '@emotion/react';
import normalize from 'emotion-normalize';

const styles = css`
  ${normalize}

  @font-face {
    font-family: 'BebasNeue';
    src: url('/fonts/BebasNeue-Thin.otf') format('truetype');
    font-weight: 200;
    font-style: normal;
  }

  @font-face {
    font-family: 'BebasNeue';
    src: url('/fonts/BebasNeue-Light.otf') format('truetype');
    font-weight: 300;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'BebasNeue';
    src: url('/fonts/BebasNeue-Regular.otf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'BebasNeue';
    src: url('/fonts/BebasNeue-Bold.otf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  body {
    background-color: #242424;
  }

  html,
  body {
    font-family: 'BebasNeue', Arial, sans-serif;
    height: 100%;
    line-height: 1;
    box-sizing: border-box;
    user-select: none;
  }

  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  button {
    border: 0;
    padding: 0;
    margin: 0;
    line-height: 1;
  }
`;

const globalStyles = (
  <Global styles={styles} />
);

export default globalStyles;
