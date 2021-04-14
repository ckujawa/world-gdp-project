import React from 'react'
import {ICity} from "../state/ICity";
import {DetailSummary} from "./styled/DetailSummary";


const CityDetails = ({cities}) => {
    return ( cities.map((city) =>
        <DetailSummary>
            <summary>{city.name}</summary>
            <p>
                <ul>
                    <li>District: {city.district}</li>
                    <li>Population: {city.population}</li>
                </ul>
            </p>
        </DetailSummary>
    ))
}

export default CityDetails