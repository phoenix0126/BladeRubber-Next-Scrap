import React, { useState, useEffect, useCallback } from 'react';
import RubberWizzardAd from './RubberWizzardAd';
import RubberWizzardHint from './RubberWizzardHint';
import RubberWizzardQuestions from './RubberWizzardQuestions';
import RubberWizzardResults from './RubberWizzardResults';
import { doRubberWizzard, getRubberQuestions } from '../fetchers/api.js';

const Component = ({ texts, track }) => {
	const [mode, setMode] = useState('loading');

	const [rubberQuestions, setRubberQuestions] = useState([]);
	const [id, setId] = useState('');
	const [results, setResults] = useState([]);

	useEffect(() => {
		const loadQuestions = async () => {
			const newQuestions = (await getRubberQuestions()).questions;
			if (newQuestions) {
				setRubberQuestions(newQuestions);
				setMode('hint');
			}
		};

		if (rubberQuestions.length === 0) {
			loadQuestions();
		}
	}, [rubberQuestions]);

	const calculateResults = useCallback(async (answers) => {
		setMode('loading');
		const { wizzardId, results } = await doRubberWizzard(answers);
		setId(wizzardId);
		setResults(results);
		setMode('results');
		track('rubberwizzard_results', { wizzardId, answers, results });
	}, []);

	return (
		<>
			{mode === 'loading' && <RubberWizzardAd texts={texts} />}
			{mode === 'hint' && <RubberWizzardHint setMode={setMode} texts={texts} />}
			{mode === 'wizzard' && <RubberWizzardQuestions rubberQuestions={rubberQuestions} calculateResults={calculateResults} texts={texts} />}
			{mode === 'results' && <RubberWizzardResults results={results} wizzardId={id} texts={texts} />}
		</>
	);
};

export default Component;
