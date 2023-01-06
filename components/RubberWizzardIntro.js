import React from 'react';
import { getMyStyle } from './RubberWizzardIntro.style.js';
import useStyle from '../hooks/useStyle';
import useWindowSize from '../hooks/useWindowSize';
import ContentBox from '../components/ContentBox';
import ActionButton from '../components/ActionButton';

const Component = ({ route, texts }) => {
	const { windowWidth } = useWindowSize();
	const { style } = useStyle(getMyStyle, { windowWidth }, [windowWidth]);

	const startRubberWizzard = () => {
		route('rubberWizzard');
	};

	return (
		<ContentBox title={texts['rubber-wizzard-intro-title']}>
			<div style={style.contentContainer}>
				<img src="/rubbers.png" alt="rubber" style={style.image} />
				<div style={style.infoContainer}>
					<p style={style.infoText}>{texts['rubber-wizzard-intro-text']}</p>
					<ActionButton onClick={startRubberWizzard} label={texts['rubber-wizzard-intro-button']} />
				</div>
			</div>
		</ContentBox>
	);
};

export default Component;
