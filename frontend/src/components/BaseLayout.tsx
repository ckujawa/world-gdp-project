import React from 'react'

import { Container } from '../styles/Container'
import Header from './Header'
import Typography from '../styles/Typography'
import GlobalStyle from '../styles/GlobalStyle'



const BaseLayout = ({children}) => {
    return (
        <Container>
            <GlobalStyle />
            <Typography />
            <Header>
                <h1 className='center'>World GDP</h1>
            </Header>
            {children}
        </Container>
    )
}

export default BaseLayout