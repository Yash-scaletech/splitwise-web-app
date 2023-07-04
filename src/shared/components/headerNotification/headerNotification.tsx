import React from 'react';
import { Translate } from '../translate/translate';

interface Props {
	leftText: { type: string; value: any };
	heading: string;
	rightText: string;
	leftClick: () => void;
	rightClick: () => void;
	wrapperClassName?: string;
	isCenterHeading?: boolean;
	disableCapitalization?: boolean;
	classNames?: { left?: string; center?: string; right?: string };
}

export const HeaderNotification: React.FC<Props> = (props) => {
	const {
		heading,
		leftClick,
		rightClick,
		isCenterHeading,
		leftText,
		rightText,
		classNames,
		disableCapitalization = false,
		wrapperClassName
	} = props;
	const isTextNotAvailable = !leftText.type || !rightText;

	return (
		<div
			className={`header__notification flex ${
				isTextNotAvailable || isCenterHeading ? 'justify-content--center' : 'justify-content--between'
			} ${wrapperClassName || ''} align-items--center position--relative`}
		>
			{leftText.type === 'text' && (
				<p
					onClick={leftClick}
					className={`${classNames?.left} left ${
						isTextNotAvailable ? 'position--absolute  left--16 top--16' : ''
					} font-size--12`}
				>
					<Translate text={leftText.value} />
				</p>
			)}
			{leftText.type === 'icon' && (
				<button
					onClick={leftClick}
					className={`btn--info ${classNames?.left} ${
						isTextNotAvailable ? 'position--absolute left--16 top--16' : ''
					}`}
				>
					{leftText.value}
				</button>
			)}
			<p
				className={`text--black font-size--browser-default font--bold ${
					!disableCapitalization ? 'text--capitalize' : ''
				} heading`}
			>
				{<Translate text={heading} />}
			</p>
			<p
				onClick={rightClick}
				className={`${classNames?.right} right ${
					isTextNotAvailable ? 'position--absolute  right--16 top--16' : ''
				} font-size--12`}
			>
				{<Translate text={rightText} />}
			</p>
		</div>
	);
};
