import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

const rootEl = document.getElementById('app-fb') as HTMLElement;

// Create a reusable render method that we can call more than once
const render = (Component: React.FC) => {
	ReactDOM.render(
		<React.StrictMode>
			<Component />
		</React.StrictMode>,
		rootEl
	);
};

render(Root);
