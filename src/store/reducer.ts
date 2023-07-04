import { combineReducers } from 'redux';

import { State, IAction } from 'shared/interface';
import { resetTimer } from 'shared/utility';

import common from './commonReducer';
import loadingReducer from './loadingReducer';
import modelReducer from './modelReducer';
import errorReducer from './errorReducer';
import AuthService from 'shared/services/auth.service';

const appReducer = combineReducers({
	common: common,
	loading: loadingReducer,
	error: errorReducer,
	model: modelReducer
});

const rootReducer = (state: State | undefined, action: IAction) => {
	if (action.type === 'LOGOUT') {
		AuthService.removeAuthData();
		// state = undefined;
		resetTimer();
	}
	return appReducer(state, action);
};

export default rootReducer;
