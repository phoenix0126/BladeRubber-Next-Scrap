import React, { useState } from 'react';
import { getMyStyle } from './TextInput.style.js';
import useStyle from '../hooks/useStyle';

const Component = ({ value, setValue, type, placeholder, fixedWidth }) => {
	const [focused, setFocused] = useState(false);
	const { style } = useStyle(getMyStyle, { focused, fixedWidth }, [focused, fixedWidth]);

	return (
		<input
			type={type}
			value={value}
			placeholder={placeholder}
			style={style.input}
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			onChange={(event) => setValue(event.target.value)}
		/>
	);
};

export default Component;
