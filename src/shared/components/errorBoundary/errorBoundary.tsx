import React from 'react';

interface OwnProps {
	children?: any;
}
class ErrorBoundary extends React.Component<OwnProps> {
	static getDerivedStateFromError(error: Error | null) {
		return { error };
	}

	state = {
		error: null
	};

	componentDidMount() {
		//window.onerror = this.logError;
	}

	componentDidCatch(error: Error | null, info: any) {
		this.logError(error);
		this.setState({ error });
	}

	render() {
		if (this.state.error) {
			return 'System is updating. Please hold on.';

			//comment out below code when you need crash reports from user by Sentry
			// return (
			// 	<div
			// 		className="height--full flex justify-content-center align-items--center flex--column mt--48
			// 	"
			// 	>
			// 		<p className="font--bold text--dark mb--20 text--center">
			// 			Oops! System are being updating . please report your feedback by clicking on below button
			// 		</p>
			// 		<button className="btn btn--primary-300" onClick={() => Sentry.showReportDialog()}>
			// 			Report feedback
			// 		</button>
			// 	</div>
			// );
		}
		return this.props.children;
	}

	logError(args: Error | null) {
		console.log(args);
	}
}

export default ErrorBoundary;
