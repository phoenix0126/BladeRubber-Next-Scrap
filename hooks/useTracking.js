import { useCallback } from 'react';
import useBrowserId from './useBrowserId';
import { track } from '../fetchers/api';

const hook = (path) => {
	const { browserId, generate } = useBrowserId();

	const trackingActive = process.env.NEXT_PUBLIC_ACTIVATE_TRACKING === 'true';

	const pathTrack = useCallback(async () => {
		if(trackingActive) {
			let bid = browserId;
			if (bid === '') {
				bid = generate();
			}
			await track('visit_' + path, {}, bid);
		}
	}, [browserId, path, trackingActive]);

	const customTrack = useCallback(
		async (name, properties) => {
			if(trackingActive) {
				let bid = browserId;
				if (bid === '') {
					bid = generate();
				}
				await track(name, properties, bid);
			}
		},
		[browserId, trackingActive]
	);

	return { pathTrack, customTrack };
};

export default hook;
