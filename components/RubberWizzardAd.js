import React from 'react';
import { getMyStyle } from './RubberWizzardAd.style.js';
import useStyle from '../hooks/useStyle';
import RubberWizzardContentBox from './RubberWizzardContentBox';
import LoadingSpinner from './LoadingSpinner';
import styles from '../config/styles.json';

const Component = ({ texts }) => {
	const { style } = useStyle(getMyStyle);

	return (
		<RubberWizzardContentBox
			title={texts['loading-title']}
			content={
				<div>
					<p style={style.hint}>
						<LoadingSpinner color={styles.colors.black} />
					</p>
				</div>
			}
			button={<></>}
		/>
	);
};

export default Component;
