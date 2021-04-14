import React from 'react'

import {BorderDisplayPanel} from './styled/DisplayPanel'
import {DetailSummary} from './styled/DetailSummary'

const DetailListPanel = ({title, children}) => {

    return(
        <BorderDisplayPanel display={'flex'} flexDirection={'column'}>

            <h3>{title}</h3>
            {children}
        </BorderDisplayPanel>
    )
}

export default DetailListPanel;