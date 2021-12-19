import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    *,*::before,*::after {
        box-sizing: border-box;
    }

    :root {
        --font:#EDF6F9;
        --font-dark:#006D77;
        --font-neon-green:#1de01d;
        --font-dark-salmon:#E29578;
        --font-middle-blue-green:#83C5BE;
        --font-max-red:#d62828;
        --font-steelblue:#4682b4
    }

    body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #006D77;
    margin: 0;
    color: var(--font);
    }

    code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }
`

export default GlobalStyles
