import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=IBM+Plex+Sans+KR:wght@300;400;500&family=Noto+Serif+KR:wght@600;700&display=swap');
* {
  font-family: 'Cormorant Garamond', serif;
  font-family: 'IBM Plex Sans KR', sans-serif;
  font-family: 'Noto Serif KR', serif;
}`

export default GlobalStyle;