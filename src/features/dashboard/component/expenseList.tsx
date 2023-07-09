import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IExpense } from '../interface/dashboard';

import '../style/dashboard.scss';

const ExpenseList = () => {
	const [expenses, setExpenses] = useState<IExpense[]>([]);
	const [totalOwedToYou, setTotalOwedToYou] = useState<number>(0);
	const [totalOwedByYou, setTotalOwedByYou] = useState<number>(0);

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

	useEffect(() => {
		let owedToYou = 0;
		let owedByYou = 0;

		expenses.forEach((expense) => {
			const { amount, paidBy, participants } = expense;
			const share = amount / participants.length;

			participants.forEach((participant) => {
				if (participant !== paidBy) {
					if (participant === 'You') {
						owedByYou += share;
					} else if (paidBy === 'You') {
						owedToYou += share;
					}
				}
			});
		});

		setTotalOwedToYou(owedToYou);
		setTotalOwedByYou(owedByYou);
	}, [expenses]);

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
		const owedStatements: JSX.Element[] = [];

		participants.forEach((participant) => {
			if (participant !== paidBy) {
				const isPaidByYou = paidBy === 'You';
				const isParticipantYou = participant === 'You';
				const shareColor = isPaidByYou ? 'green' : isParticipantYou ? 'red' : 'black';
				const shareStatement = `${participant} owes ${paidBy} $${share.toFixed(2)}`;

				const owedStatement = (
					<p key={shareStatement} style={{ color: shareColor }}>
						{shareStatement}
					</p>
				);
				owedStatements.push(owedStatement);
			}
		});

		return owedStatements;
	};

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
			<h2>Total Owed</h2>
			<div className="total-owed">
				<p>
					Participants owe You: <span style={{ color: 'green' }}>${totalOwedToYou.toFixed(2)}</span>
				</p>
				<p>
					You owe Participants: <span style={{ color: 'red' }}>${totalOwedByYou.toFixed(2)}</span>
				</p>
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
							{calculateDifference(expense)}
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
