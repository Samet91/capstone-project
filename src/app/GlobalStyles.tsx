import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    *,*::before,*::after {
        box-sizing: border-box;
    }

    body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: white;
    margin: 0 10px;
    }

    code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }
`

export default GlobalStyles
