import { IAction, ICommonState } from 'shared/interface';
import * as actionTypes from './action-types';

const initialState: ICommonState = {
	notification: {
		type: '',
		message: ''
	}
};

const reducer = (state: ICommonState = initialState, action: IAction) => {
	switch (action.type) {
		case actionTypes.ADD_NOTIFICATION:
			return {
				...state,
				notification: {
					type: action.payload.type,
					message: action.payload.message
				}
			};
		case actionTypes.REMOVE_NOTIFICATION:
			return {
				...state,
				notification: {
					type: '',
					message: ''
				}
			};
		default:
			return state;
	}
};

export default reducer;
