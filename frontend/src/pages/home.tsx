import React, {useEffect, useState} from 'react'
import Select from 'react-select'
import { useStateWithPromise } from '../hooks/useStateWithPromise'
import { ICountryReturnData } from 'src/state/ICountry'
import {useHistory} from 'react-router-dom'

import BaseLayout from '../components/BaseLayout'
import GridLayout from '../components/GridLayout'
import Pager from '../components/Pager'
import { RegionSelectPanel, RegionSelectBlock } from '../components/styled/RegionSelectPanel'

const columnsNames = ["Code", "Name", "Continent", "Region", "Area"]

//on page load
    //set loading to true
    // : get countries for page 1 from service
    //populate state object
    //get continents from service
    //populate state object
    //get regions from service
    //set current page to 1
    //populate state object with countries
    //set loading to false

//on select of Continent:
    //set current contentent in state
    //set loading to true
    //get countries for specified content from service
    //set current page to 1
    //popluate state object with countries
    //set loading to false

//on select of Region:
    //set current region in state
    //set loading to true
    //get countries for specified region, page 1
    //set current page to 1
    //populate state object with countries
    //set loading to false

//on select page number:
    //set current page number to selected
    //set loading to true
    //get countries for specified page
    //set current page to selected
    //populate state object with countries
    //set loading to false

    
    
    
    
    const Home = (props) => {
        
        const pageSize: number = 10;
        const { loading, setLoading, serviceEndpointBase } = props
        const [countries, setCountries] = useStateWithPromise([])
        const [countryCount, setCountryCount] = useStateWithPromise(0)
        const [continents, setContinents] = useStateWithPromise([])
        const [regions, setRegions] = useStateWithPromise([])
        const [selectedContinentValue, setSelectedContinentValue] = useState("NONE")
        const [selectedRegion, setSelectedRegion] = useState("")
        const [currentPage, setCurrentPage] = useState(1)
        const [searchVal, setSearchVal] = useState('')
        const history = useHistory();

        const populateContinents = async (region: string): Promise<void> => {
            try {
                let endpoint = `${serviceEndpointBase}/lookup/continents`
                if (region && region !== "NONE") {
                    endpoint += `?region=${region}`
                }

                const response = await fetch(endpoint)
                const continents: [string] = await response.json()
                const options = continents.map((cont) => { return { label: cont, value: cont } })
                options.unshift({ label: 'NONE', value: 'NONE' })
                setContinents(options)
            } catch (err) {
                //log that...
            }
        }

        const populateRegions = async (continent?: string): Promise<void> => {
            try {
                let endpoint = `${serviceEndpointBase}/lookup/regions`
                if (continent && continent !== "NONE") {
                    endpoint += `?continent=${continent}`
                }
                const response = await fetch(encodeURI(endpoint))
                const reg: [string] = await response.json()

                const options = reg.map((dat) => { return { label: dat, value: dat } })
                options.unshift({ label: 'NONE', value: 'NONE' })
                
                setRegions(options)
            } catch (err) {
                //uh-oh...
            }
        }
        
        const populateCountries = async (endpointBase: string = serviceEndpointBase,
            pageNo: number = 1,
            continent?: string,
            region?: string): Promise<void> => {
            try {
                let serviceEndpoint: string = `${endpointBase}/countries?&pageNo=${pageNo}`
                if (continent && continent !== "NONE") {
                    serviceEndpoint = `${serviceEndpoint}&continent=${continent}`
                }
                if (region && region !== "NONE") {
                    serviceEndpoint = `${serviceEndpoint}&region=${region}`
                }
                const response = await fetch(encodeURI(serviceEndpoint))
                const countries: ICountryReturnData = await response.json()
                setCountryCount(countries.count)
                setCountries(countries.list)
            } catch (err) {
                //oops
            }
        }

        const continentChanged = async (event): Promise<void> => {
            await setSelectedContinentValue(event.value);
        }

        const regionChanged = async (event): Promise<void> => {
            await setSelectedRegion(event.value)
        }

        const doSearch = async (event): Promise<void> => {
            let serviceEndpoint: string = `${serviceEndpointBase}/countries?&search=${searchVal}`
            try {
                const response = await fetch(encodeURI(serviceEndpoint))
                const found: ICountryReturnData = await response.json()
                history.push(`/country/${found.list[0].code}`)
            } catch (err) {
                console.error(`An error occurred when retrieving information for ${searchVal}: ${err}`)
            }
        }

        //use this to populate countries, regions, and continents on render
        useEffect(() => {
            setLoading(true)
            populateContinents(serviceEndpointBase)
            populateRegions(serviceEndpointBase)
            populateCountries(serviceEndpointBase)
            setLoading(false)
        }, [])

        //populates countries and regions when a continent value has been selected
        useEffect(() => {
            populateCountries(serviceEndpointBase, 1, selectedContinentValue);
            populateRegions(selectedContinentValue);
        }, [selectedContinentValue])

        //populates countries and continents when a region is selected.
        useEffect(() => {
            populateCountries(serviceEndpointBase, 1, null, selectedRegion)
            populateContinents(selectedRegion)
        }, [selectedRegion])

        //populates the specified page of countries when the current page is changed
        useEffect(() => {
            populateCountries(serviceEndpointBase, currentPage)
        }, [currentPage])
        
        return (
        <BaseLayout>
            <h2>Countries</h2>
            <br />
            <div>
                    <input type="text" placeholder="Search By Name" value={searchVal} onChange={(event) => setSearchVal(event.target.value)}/>
                <button onClick={doSearch}>Search</button>    
            </div>
                <RegionSelectPanel>
                    <RegionSelectBlock>
                    <h3>Continent</h3>
                    <Select options={continents} onChange={continentChanged} value={continents.filter(option => option.label === selectedContinentValue)}/>
                    </RegionSelectBlock>
                    <RegionSelectBlock>
                        <h3>Region</h3>
                        <Select options={regions} onChange={regionChanged} value={regions.filter(option => option.label === 'NONE')}/>
                    </RegionSelectBlock>
                </RegionSelectPanel>
            <div>
                <GridLayout cols="5" rows="10" columnNames={columnsNames} countries={countries}/>
                </div>  
            <Pager pageSize={pageSize} countryCount={countryCount} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </BaseLayout>
        )
}


export default Home