import { connect, disconnect, getDb, convertToObjectId } from '../services/mongodb';

const getAllSections = async () => {
	await connect(process.env.MONGODB_USERNAME, process.env.MONGODB_USERPASSWORD, process.env.MONGODB_CLUSTERLINK, process.env.MONGODB_DBNAME);
	const rubberSections = await getDb().collection('RubberSections').find().toArray();
	await disconnect();
	return rubberSections;
};

const getSection = async (sectionId) => {
	await connect(process.env.MONGODB_USERNAME, process.env.MONGODB_USERPASSWORD, process.env.MONGODB_CLUSTERLINK, process.env.MONGODB_DBNAME);
	const section = await getDb()
		.collection('RubberSections')
		.findOne({ _id: convertToObjectId(sectionId) });
	await disconnect();
	return section;
};

// NOTE: this only works for exactly two sections
const switchSection = async (currentSectionId) => {
	const sections = await getAllSections();
	const newSection = sections.find((section) => section._id.toString() !== currentSectionId);
	return newSection;
};

export { getAllSections, getSection, switchSection };
