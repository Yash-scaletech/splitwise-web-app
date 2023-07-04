import React from 'react';
import { Route, Routes } from 'react-router-dom';

import 'assets/styles/app.scss';

import Layout from 'hoc/layout/layout';
import Dashboard from 'features/dashboard/component/dashboard';

const App: React.FC = () => {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Dashboard />} />
			</Routes>
		</Layout>
	);
};

export default App;
