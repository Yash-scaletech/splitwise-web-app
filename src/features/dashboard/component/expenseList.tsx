import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IExpense } from '../interface/dashboard';

import '../style/dashboard.scss';

const ExpenseList = () => {
	const [expenses, setExpenses] = useState<IExpense[]>([]);

	const navigate = useNavigate();

	useEffect(() => {
		// Retrieve expense data from localStorage or set initial data
		const storedExpenses = localStorage.getItem('expenses');

		if (storedExpenses) {
			setExpenses(JSON.parse(storedExpenses));
		} else {
			const initialExpenses: IExpense[] = [
				{
					description: 'Dinner',
					amount: 480,
					paidBy: 'Harsh',
					participants: ['You', 'Harsh', 'Ishit'],
					settled: false
				}
			];
			setExpenses(initialExpenses);
			localStorage.setItem('expenses', JSON.stringify(initialExpenses));
		}
	}, []);

	const handleSettlePayment = (index: number) => {
		const updatedExpenses = [...expenses];
		const settledExpense = updatedExpenses.splice(index, 1)[0];

		const storedSettleExpenses = localStorage.getItem('settleExpenses');
		if (storedSettleExpenses) {
			const parsedSettleExpenses = JSON.parse(storedSettleExpenses);
			localStorage.setItem('settleExpenses', JSON.stringify([...parsedSettleExpenses, settledExpense]));
		} else {
			localStorage.setItem('settleExpenses', JSON.stringify([settledExpense]));
		}

		setExpenses(updatedExpenses);
		localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
	};

	const calculateDifference = (expense: IExpense) => {
		const { amount, paidBy, participants } = expense;
		const share = amount / participants.length;
		const owedStatements: string[] = [];

		participants.forEach((participant) => {
			if (participant !== paidBy) {
				owedStatements.push(`${participant} owes ${paidBy} $${share.toFixed(2)}`);
			}
		});

		return owedStatements.join('\n');
	};

	const calculateDifferencePerson = () => {
		let totalOwe = 0;
		let totalLent = 0;
		const owedStatements: string[] = [];
		const individualOwe: { [participant: string]: number } = {};

		expenses.forEach((expense) => {
			const { amount, paidBy, participants } = expense;
			const share = amount / participants.length;

			if (participants.includes('You')) {
				if (paidBy === 'You') {
					participants
						.filter((participant) => participant !== paidBy)
						.forEach((participant) => {
							owedStatements.push(`${participant} owes You $${share.toFixed(2)}`);
							totalOwe += share;

							if (individualOwe[participant]) {
								individualOwe[participant] += share;
							} else {
								individualOwe[participant] = share;
							}
						});
				} else {
					owedStatements.push(`You owe ${paidBy} $${share.toFixed(2)}`);
					totalOwe += share;

					if (individualOwe[paidBy]) {
						individualOwe[paidBy] -= share;
					} else {
						individualOwe[paidBy] = -share;
					}
				}
			} else if (paidBy === 'You') {
				totalLent += share;

				participants.forEach((participant) => {
					if (individualOwe[participant]) {
						individualOwe[participant] += share;
					} else {
						individualOwe[participant] = share;
					}
				});
			}
		});

		const totalDifference = totalOwe - totalLent;
		return { owedStatements, individualOwe, totalDifference };
	};

	const { owedStatements, totalDifference, individualOwe } = calculateDifferencePerson();

	const pendingExpenses = expenses.filter((expense) => !expense.settled);

	return (
		<div className="expense-list">
			<h1 className="no--margin">Expense List</h1>
			<div className="flex align-items--center justify-content--end">
				<button className="settled-expenses-button mr--15" onClick={() => navigate('/add-expense')}>
					Add Expense
				</button>
				<button className="settled-expenses-button" onClick={() => navigate('/settled-expenses')}>
					Settled Expenses
				</button>
			</div>
			<div className="differences">
				<h2>Differences</h2>
				{owedStatements.length > 0 ? (
					<div>
						<p>Total Difference for You: {totalDifference.toFixed(2)}</p>
						<h3>Individual Amounts</h3>
						{owedStatements.map((statement, index) => (
							<p key={index}>{statement}</p>
						))}
						{Object.entries(individualOwe).length > 0 ? (
							<div>
								<h3>Individual Owes to You</h3>
								{Object.entries(individualOwe).map(([participant, oweAmount]) => (
									<p key={participant}>
										{participant} owes You ${oweAmount.toFixed(2)}
									</p>
								))}
							</div>
						) : (
							<p className="no-differences-message">No individual owes to display.</p>
						)}
					</div>
				) : (
					<p className="no-differences-message">No differences for you to display.</p>
				)}
			</div>
			<div className="expenses">
				<h2>Pending Expenses</h2>
				{pendingExpenses.length > 0 ? (
					pendingExpenses.map((expense, index) => (
						<div className="expense" key={index}>
							<p>{expense.description}</p>
							<p>Amount: {expense.amount}</p>
							<p>Paid By: {expense.paidBy}</p>
							<p>Participants: {expense.participants.join(', ')}</p>
							<button onClick={() => handleSettlePayment(index)}>Settle Payment</button>
							<p>{calculateDifference(expense)}</p>
						</div>
					))
				) : (
					<p className="no-expenses-message">No pending expenses.</p>
				)}
			</div>
		</div>
	);
};

export default ExpenseList;
