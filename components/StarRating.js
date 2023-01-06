import React from 'react';
import StarRatings from 'react-star-ratings';
import template from '../config/styles';

const Component = ({ rating, setRating }) => {
	return (
		<StarRatings
			rating={rating}
			changeRating={setRating}
			numberOfStars={5}
			starEmptyColor={template.colors.gray}
			starRatedColor={template.colors.red}
			starHoverColor={template.colors.black}
			starDimension="20px"
			starSpacing="2px"
		/>
	);
};

export default Component;
