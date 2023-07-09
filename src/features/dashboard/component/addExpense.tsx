import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IExpense } from '../interface/dashboard';

import '../style/dashboard.scss';
import { Link } from 'react-router-dom';

const AddExpense = () => {
	const navigate = useNavigate();

	const [description, setDescription] = useState('');
	const [amount, setAmount] = useState('');
	const [paidBy, setPaidBy] = useState('');
	const [participants, setParticipants] = useState<string[]>([]);
	const [errorMessage, setErrorMessage] = useState('');

	const people = ['You', 'Bhavy', 'Satvik', 'Harsh', 'Ishit', 'Tirth'];

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === 'description') {
			setDescription(value);
		} else if (name === 'amount') {
			setAmount(value);
		}
	};

	const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPaidBy(e.target.value);
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked, value } = e.target;
		if (checked) {
			setParticipants([...participants, value]);
		} else {
			setParticipants(participants.filter((participant) => participant !== value));
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (description && amount && paidBy && participants.length > 0) {
			const expense: IExpense = {
				description,
				amount: parseFloat(amount),
				paidBy,
				participants,
				settled: false
			};
			// Store the new expense in localStorage
			const storedExpenses = localStorage.getItem('expenses');
			if (storedExpenses) {
				const parsedExpenses = JSON.parse(storedExpenses);
				localStorage.setItem('expenses', JSON.stringify([...parsedExpenses, expense]));
			} else {
				localStorage.setItem('expenses', JSON.stringify([expense]));
			}
			navigate('/expense-list');
		} else {
			setErrorMessage('Please fill in all fields');
		}
	};

	return (
		<div className="add-expense flex flex--column align-items--center padding--20">
			<h1 className="no--margin font-size--32 mb--20">Add Expense</h1>
			<form onSubmit={handleSubmit} className="form">
				<div className="flex flex--column mb--16">
					<label htmlFor="description" className="font-size--18 font--bold line-height--16 mt--10 mb--8">
						Description
					</label>
					<input
						type="text"
						id="description"
						name="description"
						value={description}
						onChange={handleInputChange}
						className="form-input"
					/>
				</div>
				<div className="flex flex--column mb--16">
					<label htmlFor="amount" className="font-size--18 font--bold line-height--16 mb--8">
						Amount
					</label>
					<input
						type="number"
						className="form-input"
						id="amount"
						name="amount"
						value={amount}
						onChange={handleInputChange}
					/>
				</div>
				<div className="flex flex--column mb--16">
					<label htmlFor="paidBy" className="font-size--18 font--bold line-height--16 mb--8">
						Paid By
					</label>
					<select
						id="paidBy"
						name="paidBy"
						className="form-input"
						value={paidBy}
						onChange={handleDropdownChange}
					>
						<option value="">Select Person</option>
						{people.map((person, index) => (
							<option key={index} value={person}>
								{person}
							</option>
						))}
					</select>
				</div>
				<div className="flex flex--column mb--16">
					<p className="font-size--18 font--bold line-height--16 mt--10 mb--10">Participants</p>
					{people.map((person, index) => (
						<label
							key={index}
							className="check-wrapper position--relative font-size--22 font--medium pointer mb--10"
						>
							<input
								type="checkbox"
								name="participant"
								value={person}
								checked={participants.includes(person)}
								onChange={handleCheckboxChange}
							/>
							<span className="checkmarks position--absolute width--30 bg--white border-radius--sm top--0 left--0" />
							<span className="ml--30">{person}</span>
						</label>
					))}
				</div>
				<div className="flex">
					<button
						type="submit"
						className="submit-btn font--bold text--white font-size--browser-default pointer border-radius--sm mt--16 mr--15"
					>
						Add Expense
					</button>
					<Link
						to="/expense-list"
						className="submit-btn font--bold text--white font-size--browser-default pointer border-radius--sm mt--16"
					>
						Back to Expense List
					</Link>
				</div>
			</form>
			{errorMessage && <p className="error-message mt--10">{errorMessage}</p>}
		</div>
	);
};

export default AddExpense;
