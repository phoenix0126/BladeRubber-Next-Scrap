import React from 'react';
import { getMyStyle } from './Counter.style.js';
import useStyle from '../hooks/useStyle';

const Component = ({ counter = 0, setCounter = () => null, showOnly = false }) => {
	const { style } = useStyle(getMyStyle);

	const increment = () => {
		setCounter(counter + 1);
	};

	return (
		<>
			{!showOnly && (
				<a onClick={increment} style={style.link}>
					increment
				</a>
			)}
			<p>{counter}</p>
		</>
	);
};

export default Component;
