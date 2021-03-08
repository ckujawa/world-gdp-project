import React from 'react'
import styled from 'styled-components'

export const BottomBorderPanel = styled.div`
    width: 100%;
    border-bottom: 1px solid #c0c0c0;
    margin: 1rem 0;
`

export const FlexBottomBorderPanel = styled(BottomBorderPanel)`
    display: flex;
    justify-content: space-around;
    align-items: center;
`

export const DetailPanel = styled.div`
    font-size: 1.5rem;
`

export const DetailLabel = styled.span`
    font-weight:bold;
`