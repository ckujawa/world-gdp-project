import React from 'react'
import styled from 'styled-components'

import{IStyleProps} from "../../state/IStyleProps";

export const DisplayPanel = styled.div<IStyleProps>`
	margin: 10px;
	padding: 10px;
	width: ${props => props.width || "33%"};
	display: ${props => props.display || "block"};
	${props => ( props.flexDirection ? `flex-direction: ${props.flexDirection}` : '')};
`

export const BorderDisplayPanel = styled(DisplayPanel)`
	border: 2px solid var(--black);
	border-radius: .5rem;
`