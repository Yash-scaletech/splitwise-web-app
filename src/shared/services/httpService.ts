// tslint:disable: no-any
// tslint:disable: no-unsafe-any
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import queryString from 'query-string';
import isEmpty from 'lodash/isEmpty';
import { QueryParameters, ResponseObj } from '../interface';
import AuthService from './auth.service';

export interface AxiosParams {
	method: string;
	url: string;
	data?: any;
	contentType?: string;
	isLogin?: boolean;
	noCache?: boolean;
	noToken?: boolean;
	noLang?: boolean;
}

export interface MiscellaneousRequestParams {
	contentType?: string;
	noCache?: boolean;
	noToken?: boolean;
	noLang?: boolean;
}

class HttpService {
	// axiosInstance = axios.create();
	CancelToken = axios.CancelToken;
	cancel_req: any = {};
	baseUrl: string;
	name: string;
	axiosInstance: AxiosInstance;
	constructor(axiosInstance: AxiosInstance, baseUrl: string, name: string) {
		this.axiosInstance = axiosInstance;
		this.baseUrl = baseUrl;
		this.name = name;
	}
	cancelRequest = (url: string) => {
		const f = this.cancel_req[url];
		if (f) {
			f();
		}
	};

	getUrl = (url: string, params: QueryParameters = {}): string => {
		if (!url.includes('https')) {
			let urlString = `${this.baseUrl}/${url}`;
			if (params && !isEmpty(params)) {
				urlString += `?${queryString.stringify(params)}`;
			}
			return urlString;
		}

		return url;
	};

	/**
	 * get method
	 * @param request object containing axios params
	 */
	get = (url: string, params: any = {}, otherData: MiscellaneousRequestParams = {}) => {
		return this.commonAxios({
			method: 'GET',
			url: this.getUrl(url, params),
			...otherData
		});
	};

	/**
	 * post method
	 * @param request object containing axios params
	 */
	post = (url: string, params: any = {}, otherData: MiscellaneousRequestParams = {}) => {
		return this.commonAxios({
			method: 'POST',
			url: this.getUrl(url),
			data: params,
			...otherData
		});
	};

	/**
	 * put method
	 * @param request object containing axios params
	 */
	put = (url: string, params: any = {}, otherData: MiscellaneousRequestParams = {}) => {
		return this.commonAxios({
			method: 'PUT',
			url: this.getUrl(url),
			data: params,
			...otherData
		});
	};

	/**
	 * deleteRequest method
	 * @param request object containing axios params
	 */
	deleteRequest = (url: string, params: any = {}, otherData: MiscellaneousRequestParams = {}) => {
		return this.commonAxios({
			method: 'DELETE',
			url: this.getUrl(url),
			data: params,
			...otherData
		});
	};

	/**
	 * patch method
	 * @param request object containing axios params
	 */
	patch = (url: string, params: any = {}, otherData: MiscellaneousRequestParams = {}) => {
		return this.commonAxios({
			method: 'PATCH',
			url: this.getUrl(url),
			data: params,
			...otherData
		});
	};

	/**
	 * commonAxios
	 * @param object containing method, url, data, access token, content-type, isLogin
	 */
	commonAxios = ({
		method,
		url,
		data,
		contentType = 'application/json',
		noCache = false,
		noToken = false,
		noLang = false
	}: AxiosParams): Promise<any> => {
		const headers: any = {
			'Content-Type': contentType
		};

		const token = AuthService.getAccessToken();
		const userLang = AuthService.getUserLanguage();

		if (!noToken && token) {
			headers['x-access-token'] = `${token}`;
		}

		if (noCache) {
			headers['Cache-Control'] = 'no-cache, no-store, must-revalidate, max-age=0';
		}

		if (!noLang && userLang) {
			headers['x-request-language'] = userLang;
		}

		let body: any = null;

		if (contentType === 'application/json') {
			body = JSON.stringify(data);
		} else {
			body = data;
		}

		return new Promise((resolve, reject) => {
			this.axiosInstance({
				method: method,
				url: url,
				cancelToken: new this.CancelToken((c) => {
					// An executor function receives a cancel function as a parameter
					this.cancel_req[url.split('?')[0].split('.com/')[1]] = c;
				}),
				headers: headers,
				data: body
			} as AxiosRequestConfig)
				.then((response: AxiosResponse<ResponseObj<any>>) => {
					if (response && response.data) {
						resolve(response.data.data);
					}
				})
				.catch((error) => {
					reject(error);
				});
		});
	};
}

export default HttpService;
