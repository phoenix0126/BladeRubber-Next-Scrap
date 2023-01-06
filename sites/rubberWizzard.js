import React, { useEffect } from 'react';
import PageSkeleton from '../components/PageSkeleton';
import RubberWizzardControl from '../components/RubberWizzardControl';

const Page = ({ route, texts, pathTrack, customTrack }) => {
	useEffect(() => {
		pathTrack();
	}, [pathTrack]);

	return (
		<PageSkeleton route={route} texts={texts}>
			<RubberWizzardControl texts={texts} track={customTrack} />
		</PageSkeleton>
	);
};

export default Page;
