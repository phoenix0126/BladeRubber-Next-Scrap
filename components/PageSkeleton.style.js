const getMyStyle = () => ({
	container: {
		backgroundImage: "url('/background_new.png')",
		backgroundSize: '50vh 100%',
		backgroundRepeat: 'repeat',
		backgroundAttachment: 'inherit',
		width: '100%',
		height: '100%',
		minHeight: '100vh',
		padding: '0px',
		margin: '0px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
});

module.exports = {
	getMyStyle,
};
