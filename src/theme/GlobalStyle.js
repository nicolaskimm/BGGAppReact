import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Raleway:400,700');

    *, *::before, *::after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: 'Raleway', sans-serif;
        background-color: #2D2E56;
        color: white;
    }
`;

export default GlobalStyle;
