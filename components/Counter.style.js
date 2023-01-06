const template = require('../config/styles.json');

const getMyStyle = () => ({
	link: {
		color: template.colors.red,
	},
});

module.exports = {
	getMyStyle,
};
