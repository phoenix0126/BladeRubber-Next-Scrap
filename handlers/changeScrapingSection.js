import { switchSection } from '../business/rubberSections';

const handler = async (currentSectionId) => {
	const newSection = await switchSection(currentSectionId);
	const result = { newSectionId: newSection._id.toString() };
	return result;
};

export default handler;
