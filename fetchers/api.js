import { sendRequest } from '../basics/http';

const PROTOCOL = process.env.NEXT_PUBLIC_IS_LOCAL === 'true' ? 'http' : 'https';
const HOST = () => window.location.host;

const startScraping = async () => await sendRequest({ method: 'POST', url: PROTOCOL + '://' + HOST() + '/api/startScraping' });
const scrapeItemNames = async (sectionId) =>
	await sendRequest({ method: 'GET', url: PROTOCOL + '://' + HOST() + '/api/scrapeItemNames', headers: { sectionId } });
const changeScrapingSection = async (currentSectionId) =>
	await sendRequest({ method: 'POST', url: PROTOCOL + '://' + HOST() + '/api/changeScrapingSection', body: { currentSectionId } });
const scrapeNextItem = async (sectionId, nextIndex) =>
	await sendRequest({ method: 'POST', url: PROTOCOL + '://' + HOST() + '/api/scrapeNextItem', body: { sectionId, nextIndex } });
const subscribe = async (email) => await sendRequest({ method: 'POST', url: PROTOCOL + '://' + HOST() + '/api/subscribe', body: { email } });
const getRubberQuestions = async () => await sendRequest({ method: 'GET', url: PROTOCOL + '://' + HOST() + '/api/getRubberQuestions' });
const doRubberWizzard = async (answers) => await sendRequest({ method: 'POST', url: PROTOCOL + '://' + HOST() + '/api/doRubberWizzard', body: { answers } });
const rateRubberWizzardResults = async (wizzardId, ratings) =>
	await sendRequest({ method: 'POST', url: PROTOCOL + '://' + HOST() + '/api/rateRubberWizzardResults', body: { wizzardId, ratings } });
const track = async (name, properties, browserId) =>
	await sendRequest({ method: 'POST', url: PROTOCOL + '://' + HOST() + '/api/track', body: { name, properties, browserId } });
const getUsageData = async (timestampStart, timestampEnd) =>
	await sendRequest({ method: 'GET', url: PROTOCOL + '://' + HOST() + '/api/getUsageData', headers: { timestampStart, timestampEnd } });

export {
	startScraping,
	scrapeItemNames,
	changeScrapingSection,
	scrapeNextItem,
	subscribe,
	getRubberQuestions,
	doRubberWizzard,
	rateRubberWizzardResults,
	track,
	getUsageData,
};
