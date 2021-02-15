import React from 'react'
import { useParams } from 'react-router-dom'

import BaseLayout from '../components/BaseLayout'

const CountryDetail = (props) => {
    const {countryCode} = useParams();

    return (<BaseLayout>
        <p>
            Country Detail: {countryCode}
        </p>
    </BaseLayout>)
}

export default CountryDetail