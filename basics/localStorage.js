const load = (key) => {
	if (typeof window !== 'undefined') {
		return window.localStorage.getItem(key);
	} else {
		throw new Error('not a browser environment');
	}
};

const save = (key, value) => {
	if (typeof window !== 'undefined') {
		window.localStorage.setItem(key, value);
		return true;
	} else {
		throw new Error('not a browser environment');
	}
};

export { load, save };
