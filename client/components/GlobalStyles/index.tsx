import { createGlobalStyle } from 'styled-components';
import { AppColor } from 'constant';

const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  html,
  body {
    /* font-family: 'Roboto', sans-serif; */
    height: 100%;
    margin: 0;
    font-size: 16px;
    background-color: ${AppColor.GREY};
  }
  #__next {
    height: 100%;
  }
`;

export default GlobalStyles;
