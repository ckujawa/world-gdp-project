import React from 'react'
import styled from 'styled-components'

const HeaderStyle = styled.div`
    width: 100%;
    margin: 0;
    margin-bottom: .7rem;
    padding: 10px;
    border-bottom: 1px solid #c0c0c0;
`

export default function Header({children}) {

    return (
        <HeaderStyle>
            {children}
        </HeaderStyle>
    )
}