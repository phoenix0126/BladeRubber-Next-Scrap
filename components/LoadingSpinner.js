import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { ThreeDots } from 'react-loader-spinner';

const Component = ({ color }) => {
	return <ThreeDots color={color} height={20} width={20} />;
};

export default Component;
