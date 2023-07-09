import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IExpense, IOwedParticipant } from '../interface/dashboard';

import '../style/dashboard.scss';

const ExpenseList = () => {
	const [expenses, setExpenses] = useState<IExpense[]>([]);
	const [participantsOweYou, setParticipantsOweYou] = useState<IOwedParticipant[]>([]);
	const [youOweParticipants, setYouOweParticipants] = useState<IOwedParticipant[]>([]);

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
		const participantsOweYouMap = new Map<string, number>();
		const youOweParticipantsMap = new Map<string, number>();

		expenses.forEach((expense) => {
			const { amount, paidBy, participants } = expense;
			const share = amount / participants.length;

			participants.forEach((participant) => {
				if (participant !== paidBy) {
					if (participant === 'You') {
						const currentAmount = youOweParticipantsMap.get(paidBy) || 0;
						youOweParticipantsMap.set(paidBy, currentAmount + share);
					} else if (paidBy === 'You') {
						const currentAmount = participantsOweYouMap.get(participant) || 0;
						participantsOweYouMap.set(participant, currentAmount + share);
					}
				}
			});
		});

		setParticipantsOweYou(
			Array.from(participantsOweYouMap.entries()).map(([participant, amount]) => ({ participant, amount }))
		);
		setYouOweParticipants(
			Array.from(youOweParticipantsMap.entries()).map(([participant, amount]) => ({ participant, amount }))
		);
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
			<div className="total-owed">
				<h2>Total Owed</h2>
				<div className="owed-section">
					<div>
						Participants owe You:
						{participantsOweYou.length > 0 ? (
							participantsOweYou.map(({ participant, amount }, index) => (
								<p key={index} className="green">
									{participant} owes You ${amount.toFixed(2)}
								</p>
							))
						) : (
							<span>No participants owe You</span>
						)}
					</div>
					<div>
						You owe Participants:
						{youOweParticipants.length > 0 ? (
							youOweParticipants.map(({ participant, amount }, index) => (
								<p key={index} className="red">
									You owe {participant} ${amount.toFixed(2)}
								</p>
							))
						) : (
							<span>You dont owe anyone</span>
						)}
					</div>
				</div>
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
							<button onClick={() => handleSettlePayment(index)} className="settled-expenses-button">
								Settle Payment
							</button>
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
