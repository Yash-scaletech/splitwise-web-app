import { NavigateFunction, Location, useLocation, useNavigate, useParams } from 'react-router-dom';

function withRouter(Children: any) {
	// eslint-disable-next-line react/display-name
	return (props: any) => {
		const match: any = { params: useParams() };
		const location: Location = useLocation();
		const navigate: NavigateFunction = useNavigate();
		return <Children {...props} match={match} navigate={navigate} location={location} />;
	};
}

export default withRouter;
