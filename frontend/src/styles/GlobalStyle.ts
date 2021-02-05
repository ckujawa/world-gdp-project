import { createGlobalStyle } from 'styled-components'
import {normalize} from 'styled-normalize'

const GlobalStyle = createGlobalStyle`
    ${normalize}

    :root{
        --black: #020211;
        --white: #E0EfED;
        --primary: #151380;
        --primary-accent: #B86A00;
        --secondary-accent: #E2D00C;
        --error: #A60716;
        --gray: #efefef;
    }

    html{
        height: 100vh;
        width: 100vw;
        padding: 20px;
        box-sizing: border-box;
    }

`

export default GlobalStyle