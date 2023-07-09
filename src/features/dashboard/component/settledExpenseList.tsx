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
			<h1 className="font-size--32">Settled Expenses</h1>
			<Link
				to="/expense-list"
				className="back-link text--white font-size--browser-default font--bold line-height--21 pointer border-radius--sm mt--20 mb--20"
			>
				Back to Expense List
			</Link>
			{settledExpenses.length > 0 ? (
				settledExpenses.map((expense, index) => (
					<div className="expense text--left mb--10 padding--10" key={index}>
						<p className="font-size--18 font--medium line-height--16 mt--5 mb--5">
							<span className="text--capitalize font--bold">{expense.description}</span>
						</p>
						<p className="font-size--18 font--medium line-height--16 mt--5 mb--5">
							Amount: <span className="font--bold">{expense.amount}</span>
						</p>
						<p className="font-size--18 font--medium line-height--16 mt--5 mb--5">
							Paid By: <span className="font--bold">{expense.paidBy}</span>
						</p>
						<p className="font-size--18 font--medium line-height--16 mt--5 mb--10">
							Participants: <span className="font--bold">{expense.participants.join(', ')}</span>
						</p>
						<p className="font-size--20 font--bold line-height--21 green mt--5 mb--10">Settled</p>
					</div>
				))
			) : (
				<p className="no-settled-expenses-message font-size--18 font--medium line-height--28 mt--20">
					No settled expenses yet.
				</p>
			)}
		</div>
	);
};

export default SettledExpenseList;
