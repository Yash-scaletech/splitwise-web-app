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
		<div className="settled-expense-list flex flex--column align-items--center text--center padding--20">
			<h1 className="font-size--32 mb--20">Settled Expenses</h1>
			<Link
				to="/expense-list"
				className="back-link text--white font-size--browser-default pointer border-radius--sm mt--20"
			>
				Back to Expense List
			</Link>
			{settledExpenses.length > 0 ? (
				settledExpenses.map((expense, index) => (
					<div className="expense text--left mb--10 padding--10" key={index}>
						<p className="mt--5 mb--5">{expense.description}</p>
						<p className="mt--5 mb--5">Amount: {expense.amount}</p>
						<p className="mt--5 mb--5">Paid By: {expense.paidBy}</p>
						<p className="mt--5 mb--5">Participants: {expense.participants.join(', ')}</p>
						<p className="mt--5 mb--5">Settled</p>
					</div>
				))
			) : (
				<p className="no-settled-expenses-message mt--20">No settled expenses yet.</p>
			)}
		</div>
	);
};

export default SettledExpenseList;
