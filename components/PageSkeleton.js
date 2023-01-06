import React from 'react';

import SEO from './SEO';
import Header from './Header';
import Footer from './Footer';
import PageContent from './PageContent';

import { getMyStyle } from './PageSkeleton.style.js';
import useStyle from '../hooks/useStyle';

import seo from '../config/seo.json';

const Component = ({ route, children, texts }) => {
	const { style } = useStyle(getMyStyle);
	return (
		<>
			<style jsx global>{`
				body {
					margin: 0;
				}
			`}</style>
			<div style={style.container}>
				<SEO url={seo.url} title={seo.title} description={seo.description} />
				<Header route={route} />
				<PageContent>{children}</PageContent>
				<Footer route={route} texts={texts} />
			</div>
		</>
	);
};

export default Component;
