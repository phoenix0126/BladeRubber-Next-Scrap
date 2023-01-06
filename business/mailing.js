import { connect, disconnect, getDb } from '../services/mongodb';

const subscribe = async (email) => {
	await connect(process.env.MONGODB_USERNAME, process.env.MONGODB_USERPASSWORD, process.env.MONGODB_CLUSTERLINK, process.env.MONGODB_DBNAME);
	await getDb().collection('Subscribers').insertOne({ email });
	await disconnect();
};

export { subscribe };
