import React, { useState } from 'react';
import UsageChart from '../components/UsageChart';
import { getUsageData } from '../fetchers/api';

const Page = ({}) => {
	const [usageData, setUsageData] = useState({ labels: [], datasets: [] });

	const fetchUsageData = async (timestampStart, timestampEnd) => {
		const { labels, datasets } = await getUsageData(timestampStart, timestampEnd);
		setUsageData({ labels, datasets });
	};

	return (
		<>
			<UsageChart triggerFetch={fetchUsageData} data={usageData} />
		</>
	);
};

export default Page;
