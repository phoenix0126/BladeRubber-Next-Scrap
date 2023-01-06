import React, { useEffect } from 'react';
import PageSkeleton from '../components/PageSkeleton';
import RubberWizzardIntro from '../components/RubberWizzardIntro';
import Subscription from '../components/Subscription';

const Page = ({ route, texts, pathTrack }) => {
	useEffect(() => {
		pathTrack();
	}, [pathTrack]);

	return (
		<PageSkeleton route={route} texts={texts}>
			<RubberWizzardIntro route={route} texts={texts} />
			<Subscription texts={texts} />
		</PageSkeleton>
	);
};

export default Page;
