import React, { useState } from 'react';
import { getMyStyle } from './Subscription.style.js';
import useStyle from '../hooks/useStyle';
import ContentBox from '../components/ContentBox';
import TextInput from '../components/TextInput';
import FormButton from '../components/FormButton';
import { subscribe } from '../fetchers/api';

const Component = ({ texts }) => {
	const [email, setEmail] = useState('');
	const [isSubscribing, setIsSubscribing] = useState(false);
	const { style } = useStyle(getMyStyle);

	const subscribeToUpdates = async () => {
		setIsSubscribing(true);
		if (email.length > 0) {
			await subscribe(email);
			alert(texts['subscription-success']);
		} else {
			alert(texts['subscription-error']);
		}
		setIsSubscribing(false);
	};

	return (
		<ContentBox title={texts['subscription-title']}>
			<div style={style.contentContainer}>
				<p style={style.infoText}>{texts['subscription-text']}</p>
				<p style={style.subscribeContainer}>
					<TextInput type="email" placeholder="E-Mail" fixedWidth="220px" value={email} setValue={setEmail} />
					<FormButton onClick={subscribeToUpdates} label={texts['subscription-button']} loading={isSubscribing} />
				</p>
			</div>
		</ContentBox>
	);
};

export default Component;
