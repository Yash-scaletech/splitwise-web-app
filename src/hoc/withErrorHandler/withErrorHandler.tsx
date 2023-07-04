import React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { AxiosResponse, AxiosError } from 'axios';

import { axiosInstance } from 'shared/services/http.service';
import Notification, { notify } from 'shared/components/notification/notification';
import { ResponseObj, IAction, State } from 'shared/interface';
import { createAction } from 'shared/utility';
import * as actionTypes from 'store/action-types';

let resInterceptor: number;
class WithErrorHandler extends React.Component<DispatchProps & any> {
	/**
	 * add response interceptor before component gets mounted
	 * check if response data contains isError = true, if yes, show an error message
	 * if response gives a non-200 error code, show error from error data
	 * if response contains a message to show, show success notification
	 */
	componentDidMount = () => {
		resInterceptor = axiosInstance.interceptors.response.use(
			(res: AxiosResponse<ResponseObj<any>>) => {
				if (res.data && res.data.isError && res.data.message) {
					notify(res.data.message, 'error');
					throw new Error(res.data.message);
				} else if (res.data) {
					if (res.data.message) {
						notify(res.data.message, 'success');
					}
				}
				return res;
			},
			(error: AxiosError) => {
				// check if error is having data
				if (error.response && error.response.data && error.response.status) {
					const status = error.response.status;
					const responseData = error.response.data;
					// is http error code is 401, log out of the application
					if (status === 401) {
						this.props.logout();
					} else if (responseData.errorMessages && Object.keys(responseData.errorMessages).length) {
						// if error response contains any validation message, fetch it from response, and add error notification
						const validationError = responseData.errorMessages[Object.keys(responseData.errorMessages)[0]];
						notify(validationError[0], 'error');
					} else if (error.response && responseData && responseData.message) {
						if (responseData.message.error) {
							notify(responseData.message.error, 'error');
						} else {
							// if error data contains message field, add error notification
							notify(responseData.message, 'error');
						}
					}
					throw error;
				}
				throw error;
			}
		);
	};

	/**
	 * eject response interceptor on when component is about to unmount
	 */
	componentWillUnmount = () => axiosInstance.interceptors.response.eject(resInterceptor);
	render() {
		return <Notification />;
	}
}

interface DispatchProps {
	logout: () => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, IAction>): DispatchProps => {
	return {
		logout: () => {
			dispatch(createAction(actionTypes.LOGOUT));
		}
	};
};

export default connect<null, DispatchProps, {}, State>(null, mapDispatchToProps)(WithErrorHandler);
