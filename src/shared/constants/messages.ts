import i18n from 'shared/util/localization';
import localizationConstants from 'shared/util/translation/constant';

/**
 * errorMessages - list of common error messages
 */
export const errorMessages = {
	required: (field: string) => i18n.t(localizationConstants.requiredField, { field }),
	domainNameRequired: () => i18n.t(localizationConstants.domainNameRequired),
	lowercase: (field: string) => `${field} must be a lowercase string!`,
	invalidPhoneNumber: () => i18n.t(localizationConstants.invalidPhoneNumber),
	invalid: (field: string) => i18n.t(localizationConstants.invalidField, { field }),
	invalidFormat: () => i18n.t(localizationConstants.invalidFormatValidation),
	fileSize: () => i18n.t(localizationConstants.fileSizeValidation),
	invalidUrl: () => i18n.t(localizationConstants.invalidUrlValidation),
	invalidUsername: () => i18n.t(localizationConstants.invalidUsernameField),
	trim: (field: string) => `${field} must not contain white space in starting/end!`,
	customEmail: () => i18n.t(localizationConstants.customEmailValidation),
	customPassword: () => `password must contain 1 Small, 1 Upper character and 1 Number, and min length should be 8!`,
	minLength: (field: string, length: number) =>
		i18n.t(localizationConstants.minValueLengthValidation, { field, length }),
	maxLength: (field: string, length: number) => i18n.t(localizationConstants.maxLengthValidation, { field, length }),
	minValue: (field: string, value: number) => `${field} must be greater than or equal to ${value}!`,
	maxValue: (field: string, value: number) => `${field} must be less than or equal to ${value}!`,
	maxOptions: (length: number) => i18n.t(localizationConstants.maxOptions, { length }),
	selectOption: (field: string) => i18n.t(localizationConstants.selectOptionValidation, { field }),
	acceptValidation: (field: string) => i18n.t(localizationConstants.acceptValidation, { field }),
	emptyFieldValidation: () => i18n.t(localizationConstants.emptyFieldValidation),
	photoRequiredValidation: () => i18n.t(localizationConstants.photoRequiredValidation),
	videoRequiredValidation: () => i18n.t(localizationConstants.videoRequiredValidation),
	invalidOTP: () => i18n.t(localizationConstants.invalidOTP)
};
