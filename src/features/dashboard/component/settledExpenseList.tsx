import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { IExpense } from '../interface/dashboard';

import '../style/dashboard.scss';

const SettledExpenseList = () => {
	const [settledExpenses, setSettledExpenses] = useState<IExpense[]>([]);

	useEffect(() => {
		const storedSettleExpenses = localStorage.getItem('settleExpenses');
		if (storedSettleExpenses) {
			setSettledExpenses(JSON.parse(storedSettleExpenses));
		}
	}, []);

	return (
		<div className="settled-expense-list">
			<h1>Settled Expenses</h1>
			{settledExpenses.length > 0 ? (
				settledExpenses.map((expense, index) => (
					<div className="expense" key={index}>
						<p>{expense.description}</p>
						<p>Amount: {expense.amount}</p>
						<p>Paid By: {expense.paidBy}</p>
						<p>Participants: {expense.participants.join(', ')}</p>
						<p>Settled</p>
					</div>
				))
			) : (
				<p className="no-settled-expenses-message">No settled expenses yet.</p>
			)}
			<Link to="/expense-list" className="back-link">
				Back to Expense List
			</Link>
		</div>
	);
};

export default SettledExpenseList;
