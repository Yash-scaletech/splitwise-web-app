import React from 'react';
import { Route, Routes } from 'react-router-dom';

import 'assets/styles/app.scss';

import Layout from 'hoc/layout/layout';
import ExpenseList from 'features/dashboard/component/expenseList';
import AddExpense from 'features/dashboard/component/addExpense';
import SettledExpenseList from 'features/dashboard/component/settledExpenseList';
import WelcomeScreen from 'features/dashboard/component/welcomeScreen';

const App: React.FC = () => {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<WelcomeScreen />} />
				<Route path="/expense-list" element={<ExpenseList />} />
				<Route path="/add-expense" element={<AddExpense />} />
				<Route path="/settled-expenses" element={<SettledExpenseList />} />
			</Routes>
		</Layout>
	);
};

export default App;
