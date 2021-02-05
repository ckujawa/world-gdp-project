import React, {useEffect, useState} from 'react'
import Select from 'react-select'
import { useStateWithPromise } from '../hooks/useStateWithPromise'
import { ICountry, ICountryReturnData } from 'src/state/ICountry'


import BaseLayout from '../components/BaseLayout'
import GridLayout from '../components/GridLayout'

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
        
        const { isLoading, setLoading, serviceEndpointBase } = props
        const [countries, setCountries] = useStateWithPromise([])
        const [countryCount, setCountryCount] = useStateWithPromise(0)
        const [continents, setContinents] = useStateWithPromise([])
        const [regions, setRegions] = useStateWithPromise([])
        const [selectedContinent, setSelectedContinent] = useState("")
        const [selectedRegion, setSelectedRegion] = useState("")
        const [currentPage, setCurrentPage] = useState(1)

        const populateContinents = async (serviceEndpointBase: string): Promise<void> => {
            try {
                const response = await fetch(`${serviceEndpointBase}/lookup/continents`)
                const continents: [string] = await response.json()
                const options = continents.map((cont) => { return { label: cont, value: cont } })
                options.unshift({ label: 'NONE', value: '' })
                setContinents(options)
            } catch (err) {
                //log that...
            }
        }

        const populateRegions = async (serviceEndpointBase: string): Promise<void> => {
            try {
                const response = await fetch(`${serviceEndpointBase}/lookup/regions`)
                const reg: [string] = await response.json()

                const options = reg.map((dat) => { return { label: dat, value: dat } })
                options.unshift({ label: 'NONE', value: '' })
                
                setRegions(options)
            } catch (err) {
                //uh-oh...
            }
        }
        
        const populateCountries = async (serviceEndpointBase: string, pageNo: number = 1): Promise<void> => {
            try {
                const response = await fetch(`${serviceEndpointBase}/countries?pageNo=${pageNo}`)
                const countries: ICountryReturnData = await response.json();
                setCountryCount(countries.count)
                setCountries(countries.list)
            } catch (err) {
                //oops
            }
        }

        useEffect(() => {
            populateContinents(serviceEndpointBase)
            populateRegions(serviceEndpointBase)
            populateCountries(serviceEndpointBase)
        }, [])
        
        return (
        <BaseLayout>
            <h2>Countries</h2>
            <br />
            <div>
                <input type="text" placeholder="Search By Name" />
                <button>Search</button>    
            </div>
                <div>
                    <h3>Continent</h3>
                    <Select options={continents} value={continents.filter(option => option.label === 'NONE')}/>
                    <h3>Region</h3>
                    <Select options={regions} value={regions.filter(option => option.label === 'NONE')}/>
            </div>
            <div>
                <GridLayout cols="5" rows="10" columnNames={columnsNames} countries={countries}/>
            </div>  
        </BaseLayout>
    )
}


export default Home