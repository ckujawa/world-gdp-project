import React from 'react'
import styled from 'styled-components'

const HeaderStyle = styled.div`
    width: 100%;
    margin: 0;
    padding: 0;
`

export default function Header({children}) {

    return (
        <HeaderStyle>
            {children}
        </HeaderStyle>
    )
}