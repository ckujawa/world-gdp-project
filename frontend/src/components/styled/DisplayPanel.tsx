import React from 'react'
import styled from 'styled-components'

import{IStyleProps} from "../../state/IStyleProps";

export const DisplayPanel = styled.div<IStyleProps>`
	margin: 10px;
	padding: 10px;
	width: ${props => props.width || "33%"};
	height: 300px;
	overflow-y: auto;
	display: ${props => props.display || "block"};
	${props => ( props.flexDirection ? `flex-direction: ${props.flexDirection}` : '')};
	${props => (props.flex ? `flex: ${props.flex}` : '')};
`

export const BorderDisplayPanel = styled(DisplayPanel)`
	border: 2px solid var(--black);
	border-radius: .5rem;
`

export const DisplayPanelTitle = styled.h3`
	width: 90%;
	margin: .5rem auto;
	text-align: center;
`