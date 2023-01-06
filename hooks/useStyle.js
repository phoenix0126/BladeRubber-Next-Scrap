import { useEffect, useState } from 'react';

const hook = (getMyStyle, params = {}, triggers = []) => {
	const [style, setStyle] = useState({});

	useEffect(() => {
		setStyle(getMyStyle(params));
	}, triggers);

	return { style };
};

export default hook;
