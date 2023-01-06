import React, { useCallback } from 'react';
import FormButton from '../components/FormButton';
import { getMyStyle } from './RubberWizzardHint.style.js';
import useStyle from '../hooks/useStyle';
import RubberWizzardContentBox from './RubberWizzardContentBox';

const Component = ({ setMode, texts }) => {
	const { style } = useStyle(getMyStyle);

	const startWizzard = useCallback(() => {
		setMode('wizzard');
	}, [setMode]);

	return (
		<RubberWizzardContentBox
			title={texts['rubber-wizzard-hint-title']}
			content={<p style={style.hint}>{texts['rubber-wizzard-hint-text']}</p>}
			button={<FormButton onClick={startWizzard} label={texts['rubber-wizzard-hint-button']} />}
		/>
	);
};

export default Component;
