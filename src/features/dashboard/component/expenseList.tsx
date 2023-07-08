import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { IExpense } from '../interface/dashboard';

import '../style/dashboard.scss';

const ExpenseList = () => {
	const [expenses, setExpenses] = useState<IExpense[]>([]);
	const [settledExpenses, setSettledExpenses] = useState<IExpense[]>([]);

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
					participants: ['Yash', 'Harsh', 'Ishit'],
					settled: false
				}
			];
			setExpenses(initialExpenses);
			localStorage.setItem('expenses', JSON.stringify(initialExpenses));
		}
	}, []);

	useEffect(() => {
		const storedSettleExpenses = localStorage.getItem('settleExpenses');

		if (storedSettleExpenses) {
			setSettledExpenses(JSON.parse(storedSettleExpenses));
		}
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

	const calculateDifference = (person: string) => {
		const totalExpense = expenses.reduce((total, expense) => {
			if (expense.paidBy === person) {
				return total + expense.amount;
			}
			if (expense.participants.includes(person)) {
				const share = expense.amount / expense.participants.length;
				return total - share;
			}
			return total;
		}, 0);
		return totalExpense.toFixed(2);
	};

	const pendingExpenses = expenses.filter((expense) => !expense.settled);

	return (
		<div className="expense-list">
			<h1>Expense List</h1>
			<div className="expenses">
				<h2>Settled Expenses</h2>
				{settledExpenses.map((expense, index) => (
					<div className="expense" key={index}>
						<p>{expense.description}</p>
						<p>Amount: {expense.amount}</p>
						<p>Paid By: {expense.paidBy}</p>
						<p>Participants: {expense.participants.join(', ')}</p>
						<p>Settled</p>
					</div>
				))}
			</div>
			<div className="expenses">
				<h2>Pending Expenses</h2>
				{pendingExpenses.map((expense, index) => (
					<div className="expense" key={index}>
						<p>{expense.description}</p>
						<p>Amount: {expense.amount}</p>
						<p>Paid By: {expense.paidBy}</p>
						<p>Participants: {expense.participants.join(', ')}</p>
						<button onClick={() => handleSettlePayment(index)}>Settle Payment</button>
					</div>
				))}
			</div>
			<div className="differences">
				<h2>Differences</h2>
				{['Yash', 'Bhavy', 'Satvik', 'Harsh', 'Ishit', 'Tirth'].map((person, index) => (
					<p key={index}>
						{person}: {calculateDifference(person)}
					</p>
				))}
			</div>
			<Link to="/add-expense">Add Expense</Link>
		</div>
	);
};

export default ExpenseList;
