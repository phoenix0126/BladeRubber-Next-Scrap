import React from 'react';

import useRouting from '../hooks/useRouting';
import useTexts from '../hooks/useTexts';
import useTracking from '../hooks/useTracking';

import WelcomePage from '../sites/welcome';
import RubberWizzardPage from '../sites/rubberWizzard';
import ImprintPage from '../sites/imprint';
import ConditionsPage from '../sites/conditions';
import ScrapingPage from '../sites/scraping';
import UsagePage from '../sites/usage';

const App = () => {
	// routing
	const { path, route } = useRouting();

	// tracking
	const { pathTrack, customTrack } = useTracking(path);

	// locales
	const { texts } = useTexts();

	// application state

	// routes
	return (
		<>
			{path === 'welcome' && <WelcomePage route={route} texts={texts} pathTrack={pathTrack} />}
			{path === 'rubberWizzard' && <RubberWizzardPage route={route} texts={texts} pathTrack={pathTrack} customTrack={customTrack} />}
			{path === 'imprint' && <ImprintPage route={route} />}
			{path === 'conditions' && <ConditionsPage route={route} />}
			{path === 'scraping' && <ScrapingPage texts={texts} />}
			{path === 'usage' && <UsagePage />}
		</>
	);
};

export default App;
