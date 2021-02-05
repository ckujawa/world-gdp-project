import { createGlobalStyle } from 'styled-components'

import font from '../assets/roboto-v20-latin-regular.woff'

const Typography = createGlobalStyle`

    @font-face {
        font-family: Roboto;
        src: url(${font});
    }

    html{
        font-family: Roboto-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: var(--black);
        font-size: 1em;
    }

    p, li{
        line-height: .75;
        letter-spacing:.05rem;
    }
     
    h1, h2, h3, h4, h5, h6{
         font-weight: bold;
         margin: 0;
    }
     
     h1{
         font-size: 4.21rem !important;
         margin: 0 0 2rem 0 !important;
     }
     
     h2{
         font-size: 3.12rem;
     }

     h3{
         font-size: 1.78rem;
     }

     h4{
         font-size: 1.34rem;
     }
     
     h5{
         font-size: .75rem;
     }

     h6{
         font-size: .56rem;
     }

     .center{
         text-align: center;
     }
`

export default Typography;