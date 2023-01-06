const sendRequest = async ({ method, url, headers = null, body = null, returnType = 'json' }) => {
	try {
		let requestOptions = {
			method,
			headers: {
				'Content-Type': 'application/json',
				...headers,
			},
		};
		if (body !== null) {
			requestOptions['body'] = JSON.stringify(body);
		}

		const res = await fetch(url, requestOptions);
		let processedRes;
		if (returnType === 'json') {
			processedRes = await res.json();
		} else if (returnType === 'text') {
			processedRes = await res.text();
		}

		return processedRes;
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
};

export { sendRequest };
