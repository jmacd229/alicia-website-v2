import { createGlobalStyle } from 'styled-components';
import { fontSize } from './font';
import colors from './palette';

export default createGlobalStyle`
:root {
	font-size: 8px;
    font-family: 'Source Sans Pro', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
  h1,h2,h3,h4,h5,h6 {
    margin: unset;
  }

  button {
    background-color: transparent;
    border: none;
    padding: 0;
	font-size: inherit;
	border-radius: 0px;
  }

  body {
	font-weight: 400;
    height: 100%;
    font-size: ${fontSize('regular')};
    background-color: ${colors.white};
    color: ${colors.black};
	overflow-x: hidden;
  margin: 0;
  }

  @font-face {
    font-family: 'eratolig';
    src: url('/fonts/eratolig-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
`;
