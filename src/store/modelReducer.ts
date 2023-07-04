import { IAction, IModelState } from 'shared/interface';
import * as actionTypes from './action-types';

const initialState: IModelState = {
	isOpen: false,
	actionType: '',
	isSubModelOpen: false,
	subModalActiontype: ''
};

const reducer = (state: IModelState = initialState, action: IAction) => {
	switch (action.type) {
		case actionTypes.OPEN_MODAL:
			return {
				...state,
				isOpen: true,
				actionType: action.payload
			};
		case actionTypes.CLOSE_MODAL:
			return {
				...state,
				isOpen: false,
				actionType: ''
			};
		case actionTypes.OPEN_SUB_MODAL:
			return {
				...state,
				isSubModelOpen: true,
				subModalActiontype: action.payload
			};
		case actionTypes.CLOSE_SUB_MODAL:
			return {
				...state,
				isSubModelOpen: false,
				subModalActiontype: ''
			};
		default:
			return state;
	}
};

export default reducer;
