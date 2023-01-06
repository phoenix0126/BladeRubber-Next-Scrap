import { getAllSections } from '../business/rubberSections';

const handler = async () => {
	const rubberSections = await getAllSections();
	return rubberSections;
};

export default handler;
