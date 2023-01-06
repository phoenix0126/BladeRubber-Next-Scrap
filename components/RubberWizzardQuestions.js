import React, { useState, useCallback, useEffect } from 'react';
import { getMyStyle } from './RubberWizzardQuestions.style.js';
import useStyle from '../hooks/useStyle';
import RubberWizzardContentBox from './RubberWizzardContentBox';
import { detect } from '../basics/language.js';
import { supportedLanguages, defaultLanguage } from '../business/locales.js';

const Component = ({ rubberQuestions, calculateResults, texts }) => {
	const { style } = useStyle(getMyStyle);

	const [language, setLanguage] = useState('en');

	useEffect(() => {
		console.log(detect(supportedLanguages, defaultLanguage));
		setLanguage(detect(supportedLanguages, defaultLanguage));
	}, []);

	const [questionCounter, setQuestionCounter] = useState(1);
	const [currentQuestion, setCurrentQuestion] = useState('q1');

	const [answers, setAnswers] = useState([]);

	const answerQuestion = useCallback(
		(answer) => {
			const newAnswers = answers.concat([answer]);
			setAnswers(newAnswers);
			const nextQuestion = rubberQuestions.find((question) => question.id === currentQuestion).answers.find((ans) => ans.id === answer).nextQuestion;
			if (nextQuestion === '-') {
				calculateResults(newAnswers);
				setCurrentQuestion('q1');
			} else {
				setCurrentQuestion(nextQuestion);
			}
			setQuestionCounter(questionCounter + 1);
		},
		[currentQuestion, rubberQuestions, answers, setCurrentQuestion, setAnswers, questionCounter, calculateResults]
	);

	return (
		<RubberWizzardContentBox
			title={texts['rubber-wizzard-question-title'] + questionCounter}
			content={
				<>
					<p style={style.question}>{rubberQuestions?.find((question) => question.id === currentQuestion)?.text[language]}</p>
					<div style={style.answersContainer}>
						{rubberQuestions
							?.find((question) => question.id === currentQuestion)
							?.answers.map((answer) => (
								<div style={style.answerContainer} key={'answer ' + answer.id} onClick={() => answerQuestion(answer.id)}>
									<img style={style.ball} src="/ball.png" />
									<p style={style.answerLabel}>{answer.text[language]}</p>
								</div>
							))}
					</div>
				</>
			}
			button={<></>}
		/>
	);
};

export default Component;
