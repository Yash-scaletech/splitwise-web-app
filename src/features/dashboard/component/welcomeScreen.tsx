import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
	const navigate = useNavigate();

	return (
		<div className="welcome-screen flex align-items--center justify-content--center">
			<div className="text--center">
				<h1 className="font-size--40 font--bold line-height--40 mb--20">Welcome to Splitwise</h1>
				<p className="description font-size--18 line-height--21 font--medium mb--30">
					Splitwise is a simple expense management app that helps you track shared expenses with friends,
					roommates, or any group. Easily split bills, keep track of who owes whom, and settle expenses.
				</p>
				<button
					className="start-button text--white font-size--browser-default font--bold pointer border-radius--sm"
					onClick={() => navigate('/expense-list')}
				>
					Get Started
				</button>
			</div>
		</div>
	);
};

export default WelcomeScreen;
