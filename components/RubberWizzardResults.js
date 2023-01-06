import React, { useState, useCallback } from 'react';
import RubberWizzardContentBox from './RubberWizzardContentBox';
import FormButton from '../components/FormButton';
import StarRating from '../components/StarRating';
import useStyle from '../hooks/useStyle';
import { getMyStyle } from './RubberWizzardResults.style.js';
import { rateRubberWizzardResults } from '../fetchers/api';

const Component = ({ wizzardId, results, texts }) => {
	const { style } = useStyle(getMyStyle);
	const [ratings, setRatings] = useState([-1, -1, -1]);
	const [isRating, setIsRating] = useState(false);

	const updateRating = useCallback(
		(index, rating) => {
			const newRatings = [...ratings];
			newRatings[index] = rating;
			setRatings(newRatings);
		},
		[ratings]
	);

	const openRubber = (rubber) => {
		window.open(rubber.url, '_blank').focus();
	};

	const rateResults = useCallback(async () => {
		setIsRating(true);
		if (ratings.includes(-1)) {
			alert(texts['rating-error']);
		} else {
			await rateRubberWizzardResults(wizzardId, ratings);
			alert(texts['rating-success']);
		}
		setIsRating(false);
	}, [wizzardId, ratings]);

	return (
		<>
			<RubberWizzardContentBox
				title={texts['rubber-wizzard-results-title']}
				content={
					<>
						{results.map((result, i) => (
							<div style={style.resultContainer}>
								<div style={style.nameContainer}>
									<img
										src={result.picture}
										alt={result.name}
										style={style.image}
										onError={({ currentTarget }) => {
											currentTarget.onerror = null; // prevents looping
											currentTarget.src = '/error.png';
										}}
									/>
									<p style={style.name} onClick={() => openRubber(result)}>
										{result.name}
									</p>
								</div>
								<div style={style.ratingContainer}>
									<StarRating rating={ratings[i]} setRating={(value) => updateRating(i, value)} />
								</div>
							</div>
						))}
						<p style={style.hintContainer}>{texts['rubber-wizzard-results-text']}</p>
					</>
				}
				button={<FormButton onClick={rateResults} label={texts['rubber-wizzard-results-button']} loading={isRating} />}
			/>
			<RubberWizzardContentBox
				title={texts['rubber-wizzard-share-title']}
				content={<p style={style.hintContainer}>{texts['rubber-wizzard-share-text']}</p>}
				button={<></>}
			/>
		</>
	);
};

export default Component;
