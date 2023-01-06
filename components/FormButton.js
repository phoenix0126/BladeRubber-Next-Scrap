import React, { useState } from 'react';
import { getMyStyle } from './FormButton.style.js';
import useStyle from '../hooks/useStyle';
import LoadingSpinner from './LoadingSpinner';
import styles from '../config/styles';

const Component = ({ onClick = () => null, label = '', id = '', loading = false }) => {
	const [isHovered, setIsHovered] = useState(false);
	const { style } = useStyle(getMyStyle, { isHovered }, [isHovered]);

	return (
		<button id={id} style={style.button} onClick={onClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			{loading ? <LoadingSpinner color={styles.colors.white} /> : label}
		</button>
	);
};

export default Component;
