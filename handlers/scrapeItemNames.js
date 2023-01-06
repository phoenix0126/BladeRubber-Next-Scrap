import { scrapeNames } from '../business/revspin';
import { getSection } from '../business/rubberSections';

const handler = async (sectionId) => {
	const section = await getSection(sectionId);
	const { name } = section;
	const amountOfSectionItems = await scrapeNames(name);
	const result = { amountOfSectionItems };
	return result;
};

export default handler;
