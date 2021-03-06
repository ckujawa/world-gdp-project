import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import ReactCountryFlag from 'react-country-flag'

import { useStateWithPromise } from '../hooks/useStateWithPromise'
import BaseLayout from '../components/BaseLayout'
import { ICountry } from '../state/ICountry'
import { BottomBorderPanel } from '../components/styled/DisplayStyles'

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
        <BottomBorderPanel>
            <h3>Country</h3>
            <p>{country.name} ({country.code})</p>
        </BottomBorderPanel>
        <BottomBorderPanel style={{display: 'flex'}}>
            <ReactCountryFlag countryCode={country.code2} svg
                style={{
                    width: '40%',
                    height: 'auto',
                    marginLeft: '2rem',
                    marginRight: '2rem'
                }}
            />
            <div>
                <p>Capital: {country.capital.name}</p>
                <p>Continent: {country.continent}</p>
                <p>Region: {country.region}</p>
                <p>Head of State: {country.headOfState}</p>
                <p>Government: {country.government}</p>
                <p>Local Name: {country.localName}</p>
                <p>Surface Area: {country.surfaceArea}</p>
                <p>Population: {country.population}</p>
                <p>Life Expectancy: {country.lifeExpectancy}</p>
            </div>
        </BottomBorderPanel>
    </BaseLayout>)
}

export default CountryDetail