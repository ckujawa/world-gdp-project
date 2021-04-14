import React from 'react'
import {ICity} from "../state/ICity";
import {DetailSummary} from "./styled/DetailSummary";


const CityDetails = ({languages}) => {
    return ( languages.map((language) =>
        <DetailSummary>
            <summary>{language.language}</summary>
            <p>
                <ul>
                    <li>Is Official: {language.isOfficial === 'T' ? 'True' : 'False'}</li>
                    <li>Percent Spoken: {language.percentage}%</li>
                </ul>
            </p>
        </DetailSummary>
    ))
}

export default CityDetails