import cheerio from 'cheerio';

const getTextsInsideOfHtmlElements = (html, cssSelector) => {
	const $ = cheerio.load(html);
	var texts = [];
	var elements = $(cssSelector);
	for (var i = 0; i < elements.length; i++) {
		for (var j = 0; j < elements[i].children.length; j++) {
			if (elements[i].children[j].data !== undefined) {
				texts[i] = elements[i].children[j].data;
				break;
			}
		}
	}
	return texts;
};

const getAttributeOfFirstHtmlElementInClass = (html, cssSelector, attribute) => {
	const $ = cheerio.load(html);
	const element = $(cssSelector)[0];
	const value = element.attribs[attribute];
	return value;
};

const getAttributesOfHtmlElements = (html, cssSelector, attribute) => {
	const $ = cheerio.load(html);
	var attributes = [];
	var elements = $(cssSelector);
	for (var i = 0; i < elements.length; i++) {
		attributes[i] = elements[i].attribs[attribute];
	}
	return attributes;
};

export { getTextsInsideOfHtmlElements, getAttributeOfFirstHtmlElementInClass, getAttributesOfHtmlElements };
