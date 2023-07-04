import CryptoJS from 'crypto-js';

const KEY = process.env.REACT_APP_AUTH_ENCRYPT_KEY || '';

let token = '';

/**
 * function to check if user is logged in or not
 */
const checkLogin = (): boolean => {
	if (localStorage.authInfo && localStorage.userInfo) {
		return true;
	} else {
		return false;
	}
};

/**
 * function to get user access token
 */
const getAccessToken = (): boolean | string => {
	if (token && token !== '') {
		return token;
	}
	try {
		const data = localStorage.authInfo;
		if (data) {
			const bytes = CryptoJS.AES.decrypt(data.toString(), KEY);
			const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
			token = !!decryptedData ? decryptedData : false;
			return token;
		} else {
			return false;
		}
	} catch (e) {
		return false;
	}
};

/**
 * function to set user authentication data
 */
const setAuthData = (data: string): void => {
	token = data;
	const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), KEY);
	localStorage.setItem('authInfo', cipherText.toString());
};
/**
 * function to get user language
 */
const getUserLanguage = (): string => {
	const userLang = navigator.language;
	if (userLang.includes('de')) {
		return 'de';
	}
	return 'en';
};

/**
 * function to remove user authentication data
 */

const removeAuthData = (): void => {
	localStorage.removeItem('authInfo');
	localStorage.removeItem('userInfo');
	token = '';
};

const AuthService = {
	checkLogin: checkLogin,
	getAccessToken: getAccessToken,
	setAuthData: setAuthData,
	removeAuthData: removeAuthData,
	getUserLanguage: getUserLanguage
};
export default AuthService;
