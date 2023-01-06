import React, { useState } from 'react';
import { getMyStyle } from './UsageChart.style.js';
import useStyle from '../hooks/useStyle';
import { getTimestamp, getDate, oneDayInMilliseconds } from '../basics/timedate';
import DatePicker from 'react-datepicker';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Component = ({ triggerFetch, data }) => {
	const { style } = useStyle(getMyStyle);

	const [timestampStart, setTimestampStart] = useState(Date.now() - oneDayInMilliseconds);
	const [timestampEnd, setTimestampEnd] = useState(Date.now());

	const colors = ['red', 'blue', 'green', 'yellow', 'pink', 'gray'];
	const getColorOfIndex = (index) => (index < colors.length ? colors[index] : 'black');
	const assignColorsToDatasets = (datasets) =>
		datasets.map((dataset, index) => ({ ...dataset, borderColor: getColorOfIndex(index), backgroundColor: getColorOfIndex(index) }));
	const coloredDatasets = assignColorsToDatasets(data.datasets);

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'bottom',
			},
		},
	};

	return (
		<>
			<div style={style.timefilterContainer}>
				<DatePicker selected={getDate(timestampStart)} onChange={(date) => setTimestampStart(getTimestamp(date))} />
				<DatePicker selected={getDate(timestampEnd)} onChange={(date) => setTimestampEnd(getTimestamp(date))} />
				<button style={style.loadButton} onClick={() => triggerFetch(timestampStart, timestampEnd)}>
					Load
				</button>
			</div>
			<Line options={options} data={{ labels: data.labels, datasets: coloredDatasets }} />
		</>
	);
};

export default Component;
