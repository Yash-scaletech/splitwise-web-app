import { LocalizationKeys } from './constant';

const de: LocalizationKeys = {
	requiredField: 'Please enter a {{field}}!',
	invalidField: '{{field}} must be valid',
	invalidUsernameField: 'Please only use 0-9 and a-z.',
	customEmailValidation: 'Please enter a valid email address',
	maxLengthValidation: '{{field}} must be shorter than {{length}} characters!',
	minValueLengthValidation: '{{field}} must be greater than or equal to {{length}}!',
	invalidFormatValidation: 'Unsupported file format',
	invalidUrlValidation: 'Please enter a valid URL',
	fileSizeValidation: 'The file size is too big',
	domainNameRequired: 'Please enter your desired domain',
	invalidPhoneNumber: 'Please enter a valid telephone number!',
	maxOptions: 'please select max {{length}} options!',
	selectOptionValidation: 'Please select your {{field}}!',
	emptyFieldValidation: 'Please fill in the field!',
	photoRequiredValidation: 'Please upload a photo!',
	videoRequiredValidation: 'Please upload a video!',
	invalidOTP: 'The OTP has to be 6 numbers long.',
	acceptValidation: 'Please accept {{field}}!'
};

export default de;
