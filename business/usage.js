import { connect, disconnect, getDb } from '../services/mongodb';
import { getEnglishDateFormat } from '../basics/timedate';

const getLabeledTimepoints = (timestampStart, timestampEnd, divider) => {
	const fullLength = timestampEnd - timestampStart;
	const partLength = fullLength / divider;
	let timepoints = [timestampStart];
	for (let i = 1; i < divider; i++) {
		const newTimepoint = timestampStart + i * partLength;
		timepoints.push(newTimepoint);
	}
	timepoints.push(timestampEnd);
	const labels = timepoints.map((tp) => getEnglishDateFormat(tp));
	return { labels, timepoints };
};

const getAmountOfEventsBetweenTimepoints = async (timepoints) => {
	let datasets = [];
	await connect(process.env.MONGODB_USERNAME, process.env.MONGODB_USERPASSWORD, process.env.MONGODB_CLUSTERLINK, process.env.MONGODB_DBNAME);
	// query all events in timeframe
	const eventsInTimeframe = await getDb()
		.collection('Events')
		.find({
			timestamp: { $gt: timepoints[0] - 1, $lt: timepoints[timepoints.length - 1] + 1 },
		})
		.toArray();
	// get all types of events -> these will be the labels in our datasets
	let labels = [];
	eventsInTimeframe.forEach((event) => {
		if (!labels.includes(event.name)) {
			labels.push(event.name);
		}
	});
	// calculate all gt, lt options that we will have to query for from the timepoints array
	let splittedTimeframes = [];
	let addingCounter = 0;
	timepoints.forEach((timepoint, index) => {
		if (addingCounter === 0) {
			splittedTimeframes.push([timepoint]);
			addingCounter++;
		} else if (index !== timepoints.length - 1) {
			splittedTimeframes[splittedTimeframes.length - 1].push(timepoint);
			splittedTimeframes.push([timepoint]);
		} else {
			splittedTimeframes[splittedTimeframes.length - 1].push(timepoint);
		}
	});
	// for each label
	labels.forEach((label) => {
		// map the labels into the datasets array
		datasets.push({ label, data: [] });
		// for each splittedTimeframe
		splittedTimeframes.forEach((timeframe) => {
			// get all events for specific label in specific timeframe
			const selectedEvents = eventsInTimeframe.filter(
				(eventInTimeframe) => eventInTimeframe.name === label && eventInTimeframe.timestamp >= timeframe[0] && eventInTimeframe.timestamp <= timeframe[1]
			);
			// the length of this array is the amount of events with this type in one timeframe
			// add this value to the data array of the specific labeled object inside the datasets array
			datasets = datasets.map((dataset) => {
				if (dataset.label === label) {
					return { label: dataset.label, data: [...dataset.data, selectedEvents.length] };
				} else {
					return dataset;
				}
			});
		});
	});
	await disconnect();
	return datasets;
};

export { getLabeledTimepoints, getAmountOfEventsBetweenTimepoints };
