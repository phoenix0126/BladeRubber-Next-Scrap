import { getCategories, getQuestions } from '../business/rubberWizzard';

const handler = async () => {
	const rubberQuestions = await getQuestions();
	const result = { questions: rubberQuestions };
	return result;
};

export default handler;
