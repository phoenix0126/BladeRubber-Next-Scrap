import { connect, disconnect, getDb } from '../services/mongodb';

const track = async (name, properties, browserId) => {
	await connect(process.env.MONGODB_USERNAME, process.env.MONGODB_USERPASSWORD, process.env.MONGODB_CLUSTERLINK, process.env.MONGODB_DBNAME);
	await getDb().collection('Events').insertOne({
		name,
		timestamp: Date.now(),
		properties,
		browser: browserId,
	});
	await disconnect();
	return {};
};

export { track };
