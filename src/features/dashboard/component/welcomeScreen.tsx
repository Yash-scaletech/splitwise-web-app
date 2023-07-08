import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
	const navigate = useNavigate();

	return (
		<div className="welcome-screen">
			<h1>Welcome to Splitwise</h1>
			<p className="description">
				Splitwise is a simple expense management app that helps you track shared expenses with friends,
				roommates, or any group. Easily split bills, keep track of who owes whom, and settle expenses.
			</p>
			<button className="start-button" onClick={() => navigate('/expense-list')}>
				Get Started
			</button>
		</div>
	);
};

export default WelcomeScreen;
