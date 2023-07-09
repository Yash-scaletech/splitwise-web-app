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
				const shareStatement = `${participant} owes ${paidBy} ₹${share.toFixed(2)}`;

				const owedStatement = (
					<p
						key={shareStatement}
						style={{
							color: shareColor,
							fontWeight: 500,
							fontSize: '16px',
							lineHeight: '20px',
							marginTop: '5px'
						}}
					>
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
		<div className="expense-list flex flex--column align-items--center text--center padding--20">
			<h1 className="no--margin font-size--32 mb--20">Expense List</h1>
			<div className="flex align-items--center justify-content--end">
				<button
					className="settled-expenses-button font--bold text--white font-size--browser-default pointer border-radius--sm mr--15"
					onClick={() => navigate('/add-expense')}
				>
					Add Expense
				</button>
				<button
					className="settled-expenses-button font--bold text--white font-size--browser-default pointer border-radius--sm"
					onClick={() => navigate('/settled-expenses')}
				>
					Settled Expenses
				</button>
			</div>
			<div className="owed-section width--full flex flex--wrap justify-content--around mt--20">
				<div className="difference-box mb--20">
					<p className="font-size--23 font--bold line-height--28 mb--20">Participants owe You:</p>
					{participantsOweYou.length > 0 ? (
						participantsOweYou.map(({ participant, amount }, index) => (
							<p key={index} className="green font-size--browser-default line-height--21 font--bold">
								{participant} owes You ₹{amount.toFixed(2)}
							</p>
						))
					) : (
						<span className="no-expenses-message font-size--18 font--medium line-height--28">
							No participants owe You
						</span>
					)}
				</div>
				<div className="difference-box mb--20">
					<p className="font-size--23 font--bold line-height--28 mb--20">You owe Participants:</p>
					{youOweParticipants.length > 0 ? (
						youOweParticipants.map(({ participant, amount }, index) => (
							<p key={index} className="red font-size--browser-default line-height--21 font--bold">
								You owe {participant} ₹{amount.toFixed(2)}
							</p>
						))
					) : (
						<span className="no-expenses-message font-size--18 font--medium line-height--28">
							You dont owe anyone
						</span>
					)}
				</div>
			</div>
			<div className="expenses mt--30 mb--20">
				<h2 className="font-size--28 font--bold line-height--28 mb--20">Pending Expenses</h2>
				{pendingExpenses.length > 0 ? (
					pendingExpenses.map((expense, index) => (
						<div className="expense text--left bg--white mb--20 padding--10" key={index}>
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
							<div className="text--center mb--10">
								<button
									onClick={() => handleSettlePayment(index)}
									className="settled-expenses-button font-size--18 font--bold line-height--16 text--white"
								>
									Settle Payment
								</button>
							</div>
							<div className="individual-expense">{calculateDifference(expense)}</div>
						</div>
					))
				) : (
					<p className="no-expenses-message font-size--18 font--medium line-height--28 mt--20">
						No pending expenses.
					</p>
				)}
			</div>
		</div>
	);
};

export default ExpenseList;
