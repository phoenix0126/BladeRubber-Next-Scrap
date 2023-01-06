import React from 'react';
import ContentBox from './ContentBox';
import { getMyStyle } from './RubberWizzardContentBox.style.js';
import useStyle from '../hooks/useStyle';

const Component = ({ title, content, button }) => {
	const { style } = useStyle(getMyStyle);

	return (
		<ContentBox title={title}>
			<div style={style.contentContainer}>
				{content}
				<div style={style.nextContainer}>{button}</div>
			</div>
		</ContentBox>
	);
};

export default Component;
