import { useEffect, useState } from 'react';

const hook = () => {
	const [windowWidth, setWindowWidth] = useState(0);
	const [windowHeight, setWindowHeight] = useState(0);

	useEffect(() => {
		const updateSizes = () => {
			setWindowWidth(window.innerWidth);
			setWindowHeight(window.innerHeight);
		};

		window.addEventListener('load', () => updateSizes(), false);
		window.addEventListener('resize', () => updateSizes(), false);

		updateSizes();
	}, []);

	return { windowWidth, windowHeight };
};

export default hook;
