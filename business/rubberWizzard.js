import { connect, disconnect, getDb, convertToObjectId } from '../services/mongodb';

const getCategories = async () => {
	await connect(process.env.MONGODB_USERNAME, process.env.MONGODB_USERPASSWORD, process.env.MONGODB_CLUSTERLINK, process.env.MONGODB_DBNAME);
	const rubberQuestionCategories = await getDb().collection('RubberQuestionCategories').find().toArray();
	await disconnect();
	return rubberQuestionCategories;
};

const getQuestions = async () => {
	await connect(process.env.MONGODB_USERNAME, process.env.MONGODB_USERPASSWORD, process.env.MONGODB_CLUSTERLINK, process.env.MONGODB_DBNAME);
	const rubberQuestions = await getDb().collection('RubberQuestions').find().toArray();
	await disconnect();
	return rubberQuestions.map((question) => ({
		id: question.id,
		text: question.text,
		answers: question.answers.map((answer) => ({ id: answer.id, text: answer.text, nextQuestion: answer.nextQuestion })),
	}));
};

const createWizzard = async (answers) => {
	await connect(process.env.MONGODB_USERNAME, process.env.MONGODB_USERPASSWORD, process.env.MONGODB_CLUSTERLINK, process.env.MONGODB_DBNAME);
	const newWizzard = await getDb().collection('RubberResults').insertOne({ timestamp: Date.now(), answers });
	const wizzardId = newWizzard.insertedId;
	await disconnect();
	return wizzardId;
};

const calculateResults = async (wizzardId, answers) => {
	await connect(process.env.MONGODB_USERNAME, process.env.MONGODB_USERPASSWORD, process.env.MONGODB_CLUSTERLINK, process.env.MONGODB_DBNAME);
	// define wizzardValues object
	let wizzardValues = {
		speed_min: [],
		speed_max: [],
		spin_min: [],
		spin_max: [],
		control_min: [],
		control_max: [],
		weight_min: [],
		weight_max: [],
		spongeHardness_min: [],
		spongeHardness_max: [],
		throwAngle_min: [],
		throwAngle_max: [],
		gears_min: [],
		gears_max: [],
		deception_min: [],
		deception_max: [],
		reversal_min: [],
		reversal_max: [],
		tackiness_min: [],
		tackiness_max: [],
	};
	// load questions
	const rubberQuestions = await getDb().collection('RubberQuestions').find().toArray();
	// for each answer
	answers.forEach((answer) => {
		// save values of answer to wizzardValues object
		let answerWithData;
		rubberQuestions.forEach((question) => {
			question.answers.forEach((qAnswer) => {
				if (qAnswer.id === answer) {
					answerWithData = qAnswer;
				}
			});
		});
		Object.keys(answerWithData).forEach((key) => {
			if (wizzardValues[key] && answerWithData[key] !== -1) {
				wizzardValues[key].push(answerWithData[key]);
			}
		});
	});
	// calculate highest minimums and lowest maximums from wizzardValues object
	Object.keys(wizzardValues).forEach((key) => {
		if (key.includes('_min')) {
			wizzardValues[key] = Math.max(...wizzardValues[key]);
		} else if (key.includes('_max')) {
			wizzardValues[key] = Math.min(...wizzardValues[key]);
		}
	});
	console.log('wizzardValues: ', wizzardValues);
	// load rubbers
	let rubbers = await getDb().collection('Rubber').find().toArray();
	// add errorpoints value to rubbers which is the sum of all mismatches with the ranges defined in wizzardValues
	rubbers = rubbers.map((rubber) => {
		let errorpoints = 0;
		Object.keys(wizzardValues).forEach((key) => {
			if (key.includes('_min') && wizzardValues[key] >= 0) {
				if (rubber[key.split('_')[0]] < wizzardValues[key]) {
					errorpoints += wizzardValues[key] - rubber[key.split('_')[0]];
				}
			} else if (key.includes('_max') && wizzardValues[key] <= 10) {
				if (rubber[key.split('_')[0]] > wizzardValues[key]) {
					errorpoints += rubber[key.split('_')[0]] - wizzardValues[key];
				}
			}
		});
		rubber.errorpoints = errorpoints;
		return rubber;
	});
	// get all ratings for each rubber within old wizards with same answer array
	const oldWizzards = await getDb().collection('RubberResults').find({ answers }).toArray();
	let ratedRubbers = [];
	oldWizzards.forEach((wizzard) => {
		if (wizzard.results && wizzard.ratings) {
			wizzard.results.forEach((rubber, index) => {
				if (ratedRubbers.find((ratedRubber) => ratedRubber.id === rubber)) {
					ratedRubbers.find((ratedRubber) => ratedRubber.id === rubber).ratings.push(wizzard.ratings[index]);
				} else {
					ratedRubbers.push({
						id: rubber,
						ratings: [wizzard.ratings[index]],
					});
				}
			});
		}
	});
	// calculate average rating for each rubber
	ratedRubbers = ratedRubbers.map((rubber) => {
		rubber.rating = rubber.ratings.reduce((a, b) => a + b, 0) / rubber.ratings.length;
		return rubber;
	});
	// update errorpints for each rubber with the current errorpints + (5 - average rating)
	rubbers = rubbers.map((rubber) => {
		if (ratedRubbers.find((ratedRubber) => ratedRubber.id === rubber._id.toString())) {
			rubber.errorpoints += 5 - ratedRubbers.find((ratedRubber) => ratedRubber.id === rubber._id.toString()).rating;
		}
		return rubber;
	});
	// add sum of speed, spin and control to each rubber
	rubbers = rubbers.map((rubber) => ({
		...rubber,
		skillpoints: rubber.speed + rubber.spin + rubber.control,
	}));
	// sort rubber first ascending by errorpoints and then descending by skillpoints
	rubbers = rubbers.sort((a, b) => {
		if (a.errorpoints < b.errorpoints) {
			return -1;
		} else if (a.errorpoints > b.errorpoints) {
			return 1;
		} else if (a.skillpoints < b.skillpoints) {
			return 1;
		} else if (a.skillpoints > b.skillpoints) {
			return -1;
		} else {
			return 0;
		}
	});
	// limit rubbers array of first three
	rubbers = rubbers.slice(0, 3);
	// save first 3 rubbers to wizzard
	await getDb()
		.collection('RubberResults')
		.updateOne({ _id: convertToObjectId(wizzardId) }, { $set: { results: rubbers.map((rubber) => rubber._id.toString()) } });
	// disconnect
	await disconnect();
	// return first 3 rubbers
	return rubbers.map((rubber) => ({
		id: rubber._id.toString(),
		name: rubber.name,
		url: rubber.url,
		picture: rubber.picture,
		type: rubber.type ? rubber.type : 'rubber',
	}));
};

const rateResults = async (wizzardId, ratings) => {
	await connect(process.env.MONGODB_USERNAME, process.env.MONGODB_USERPASSWORD, process.env.MONGODB_CLUSTERLINK, process.env.MONGODB_DBNAME);
	await getDb()
		.collection('RubberResults')
		.updateOne({ _id: convertToObjectId(wizzardId) }, { $set: { ratings } });
	await disconnect();
	return null;
};

export { getCategories, getQuestions, createWizzard, calculateResults, rateResults };
