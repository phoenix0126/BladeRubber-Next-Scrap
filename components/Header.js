import React from 'react';

import { getMyStyle } from './Header.style.js';
import useStyle from '../hooks/useStyle';

const Component = ({ route }) => {
	const { style } = useStyle(getMyStyle);
	return (
		<div style={style.container} onClick={() => route('welcome')}>
			<img src="/bladerubber_logo.png" alt="logo" style={style.logo} />
		</div>
	);
};

export default Component;
