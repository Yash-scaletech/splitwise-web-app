import React from 'react';
import { Route, Routes } from 'react-router-dom';

import 'assets/styles/app.scss';

import Layout from 'hoc/layout/layout';
import ExpenseList from 'features/dashboard/component/expenseList';
import AddExpense from 'features/dashboard/component/addExpense';

const App: React.FC = () => {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<ExpenseList />} />
				<Route path="/add-expense" element={<AddExpense />} />
			</Routes>
		</Layout>
	);
};

export default App;
