import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IExpense } from '../interface/dashboard';

import '../style/dashboard.scss';

const AddExpense = () => {
	const navigate = useNavigate();

	const [description, setDescription] = useState('');
	const [amount, setAmount] = useState('');
	const [paidBy, setPaidBy] = useState('');
	const [participants, setParticipants] = useState<string[]>([]);
	const [errorMessage, setErrorMessage] = useState('');

	const people = ['John', 'Jane', 'Mark'];

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
			navigate('/');
		} else {
			setErrorMessage('Please fill in all fields');
		}
	};

	return (
		<div className="add-expense">
			<h1>Add Expense</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="description">Description</label>
					<input
						type="text"
						id="description"
						name="description"
						value={description}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor="amount">Amount</label>
					<input type="number" id="amount" name="amount" value={amount} onChange={handleInputChange} />
				</div>
				<div>
					<label htmlFor="paidBy">Paid By</label>
					<select id="paidBy" name="paidBy" value={paidBy} onChange={handleDropdownChange}>
						<option value="">Select Person</option>
						{people.map((person, index) => (
							<option key={index} value={person}>
								{person}
							</option>
						))}
					</select>
				</div>
				<div>
					<p>Participants</p>
					{people.map((person, index) => (
						<label key={index} className="check-wrapper pointer">
							<input
								type="checkbox"
								name="participant"
								value={person}
								checked={participants.includes(person)}
								onChange={handleCheckboxChange}
							/>
							<span className="checkmarks" />
							<span className="check-person">{person}</span>
						</label>
					))}
				</div>
				<button type="submit">Add Expense</button>
			</form>
			{errorMessage && <p className="error-message">{errorMessage}</p>}
		</div>
	);
};

export default AddExpense;
