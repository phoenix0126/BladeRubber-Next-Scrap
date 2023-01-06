import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const hook = () => {
	const [browserId, setBrowserId] = useState('');
	useLocalStorage('browserid', browserId, setBrowserId);

	const generate = () => {
		const newId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		setBrowserId(newId);
		return newId;
	};

	const reset = () => {
		setBrowserId('');
	};

	return { browserId, generate, reset };
};

export default hook;
