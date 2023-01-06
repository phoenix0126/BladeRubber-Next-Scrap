import { useEffect, useRef } from 'react';
import { load, save } from '../basics/localStorage';

const APPLICATION_PREFIX = 'bladerubber-';

const hook = (key, state, setter) => {
	const isLoading = useRef(false);

	useEffect(() => {
		isLoading.current = true;
		const res = load(APPLICATION_PREFIX + key);
		console.log(APPLICATION_PREFIX + key + ': ' + res);
		if (res !== null && res !== undefined) {
			if (typeof state === 'number') {
				return setter(parseFloat(res));
			} else {
				return setter(res);
			}
			// ToDo: add more type converts here
		}
	}, []);

	useEffect(() => {
		if (!isLoading.current) {
			save(APPLICATION_PREFIX + key, state);
		} else {
			isLoading.current = false;
		}
	}, [state]);

	return {};
};

export default hook;
