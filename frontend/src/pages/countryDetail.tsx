import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useStateWithPromise } from '../hooks/useStateWithPromise'
import BaseLayout from '../components/BaseLayout'
import {ICountry} from '../state/ICountry'

const CountryDetail = (props) => {
    const { countryCode } = useParams();
    const { serviceEndpointBase } = props
    const [country, setCountry] = useStateWithPromise([])
    
    const populateCountryData = async () : Promise<void> => {
        const endpt = `${serviceEndpointBase}/countries/${countryCode}`
        console.log(endpt)
        const resp = await fetch(endpt)
        console.log(resp)
        const country: ICountry = await resp.json()
        setCountry(country)
    }

    useEffect(() => {
        populateCountryData()
    }, [])

    return (<BaseLayout>
        <p>
            Country Detail: {countryCode}
        </p>
    </BaseLayout>)
}

export default CountryDetail