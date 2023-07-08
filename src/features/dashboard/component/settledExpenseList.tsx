import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { IExpense } from '../interface/dashboard';

import '../style/dashboard.scss';

const SettledExpenseList = () => {
	const [settledExpenses, setSettledExpenses] = useState<IExpense[]>([]);

	useEffect(() => {
		// Retrieve settled expenses data from localStorage
		const storedSettleExpenses = localStorage.getItem('settleExpenses');
		if (storedSettleExpenses) {
			setSettledExpenses(JSON.parse(storedSettleExpenses));
		}
	}, []);

	return (
		<div className="settled-expense-list">
			<h1>Settled Expenses</h1>
			{settledExpenses.map((expense, index) => (
				<div className="expense" key={index}>
					<p>{expense.description}</p>
					<p>Amount: {expense.amount}</p>
					<p>Paid By: {expense.paidBy}</p>
					<p>Participants: {expense.participants.join(', ')}</p>
					<p>Settled</p>
				</div>
			))}
			<Link to="/expense-list">Back to Expense List</Link>
		</div>
	);
};

export default SettledExpenseList;
