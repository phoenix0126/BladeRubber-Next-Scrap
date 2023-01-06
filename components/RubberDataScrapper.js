import React, { useState } from 'react';
import { changeScrapingSection, scrapeNextItem, startScraping, scrapeItemNames } from '../fetchers/api';
import { load, save } from '../basics/localStorage';

import { getMyStyle } from "./RubberDataScrapper.style";

import useStyle from "../hooks/useStyle";

const Component = ({texts}) => {
  const { style } = useStyle(getMyStyle);
	const [isScraping, setIsScraping] = useState(false);
	const [scrapedItems, setScrapedItems] = useState([]);

	const addNewestItemToScrapedItems = (scrapedItem) => {
		setScrapedItems((scrapedItems) => [...scrapedItems, scrapedItem]);
	};

	const scrape = async () => {
		if (!isScraping) {
			setIsScraping(true);
			setScrapedItems([]);
			save('bladerubber-scraping', 'true');
			const sections = await startScraping();

			for (let i = 0; i < sections.length; i++) {
				const { newSectionId } = await changeScrapingSection(sections[i]._id.toString());

				let { amountOfSectionItems } = await scrapeItemNames(newSectionId);

				for (let currentIndex = 0; currentIndex < amountOfSectionItems; currentIndex++) {
					if (load('bladerubber-scraping') == 'true') {
						const { scrapedItem } = await scrapeNextItem(newSectionId, currentIndex);
						addNewestItemToScrapedItems(scrapedItem);
					} else break;
				}
				if (load('bladerubber-scraping') == 'false') break;
			}
			setIsScraping(false);
		} else {
			save('bladerubber-scraping', 'false');
			setIsScraping(false);
		}
	};

	return (
		<>
			<h1>{texts['scrape-data-title']}</h1>
			<button style={style.scrapeBtn} onClick={() => scrape()}>
				{isScraping === false ? texts['scraping-start'] : texts['scraping-pause']}
			</button>
			<ul>
				<p>{isScraping && texts['scraping-status']}</p>
				<p>{texts['scraped-subtitle']}</p>
				<ul>
					{scrapedItems.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</ul>
		</>
	);
};

export default Component;
