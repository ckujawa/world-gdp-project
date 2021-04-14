import React from 'react'

import {BorderDisplayPanel, DisplayPanelTitle} from './styled/DisplayPanel'
import {DetailSummary} from './styled/DetailSummary'

const DetailListPanel = ({title, children}) => {

    return(
        <BorderDisplayPanel display={'flex'} flexDirection={'column'}>

            <DisplayPanelTitle>{title}</DisplayPanelTitle>
            {children}
        </BorderDisplayPanel>
    )
}

export default DetailListPanel;