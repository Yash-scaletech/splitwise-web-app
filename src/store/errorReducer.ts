import { IErrorState, IAction } from 'shared/interface';

const errorReducer = (state: IErrorState = { api: {} }, action: IAction): IErrorState => {
	const { type, payload } = action;
	const matches = /(.*)_(INIT|SUCCESS|FAIL)/.exec(type);

	// not a *INIT / *_SUCCESS /  *_FAIL actions, so we ignore them
	if (!matches) return state;

	const [, requestName, requestState] = matches;
	return {
		...state,
		// Store whether a request is happening at the moment or not
		api: {
			...state.api,
			[requestName]: requestState === 'FAIL' && payload ? payload.error || '' : ''
		}
	};
};

export default errorReducer;
