import { createWizzard, calculateResults } from '../business/rubberWizzard';

const handler = async (answers) => {
	const wizzardId = await createWizzard(answers);
	const results = await calculateResults(wizzardId, answers);
	const result = { wizzardId, results };
	return result;
};

export default handler;
