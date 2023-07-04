import isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';

import { QueryParameters } from '../interface';

export const API_CONFIG = {
	baseUrl: `${process.env.REACT_APP_BASE_URL}`,
	path: {}
};

export const SERVE_URL = window.location.origin;
export const HOST_URL = window.location.host;

export const getUrl = (url: string, params: QueryParameters = {}): string => {
	if (!url.includes('https')) {
		let urlString = `${API_CONFIG.baseUrl}/${url}`;
		if (params && !isEmpty(params)) {
			urlString += `?${queryString.stringify(params)}`;
		}
		return urlString;
	}

	return url;
};

export const RANDOM_STRING = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
