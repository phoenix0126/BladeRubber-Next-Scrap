import React from 'react';
import { getMyStyle } from './ContentBox.style.js';
import useStyle from '../hooks/useStyle';

const Component = ({ title, children }) => {
	const { style } = useStyle(getMyStyle);
	return (
		<div style={style.outsideContainer}>
			<h1 style={style.headline}>{title}</h1>
			{children}
		</div>
	);
};

export default Component;
