import { subscribe } from '../business/mailing';

const handler = async (email) => {
	await subscribe(email);
	const result = {};
	return result;
};

export default handler;
