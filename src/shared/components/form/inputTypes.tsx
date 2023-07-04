import { ErrorMessage, Field } from 'formik';
import React, { useEffect, useState } from 'react';

interface TextFieldProps {
	name: string;
	type: string;
	label?: string;
	className?: string;
	disabled?: boolean;
	rows?: number;
	placeholder?: string;
	readOnly?: boolean;
	inputMode?: string;
	errorClass?: string;
	isHideError?: boolean;
	maxLength?: number;
	hideLengthCount?: boolean;
	autoCapitalize?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	isError?: boolean;
	autoFocus?: boolean;
	step?: number;
	domain?: string;
	autoComplete?: string;
}
/**
 * common input field component
 * @param props { field, form: { touched, errors }, ...props }
 */
export const RenderInput: React.FC<InputPlaceHolder & { field: any; form: any }> = (props) => {
	const field = props.field;
	const [count, setCount] = useState(0);
	useEffect(() => {
		if (props.maxLength || props.type === 'textarea') {
			if (field.value) {
				let length = field.value.match(/./gu).length;
				if (props.type === 'textarea') {
					length = length + (field.value.match(/[^\n]*\n[^\n]*/gi) || []).length;
				}
				setCount(length || 0);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onBlur = (e: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>) => {
		props.form.setFieldValue(
			props.name,
			typeof props.field.value === 'string' ? props.field.value.trim() : props.field.value
		);
		props.field.onBlur(e);
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.form.setFieldValue(props.name, event.target.value);
	};

	switch (props.type) {
		case 'textarea':
			return (
				<>
					<div className="textarea__item position--relative">
						{props.label && <p className="caption mt--0 mb--8 font--bold width--full">{props.label}</p>}
						<textarea
							{...field}
							onBlur={onBlur}
							rows={props.rows || 4}
							className={`form__input textarea ${props.className || ''}`}
							placeholder={props.placeholder || ''}
							readOnly={props.readOnly}
							autoComplete="off"
							disabled={!!props.disabled}
							onChange={props.onChange}
							autoFocus={props.autoFocus || false}
						/>
						{!props.hideLengthCount && props.maxLength && (
							<span
								className={`max-length-count font-size--12 ${
									!!field.value ? 'text--black' : 'text--grey-500'
								} bg--white position--absolute ${props.isError ? 'max-length-count--with-error' : ''}`}
							>
								{props.maxLength - count}
							</span>
						)}
					</div>
					<ErrorMessage className={props.errorClass || ''} name={field.name} component={fieldErrorMessage} />
				</>
			);
		case 'range':
			return (
				<div>
					<div className="range__value position--absolute left--0 z-index--1 width--full">
						<div
							className={`height--full ${field.value > 0 ? 'bg--primary-500' : ''} border-radius--md`}
							style={{ width: `${(Number(field.value) * 100) / Number(props.maxRange)}%` }}
						/>
					</div>
					<input
						{...field}
						className={`form__input--range ${props.className}`}
						type="range"
						min={props.minRange}
						max={props.maxRange}
						onChange={props.onChange ? props.onChange : onChange}
						name={props.name}
						placeholder={props.placeholder}
						step={props.step || 1}
					/>
				</div>
			);
		default:
			return (
				<>
					{props.label && <p className="caption mt--0 mb--8 font--bold width--full">{props.label}</p>}
					{props.isSpan && (
						<span className="placeholder__span position--absolute text--grey-500 font-size--10">
							{props.placeholder}
						</span>
					)}
					<div className="input__item position--relative">
						<input
							{...field}
							onBlur={onBlur}
							inputMode={props.inputMode || 'text'}
							autoCapitalize={props.autoCapitalize}
							type={props.type}
							className={`form__input ${
								!props.hideLengthCount && props.maxLength ? 'with--max-length' : ''
							} ${props.className || ''} ${props.isSpan ? 'pt--5' : ' '}`}
							placeholder={props.placeholder || ''}
							readOnly={props.readOnly}
							autoComplete={props.autoComplete || 'off'}
							disabled={props.disabled ? props.disabled : false}
							onChange={props.onChange}
							autoFocus={props.autoFocus || false}
						/>
						{!props.hideLengthCount && props.maxLength && (
							<span
								className={`max-length-count font-size--12 text--grey-500 bg--white position--absolute ${
									!!field.value ? 'text--black' : 'text--grey-500'
								} ${props.isError ? 'max-length-count--with-error' : ''}`}
							>
								{props.maxLength - count}
							</span>
						)}
					</div>

					{!props.isHideError && (
						<ErrorMessage
							className={props.errorClass || ''}
							name={field.name}
							component={fieldErrorMessage}
						/>
					)}
				</>
			);
	}
};

/**
 * common input field component
 * renders input based on the field configuration
 * @param props { field, form: { touched, errors }, ...props }
 */

interface InputPlaceHolder extends TextFieldProps {
	isSpan?: boolean;
	isValid?: boolean;
	minRange?: number;
	maxRange?: number;
}

export const Input: React.FC<InputPlaceHolder> = (props) => {
	const fieldRender = ({ field, form }: { field: any; form: any }) => {
		return <RenderInput {...props} field={field} form={form} />;
	};

	return <Field name={props.name} render={fieldRender} />;
};

/**
 * common field error message component
 * @param props
 */
export const fieldErrorMessage = (props: any) => <p className="error text--error-500">{props.children}</p>;
