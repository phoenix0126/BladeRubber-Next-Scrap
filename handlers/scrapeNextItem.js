import { scrapeOne } from '../business/revspin';
import { getSection } from '../business/rubberSections';

const handler = async (sectionId, nextIndex) => {
	const currentSection = await getSection(sectionId);
	console.log('scrape rubber ' + currentSection.itemNames[nextIndex] + ' from ' + currentSection.name);
	await scrapeOne(currentSection.name, currentSection.itemNames[nextIndex]);
	const result = { scrapedItem: currentSection.itemNames[nextIndex] + ' as ' + nextIndex + ' from ' + currentSection.name };
	return result;
};

export default handler;
