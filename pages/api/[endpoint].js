import startScraping from '../../handlers/startScraping';
import scrapeItemNames from '../../handlers/scrapeItemNames';
import changeScrapingSection from '../../handlers/changeScrapingSection';
import scrapeNextItem from '../../handlers/scrapeNextItem';
import subscribe from '../../handlers/subscribe';
import getRubberQuestions from '../../handlers/getRubberQuestions';
import doRubberWizzard from '../../handlers/doRubberWizzard';
import rateRubberWizzardResults from '../../handlers/rateRubberWizzardResults';
import track from '../../handlers/track';
import getUsageData from '../../handlers/getUsageData';

export default async (req, res) => {
	try {
		// read request
		const {
			query: { endpoint },
			body,
			headers,
		} = req;

		// process request
		let result;
		if (endpoint === 'startScraping') {
			result = await startScraping();
		} else if (endpoint === 'scrapeItemNames') {
			const { sectionid } = headers;
			result = await scrapeItemNames(sectionid);
		} else if (endpoint === 'changeScrapingSection') {
			const { currentSectionId } = body;
			result = await changeScrapingSection(currentSectionId);
		} else if (endpoint === 'scrapeNextItem') {
			const { sectionId, nextIndex } = body;
			result = await scrapeNextItem(sectionId, nextIndex);
		} else if (endpoint === 'subscribe') {
			const { email } = body;
			result = await subscribe(email);
		} else if (endpoint === 'getRubberQuestions') {
			result = await getRubberQuestions();
		} else if (endpoint === 'doRubberWizzard') {
			const { answers } = body;
			result = await doRubberWizzard(answers);
		} else if (endpoint === 'rateRubberWizzardResults') {
			const { wizzardId, ratings } = body;
			result = await rateRubberWizzardResults(wizzardId, ratings);
		} else if (endpoint === 'track') {
			const { name, properties, browserId } = body;
			result = await track(name, properties, browserId);
		} else if (endpoint === 'getUsageData') {
			const { timestampstart, timestampend } = headers;
			result = await getUsageData(parseInt(timestampstart), parseInt(timestampend));
		} else {
			throw new Error('Endpoint doesnt exist.');
		}

		// send response
		res.status('200').json(result);
	} catch (error) {
		res.status('500').json({ error: error.toString().split('Error: ')[1] });
	}
};
