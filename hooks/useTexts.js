import { useEffect, useState } from 'react';
import { getDefaultTexts, getTexts } from '../business/locales';

const hook = () => {
	const [texts, setTexts] = useState(getDefaultTexts());

	useEffect(() => {
		setTexts(getTexts());
	}, []);

	return { texts };
};

export default hook;
