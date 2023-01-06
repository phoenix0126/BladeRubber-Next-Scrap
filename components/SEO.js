import React from 'react';
import Head from 'next/head';

const Component = (props) => {
	const { url, title, description } = props;
	return (
		<Head>
			<title>{title}</title>
			<link rel="icon" href="/favicon.ico" />
			<link rel="shortcut icon" href="/favicon.ico" />
			<link rel="apple-touch-icon" href="/favicon.ico" />
			<meta name="description" content={description} />
			<meta itemprop="name" content={title} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={url} />
			<meta property="og:type" content="website" />
		</Head>
	);
};

export default Component;
