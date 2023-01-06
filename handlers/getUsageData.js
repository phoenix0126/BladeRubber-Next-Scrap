import { getLabeledTimepoints, getAmountOfEventsBetweenTimepoints } from '../business/usage';

const handler = async (timestampStart, timestampEnd) => {
	const { labels, timepoints } = getLabeledTimepoints(timestampStart, timestampEnd, 10);
	const datasets = await getAmountOfEventsBetweenTimepoints(timepoints);
	const result = {
		labels, // array of strings
		datasets, // array of objects mit label (string) und data array (number)
	};
	return result;
};

export default handler;
