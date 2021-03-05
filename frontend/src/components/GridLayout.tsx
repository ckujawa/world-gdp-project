import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const GridContainer = styled.div`
    margin-top: 2rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
`

const GridRow = styled.div`
    display: grid;
    grid-template-columns: 10% 25% 25% 30% 10%;
`

const neededKeys = ['code', 'name', 'continent', 'region', 'surfaceArea']

const GridLayout = ({ cols, rows, columnNames, countries }) => {

    return (
        <GridContainer>
            <GridRow>
                {columnNames.map((label, index) => <h4 key={index}>{label}</h4>)}
            </GridRow>
            {   countries &&
                countries.map((country) => {
                return (
                    <Link to={`/country/${country.code}`} key={`${country.code}_lnk`}>
                        <GridRow key={country.code}>
                            {Object.entries(country).map((entry) => {
                               if (neededKeys.includes(entry[0])) {
                                   return <p key={`${country.code}_${entry[0]}`}>{entry[1]}</p>
                               }
                            })}
                        </GridRow>
                    </Link>
                )
            })}
        </GridContainer>

    )
}

export default GridLayout