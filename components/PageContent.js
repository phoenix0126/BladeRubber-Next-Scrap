import React from 'react';
import { getMyStyle } from './PageContent.style.js';
import useStyle from '../hooks/useStyle';

const Component = ({ children }) => {
	const { style } = useStyle(getMyStyle);

	return <div style={style.contentContainer}>{children}</div>;
};

export default Component;
