import React from 'react'
import {ICity} from "../state/ICity";


const CityDetails = ({languages}) => {
    return ( languages.map((language) =>
        <details>
            <summary>{language.language}</summary>
            <p>
                <ul>
                    <li>Is Official: {language.isOfficial === 'T' ? 'True' : 'False'}</li>
                    <li>Percent Spoken: {language.percentage}%</li>
                </ul>
            </p>
        </details>
    ))
}

export default CityDetails