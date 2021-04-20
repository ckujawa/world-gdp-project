import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import ReactCountryFlag from 'react-country-flag'

import { useStateWithPromise } from '../hooks/useStateWithPromise'
import BaseLayout from '../components/BaseLayout'
import DetailListPanel from "../components/DetailListPanel";
import { ICountry } from '../state/ICountry'
import { BottomBorderPanel, FlexBottomBorderPanel, DetailPanel, DetailLabel } from '../components/styled/DisplayStyles'
import {ICity} from "../state/ICity";
import CityDetails from "../components/CityDetails";
import LanguageDetails from "../components/LanguageDetails";

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
    const [cities, setCities] = useStateWithPromise([])
    const [languages, setLanguages] = useStateWithPromise([])
    const [gdpData, setGdpData] = useStateWithPromise([])

    const populateCountryData = async () : Promise<void> => {
        const endpt = `${serviceEndpointBase}/countries/${countryCode}`
        const resp = await fetch(endpt)
        const c: ICountry = await resp.json()
        await setCountry(previous => ({...previous, ...c}))
    }

    const populateCities = async() : Promise<void> => {
        const endpt = `${serviceEndpointBase}/cities/${countryCode}`
        const resp = await fetch(endpt)
        const c : [ICity] = await resp.json()
        await setCities(c)
    }

    const populateLanguages = async() : Promise<void> => {
        const endpt = `${serviceEndpointBase}/languages/${countryCode}`
        try{
            const resp = await fetch(endpt)
            const lang = await resp.json()
            await setLanguages(lang)
        } catch (e) {
            console.error(`something went wrong when retrieving languages for ${countryCode}`)
        }
    }

    const populateGdp = async() : Promise<void> => {
        const endpt = `${serviceEndpointBase}/countries/${countryCode}/gdp`
        try{
            const resp = await fetch(endpt)
            const gdp = await resp.json()
            await setGdpData(gdp)
        } catch(e) {
            console.error(`something went wrong when retrieving gdp for ${countryCode}`)
        }
    }

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        populateLanguages()
        // noinspection JSIgnoredPromiseFromCall
        populateCities()
        // noinspection JSIgnoredPromiseFromCall
        populateCountryData()
        // noinspection JSIgnoredPromiseFromCall
        populateGdp()
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
        <FlexBottomBorderPanel>
            <DetailListPanel title={'Cities'}>
                <CityDetails cities={cities}/>
            </DetailListPanel>

            <DetailListPanel title={'Languages'}>
                <LanguageDetails languages={languages}/>
            </DetailListPanel>
            <DetailListPanel title={'GDP Data'}>
                {gdpData.map( dataPoint => <ul>
                    <li>{dataPoint.year} : {dataPoint.value}</li>
                </ul>)}
            </DetailListPanel>
        </FlexBottomBorderPanel>

    </BaseLayout>)
}

export default CountryDetail