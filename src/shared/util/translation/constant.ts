import en from './en';

export interface LocalizationKeys {
	requiredField: string;
	domainNameRequired: string;
	invalidPhoneNumber: string;
	invalidField: string;
	invalidFormatValidation: string;
	fileSizeValidation: string;
	invalidUrlValidation: string;
	invalidUsernameField: string;
	customEmailValidation: string;
	minValueLengthValidation: string;
	maxLengthValidation: string;
	maxOptions: string;
	selectOptionValidation: string;
	acceptValidation: string;
	emptyFieldValidation: string;
	photoRequiredValidation: string;
	videoRequiredValidation: string;
	invalidOTP: string;
}
const localizationConstants = {} as LocalizationKeys;

for (const key in en) {
	localizationConstants[key as typeOf] = key;
}

export type typeOf = 'requiredField';

export default localizationConstants;
