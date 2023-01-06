import { connect, disconnect } from '../services/mongodb';
import { rateResults } from '../business/rubberWizzard';

const handler = async (wizzardId, ratings) => {
	await connect(process.env.MONGODB_USERNAME, process.env.MONGODB_USERPASSWORD, process.env.MONGODB_CLUSTERLINK, process.env.MONGODB_DBNAME);
	await rateResults(wizzardId, ratings);
	await disconnect();
	const result = {};
	return result;
};

export default handler;
