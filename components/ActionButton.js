import React, { useState } from 'react';
import { getMyStyle } from './ActionButton.style.js';
import useStyle from '../hooks/useStyle';

const Component = ({ onClick = () => null, label = '', id = '' }) => {
	const [isHovered, setIsHovered] = useState(false);
	const { style } = useStyle(getMyStyle, { isHovered }, [isHovered]);

	return (
		<button id={id} style={style.button} onClick={onClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			{label}
		</button>
	);
};

export default Component;
