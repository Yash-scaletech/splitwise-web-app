export interface ICommonState {
	notification: {
		type: string;
		message: string;
	};
}

export interface IModelState {
	isOpen: boolean;
	actionType: string;
	isSubModelOpen: boolean;
	subModalActiontype: string;
}

export interface ILoadingState {
	api: {
		[key: string]: boolean;
	};
}

export interface State {
	common: ICommonState;
	loading: ILoadingState;
	error: IErrorState;
	model: IModelState;
}

export interface IErrorState {
	api: {
		[key: string]: string;
	};
}

export interface ILoaderState {
	loading: boolean;
}

export interface IErrState {
	error: boolean;
}

export interface IAction {
	type: string;
	payload: any;
}

export interface IModalStatusProps {
	openModal: () => void;
	closeModal: () => void;
}
