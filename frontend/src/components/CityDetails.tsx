import React from 'react'
import {ICity} from "../state/ICity";


const CityDetails = ({cities}) => {
    return ( cities.map((city) =>
        <details>
            <summary>{city.name}</summary>
            <p>
                <ul>
                    <li>District: {city.district}</li>
                    <li>Population: {city.population}</li>
                </ul>
            </p>
        </details>
    ))
}

export default CityDetails