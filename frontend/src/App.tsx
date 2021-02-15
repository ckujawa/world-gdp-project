import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/home'
import CountryDetail from './pages/countryDetail'

const serviceEndpointBase = 'http://localhost:8080/worldgdp/api'


const App = () => {
    const [isLoading, setLoading] = useState(true)
    return (
        <Router>
            <Switch>
                <Route path="/country/:countryCode">
                    <CountryDetail serviceEndpointBase={serviceEndpointBase}/>
                </Route>
                <Route path="/" >
                    <Home serviceEndpointBase={serviceEndpointBase}  loading={isLoading} />
                </Route>
            </Switch> 
        </Router>
     )
}

export default App