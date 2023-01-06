import { MongoClient, ObjectId } from 'mongodb';

let client;
let db;

const connect = async (userName, userPassword, cluster, dbName) => {
	try {
		const mongoDbURI = `mongodb+srv://${userName}:${userPassword}@${cluster}.mongodb.net/test?retryWrites=true&w=majority`;
		client = new MongoClient(mongoDbURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		await client.connect();
		db = client.db(dbName);
	} catch (error) {
		console.log(error);
	}
};

const disconnect = async () => {
	db = null;
	client.close();
};

const getDb = () => db;

const convertToObjectId = (str) => ObjectId(str);

export { connect, disconnect, getDb, convertToObjectId };
