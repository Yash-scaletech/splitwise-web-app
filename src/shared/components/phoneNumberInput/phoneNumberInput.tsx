import React from 'react';
import PhoneInput from 'react-phone-number-input';

import 'react-phone-number-input/style.css';

import { isIosDevice } from 'shared/utility';

interface Props {
	className?: string;
	name: string;
	onChange: (value: any) => void;
	value: any;
	onFocus?: () => void;
	onBlur?: () => void;
	disabled?: boolean;
	readonly?: boolean;
	autoFocus?: boolean;
	isValid?: boolean;
}

export const PhoneNumberInput: React.FC<Props> = (props) => {
	const { className, value, onChange, onBlur, onFocus, disabled, name, readonly, autoFocus } = props;
	return (
		<>
			<PhoneInput
				className={`form__input no--padding ${className || ''} `}
				autoComplete="off"
				defaultCountry="DE"
				name={name}
				international
				inputMode="numeric"
				countryCallingCodeEditable={!isIosDevice}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
				disabled={disabled}
				readOnly={readonly}
				autoFocus={autoFocus}
			/>
		</>
	);
};
