import _ from 'lodash';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import 'moment/locale/de';
import { ThunkDispatch } from 'redux-thunk';

import { RANDOM_STRING } from './constants/constant';
import { IAction, State } from './interface';
import AuthService from './services/auth.service';

export const getSeatAndBlock = (seatData: string) => {
	const tempSeat = seatData.split('::');
	return { block: tempSeat[0], seatNo: tempSeat[1] };
};

let timer: NodeJS.Timeout;
/**
 * create action creator
 * @param ACTION - type of action
 * @param data - data
 */
export const createAction = (ACTION: string, data: any = null): IAction => {
	return {
		type: ACTION,
		payload: data
	};
};

/**
 * create loading selector
 * @param actions - actions to dispatch
 */
export const createLoadingSelector = (actions: string[]) => (state: State) => {
	// returns true only when all actions is not loading
	return _(actions).some((action: string) => _.get(state, `loading.api.${action}`));
};

/**
 * create error selector
 * @param actions - actions to dispatch
 */
export const createErrorMessageSelector = (actions: string[]) => (state: State) => {
	// returns the first error messages for actions
	// * We assume when any request fails on a page that
	//   requires multiple API calls, we shows the first error
	return (
		_(actions)
			.map((action) => _.get(state, `error.api.${action}`))
			.compact()
			.first() || ''
	);
};

/**
 * dispatch action after given time (to handle some events like close modal after success api call)
 * @param dispatch - dispatch object
 * @param action - action type
 * @param time - time after which action is to be dispatched (default - 100ms)
 */
export const dispatchActionAfterTime = (
	dispatch: ThunkDispatch<{}, {}, IAction>,
	action: string,
	time: number = 100
) => {
	setTimeout(() => {
		dispatch(createAction(action));
	}, time);
};

export const debounce = (func: any, wait = 500) => {
	let h: NodeJS.Timeout;
	return (...args: any) => {
		clearTimeout(h);
		h = setTimeout(() => func(...args), wait);
	};
};

let timerId: any;
export const throttleFunction = (func: any, delay = 500, ...args: any) => {
	// If setTimeout is already scheduled, no need to do anything
	if (timerId) {
		return;
	}
	// Schedule a setTimeout after delay seconds
	timerId = setTimeout(function () {
		func(...args);
		// Once setTimeout function execution is finished, timerId = undefined so that in <br>
		// the next scroll event function execution can be scheduled by the setTimeout
		timerId = undefined;
	}, delay);
};

export const formatDate = (date: string | number | Date | undefined, format = 'YYYY-MM-DD') => {
	if (!date) {
		return '';
	}
	return moment(date, format).locale('de').format(format);
};

/**
 * dateToTimestamp - to convert date to timestamp
 */
export const dateToTimestamp = (date: any) => {
	if (!date) {
		return '';
	}
	const timestamp = moment(date).utc().format('x');
	return parseInt(timestamp);
};

/**
 * timestampToDate - to convert date to timestamp
 */
export const timestampToDate = (timestamp: any, format?: string) => {
	return moment
		.unix(timestamp / 1000)
		.local()
		.format(format || 'MM.DD.YYYY HH.mm');
};

export const parseQuery = (queryString: string) => {
	const query: any = {};
	const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
	for (let i = 0; i < pairs.length; i++) {
		const pair = pairs[i].split('=');
		query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
	}
	return query;
};

export const resetTimer = () => {
	clearTimeout(timer);
};

export const randomString = (length: number) => {
	let text = '';
	const possible = RANDOM_STRING;
	// generate random string
	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

export const timeSince = (timestamp: any) => {
	return Math.floor(moment.duration(moment().diff(timestamp)).asHours());
};

export const timeSinceMin = (timestamp: any) => {
	const currentTime = Math.floor(moment.duration(moment().diff(timestamp)).asMinutes());
	return currentTime < 1 ? '1' : currentTime;
};

export const timeSinceMilliseconds = (timestamp: any) => {
	return Math.floor(moment.duration(moment(timestamp).diff(moment())).asMilliseconds());
};

export const isTimeEnded = (time: any): boolean => {
	return moment(new Date()).isAfter(time);
};

export const isInteractionTimeInMins = (timestamp: any) => {
	return Math.floor(moment.duration(moment().diff(timestamp)).asHours()) < 1;
};

export const timeFromNow = (timestamp: any) => {
	return moment(moment(timestamp).locale(AuthService.getUserLanguage())).fromNow();
};

export const pad = (n: any, width: number = 2, z?: string) => {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

const numberFormatterInstance = new Intl.NumberFormat('de-DE');

export const numberFormatter = (value: number) => {
	return numberFormatterInstance.format(value);
};

export const animateNumberFormatter = (value: number, decimal: number = 0) => {
	return numberFormatterInstance.format(Number(value.toFixed(decimal)));
};

export const animateNumberFormatterWithTwoDecimal = (value: number) => {
	return animateNumberFormatter(value, 2);
};

export const payoutNumberConverter = (value: number) => {
	const formattedValue = numberFormatter(value);
	const splitValue = formattedValue.split(',');
	if (!splitValue[1] || !splitValue[1].length) {
		return `${formattedValue},00`;
	} else if (splitValue[1].length === 1) {
		return `${splitValue[0]},${splitValue[1]}0`;
	}
	return formattedValue.replace('.', ',');
};

export const convertNumber = (value: number) => {
	// Nine Zeroes for Billions
	return Math.abs(Number(value)) >= 1.0e9
		? Math.abs(Number(value)) / 1.0e9 + 'B'
		: // Six Zeroes for Millions
		Math.abs(Number(value)) >= 1.0e6
		? Math.abs(Number(value)) / 1.0e6 + 'M'
		: // Three Zeroes for Thousands
		Math.abs(Number(value)) >= 1.0e3
		? Math.abs(Number(value)) / 1.0e3 + 'K'
		: Math.abs(Number(value));
};

export const findClosestNumberIndex = (num: number, arr: number[]) => {
	let curr = arr[0];
	let index = 0;
	let diff = Math.abs(num - curr);
	const length = arr.length;
	for (let val = 0; val < length; val++) {
		const newDiff = Math.abs(num - arr[val]);
		if (newDiff < diff) {
			diff = newDiff;
			curr = arr[val];
			index = val;
		}
	}
	return index;
};

export const windowScroll = (
	value: number,
	position: 'top' | 'bottom' = 'top',
	behavior: 'auto' | 'smooth' = 'smooth'
) =>
	window.scrollTo({
		[position]: value,
		behavior: behavior
	});

export const isIOS = () => {
	return ['iPad', 'iPhone', 'iPod'].includes(navigator.platform);
};

export const isMobile = () => {
	if (typeof navigator === 'undefined' || typeof navigator.userAgent !== 'string') {
		return false;
	}
	return /Mobile/.test(navigator.userAgent);
};

export const isAndroid = () => {
	const userAgent = navigator.userAgent || navigator.vendor;
	return !!userAgent.match(/Android/i);
};

export const genMetaString = (creds: any): string => {
	const keys = Object.keys(creds);
	return (
		creds[keys[2]].substr(45, 156) + '$%^' + creds[keys[0]].substr(4, 12) + '@352' + creds[keys[1]].substr(0, 18)
	);
};

export const isGetOnStageSupported = () => {
	const isChromeOrFirefoxForIOS =
		navigator.userAgent.indexOf('CriOS') >= 0 || navigator.userAgent.indexOf('FxiOS') >= 0;
	return !isChromeOrFirefoxForIOS;
};

export const getRedemptionPendingStatus = (user: any): boolean => {
	return !isEmpty(user.winners) && !user.winners.hasUserRedeemed;
};

export const ensureMediaPermissions = () => {
	return navigator.mediaDevices
		.enumerateDevices()
		.then((devices) => {
			return devices.every((device) => {
				return !(device.deviceId && device.label);
			});
		})
		.then((shouldAskForMediaPermissions) => {
			if (shouldAskForMediaPermissions) {
				return navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((mediaStream) => {
					mediaStream.getTracks().forEach((track) => {
						track.stop();
					});
				});
			}
		});
};

export const getSpentLimit = (spentEnergy: number, maxLimit: number, selectedEnergy: number) => {
	const isMaxLimit = maxLimit !== -1 && (spentEnergy === maxLimit || spentEnergy > maxLimit);
	const isOverLimit = !isMaxLimit && maxLimit > 0 ? spentEnergy + selectedEnergy > maxLimit : false;
	if (isOverLimit) {
		return {
			isOverLimit: isOverLimit,
			remainingLimit: maxLimit - spentEnergy
		};
	}
	return {
		isOverLimit: isOverLimit,
		isMaxLimit: isMaxLimit
	};
};

export const checkFilesType = (fileTypes: string[], file: any): boolean => {
	if (!!file) {
		return file && fileTypes.includes(file.type);
	}
	return true;
};

export const checkFileSize = (size: number, file: any): boolean => {
	return file && file.size / 1024 / 1024 <= size;
};

export const isEdge: any = navigator.userAgent.indexOf('Edge') !== -1;

export const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export const isIosDevice = /iPhone|iPad|iPod/i.test(navigator.userAgent);

export const isWebApp = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export const isInstagramBrowser = (): boolean => {
	const userAgent = navigator.userAgent;
	return userAgent.includes('Instagram');
};

export const randomNumberGenerator = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) + min);
};
