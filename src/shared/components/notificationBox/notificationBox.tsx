import { Translate } from '../translate/translate';

interface NotificationBoxProps {
	message: string;
	icon: JSX.Element | string;
	className: string;
	textClassName?: string;
	isIconAfterText?: boolean;
}

export const NotificationBox: React.FC<NotificationBoxProps> = (props) => {
	const { message, icon, className, textClassName, isIconAfterText } = props;
	return (
		<div className={`position--absolute preview-notification top--12 ${className || 'left--12'}`}>
			<p className={`flex align-items--center text--white font--medium ${textClassName || ''}`}>
				{!!icon && !isIconAfterText && <span className="flex">{icon}</span>}
				<Translate text={message} />
				{!!icon && isIconAfterText && <span className="flex">{icon}</span>}
			</p>
		</div>
	);
};
