const getUtfIndexOfChar = (ch) => ch.charCodeAt(0);

const getCharOfUtfIndex = (ind) => String.fromCharCode(ind);

const isString = (x) => Object.prototype.toString.call(x) === '[object String]';

const getOccurencesOfSubstring = (string, subString, allowOverlapping) => {
	string += '';
	subString += '';
	if (subString.length <= 0) return string.length + 1;

	var n = 0,
		pos = 0,
		step = allowOverlapping ? 1 : subString.length;

	while (true) {
		pos = string.indexOf(subString, pos);
		if (pos >= 0) {
			++n;
			pos += step;
		} else break;
	}
	return n;
};

const replaceAllSubstringsInString = (string, search, replacement) => string.split(search).join(replacement);

export { getUtfIndexOfChar, getCharOfUtfIndex, isString, getOccurencesOfSubstring, replaceAllSubstringsInString };
