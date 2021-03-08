import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import ReactCountryFlag from 'react-country-flag'

import { useStateWithPromise } from '../hooks/useStateWithPromise'
import BaseLayout from '../components/BaseLayout'
import { ICountry } from '../state/ICountry'
import { BottomBorderPanel, FlexBottomBorderPanel, DetailPanel, DetailLabel } from '../components/styled/DisplayStyles'

const CountryDetail = (props) => {
    const { countryCode } = useParams();
    const { serviceEndpointBase } = props
    const [country, setCountry] = useStateWithPromise({
            code: '',
            name: '',
            continent: '',
            region: '',
            surfaceArea: 0,
            indepYear: 0,
            population: 0,
            lifeExpectancy: 0,
            gnp: 0,
            localName: '',
            governmentForm: '',
            headOfState: '',
            capital: {
               id: 0,
                name: '',
                countryCode: '',
                country: null,
                district: '',
                population: 0 
            },
            code2: ''
    })

    const populateCountryData = async () : Promise<void> => {
        const endpt = `${serviceEndpointBase}/countries/${countryCode}`
        console.log(endpt)
        const resp = await fetch(endpt)
        console.log(resp)
        const c: ICountry = await resp.json()
        setCountry(previous => ({...previous, ...c}))
    }

    useEffect(() => {
        populateCountryData()
    }, [])

    return (<BaseLayout>
        <BottomBorderPanel style={{textAlign: 'center'}}>
            <h2>Country: <span style={{color: 'blue'}}>{country.name} ({country.code})</span></h2>
        </BottomBorderPanel>
        <FlexBottomBorderPanel>
            <ReactCountryFlag countryCode={country.code2} svg
                style={{
                    width: '40%',
                    height: 'auto',
                    margin: '2rem'
                }}
            />
            <DetailPanel>
                <p><DetailLabel>Capital:</DetailLabel> {country.capital.name}</p>
                <p><DetailLabel>Continent:</DetailLabel> {country.continent}</p>
                <p><DetailLabel>Region:</DetailLabel> {country.region}</p>
                <p><DetailLabel>Head of State:</DetailLabel> {country.headOfState}</p>
                <p><DetailLabel>Government:</DetailLabel> {country.government}</p>
            </DetailPanel>
            <DetailPanel>
                <p><DetailLabel>Local Name:</DetailLabel> {country.localName}</p>
                <p><DetailLabel>Surface Area:</DetailLabel> {country.surfaceArea}</p>
                <p><DetailLabel>Population:</DetailLabel> {country.population}</p>
                <p><DetailLabel>Life Expectancy:</DetailLabel> {country.lifeExpectancy}</p>
            </DetailPanel>
        </FlexBottomBorderPanel>
    </BaseLayout>)
}

export default CountryDetail