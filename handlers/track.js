import { track } from '../business/tracking';

const handler = async (name, properties, browserId) => {
	return await track(name, properties, browserId);
};

export default handler;
