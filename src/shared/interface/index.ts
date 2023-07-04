export interface ResponseObj<T> {
	isError: boolean;
	message: string;
	data: T;
}

export interface QueryParameters {
	perPage?: number;
	page?: number;
	id?: string;
	status?: string;
	q?: string;
	pdfName?: string;
	year?: number;
	sort?: string;
	order?: string;
}

export * from './state';
