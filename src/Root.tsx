import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import store from './store';

import WithErrorHandler from 'hoc/withErrorHandler/withErrorHandler';
import i18n from 'shared/util/localization';
import ErrorBoundary from 'shared/components/errorBoundary/errorBoundary';

const Root: React.FC = (props) => {
	return (
		<I18nextProvider i18n={i18n}>
			<Provider store={store}>
				<WithErrorHandler />
				<ErrorBoundary>
					<div className="app-main">
						<BrowserRouter>
							<App {...props} />
						</BrowserRouter>
					</div>
				</ErrorBoundary>
			</Provider>
		</I18nextProvider>
	);
};

export default Root;
