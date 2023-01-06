// ToDo

import { sendRequest } from '../basics/http';
import { getTextsInsideOfHtmlElements, getAttributeOfFirstHtmlElementInClass, getAttributesOfHtmlElements } from '../basics/html';
import { replaceAllSubstringsInString, getUtfIndexOfChar } from '../basics/text';
import { disconnect, connect, getDb } from '../services/mongodb';

const settings = require('../config/scrapeSettings.json');
const allFields = ['speed', 'spin', 'control', 'tackiness', 'gears', 'deception', 'reversal', 'weight', 'spongeHardness', 'throwAngle'];

const saveUserRatings = async (catchedElement) => {
	console.log('catched: ' + catchedElement);
	await connect(process.env.MONGODB_USERNAME, process.env.MONGODB_USERPASSWORD, process.env.MONGODB_CLUSTERLINK, process.env.MONGODB_DBNAME);

	if ((await getDb().collection('Rubber').findOne({ name: catchedElement.name })) === null) {
		await getDb().collection('Rubber').insertOne(catchedElement);
	} else {
		await getDb().collection('Rubber').updateOne({ name: catchedElement.name }, { $set: catchedElement });
	}

	await disconnect();
};

const convertValues = async (catchedElement) => {
	allFields.forEach((field) => {
		if (catchedElement[field] !== undefined) {
			catchedElement[field] = parseFloat(catchedElement[field]);
		}
	});
	await saveUserRatings(catchedElement);
};

const deleteUnnecessaryFields = async (catchedElement) => {
	delete catchedElement.consistency;
	delete catchedElement.durability;
	delete catchedElement.overall;
	delete catchedElement.tensor;
	delete catchedElement.anti;
	await convertValues(catchedElement);
};

const addMissingFields = async (catchedElement) => {
	allFields.forEach((field) => {
		if (catchedElement[field] === undefined) {
			catchedElement[field] = 0;
		}
	});
	await deleteUnnecessaryFields(catchedElement);
};

const checkIfRatedByEnoughUsers = async (section, catchedElement) => {
	let htmlContent = await sendRequest({ method: 'GET', url: 'https://revspin.net/' + section + '/' + catchedElement.name + '.html', returnType: 'text' });
	const amountOfRatings = getTextsInsideOfHtmlElements(htmlContent, '.count')[0];
	if (amountOfRatings > settings.minimumAmountOfRatings) {
		await addMissingFields(catchedElement);
	}
};

const nullifyNonRatedValues = async (section, catchedElement) => {
	Object.keys(catchedElement).forEach((key) => {
		if (catchedElement[key].includes('(notrated)')) {
			catchedElement[key] = 0;
		}
	});
	await checkIfRatedByEnoughUsers(section, catchedElement);
};

const scrapeOne = async (section, name) => {
	let url = 'https://revspin.net/' + section + '/' + name + '.html';
	let htmlContent = await sendRequest({ method: 'GET', url, returnType: 'text' });
	let labels = getTextsInsideOfHtmlElements(htmlContent, '.cell_label');
	for (var j = 0; j < labels.length; j++) {
		labels[j] = replaceAllSubstringsInString(labels[j], '\n', '');
		labels[j] = replaceAllSubstringsInString(labels[j], '\t', '');
		labels[j] = replaceAllSubstringsInString(labels[j], ' ', '');
		labels[j] = labels[j].charAt(0).toLowerCase() + labels[j].slice(1);
	}
	let values = getTextsInsideOfHtmlElements(htmlContent, '.cell_rating');
	for (var m = 0; m < values.length; m++) {
		values[m] = replaceAllSubstringsInString(values[m], '\n', '');
		values[m] = replaceAllSubstringsInString(values[m], '\t', '');
		values[m] = replaceAllSubstringsInString(values[m], ' ', '');
		let temp = '';
		for (var i = 0; i < values[m].length; i++) {
			if (getUtfIndexOfChar(values[m].charAt(i)) !== 160) {
				temp += values[m].charAt(i);
			}
		}
		values[m] = temp;
	}

	var catchedElement = {};
	catchedElement['name'] = name;
	catchedElement['url'] = url;
	for (var z = 0; z < values.length; z++) {
		if (!(labels[z] in catchedElement)) {
			catchedElement[labels[z]] = values[z];
		}
	}
	try {
		catchedElement.picture = 'https://revspin.net' + getAttributeOfFirstHtmlElementInClass(htmlContent, '.product_detail_image', 'src');
	} catch {
		catchedElement.picture = '';
	}

	await nullifyNonRatedValues(section, catchedElement);
};

const saveNames = async (section, nameList) => {
	await connect(process.env.MONGODB_USERNAME, process.env.MONGODB_USERPASSWORD, process.env.MONGODB_CLUSTERLINK, process.env.MONGODB_DBNAME);

	if ((await getDb().collection('RubberSections').findOne({ name: section })) === null) {
		await getDb().collection('RubberSections').insertOne({ name: section, names: nameList });
	} else {
		await getDb()
			.collection('RubberSections')
			.updateOne({ name: section }, { $set: { names: nameList } });
	}

	await disconnect();

	return nameList.length;
};

const filterNamesByBrand = async (section, nameList) => {
	var newNameList = [];
	for (var i = 0; i < nameList.length; i++) {
		for (var j = 0; j < settings.listOfBrands.length; j++) {
			if (nameList[i].includes(settings.listOfBrands[j])) {
				newNameList[newNameList.length] = nameList[i];
			}
		}
	}

	return await saveNames(section, nameList);
};

const scrapeNames = async (section) => {
	const htmlContent = await sendRequest({ method: 'GET', url: 'https://revspin.net/' + section + '/', returnType: 'text' });
	const links = getAttributesOfHtmlElements(htmlContent, '.cell_name > a', 'href');
	let nameList = [];
	for (var i = 0; i < links.length; i++) {
		nameList[i] = links[i].split('/')[1].split('.')[0];
	}

	return await filterNamesByBrand(section, nameList);
};

export { scrapeOne, scrapeNames };
