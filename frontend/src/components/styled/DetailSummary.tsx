import React from 'react'
import styled from 'styled-components'


export const DetailSummary = styled.details`
    width: 100%;
    margin: 0 2px;
    padding: 10px auto;
    font-size: 1.2rem;
    
    summary {
        text-transform: uppercase;
        border: 1px solid #A0A0A0;
        border-radius: 5px;
        width: 90%;
        margin: 5px auto;
        margin-bottom: 0;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: #a2b4c1;
    }
    
    p {
        font-size: .9rem;
        padding: 5px;
        margin: 0 auto;
        background-color: #D0E9E0;
        width: 85%;
        
        ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
            
            li {
                padding: 5px;
                padding-left: 1rem;
                margin: 5px;
            }
        }
    }
`