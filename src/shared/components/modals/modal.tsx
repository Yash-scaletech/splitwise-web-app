import { Translate } from 'shared/components/translate/translate';

import 'assets/styles/common/components/modal.scss';

export interface IModalProps {
	className?: string;
	headerClass?: string;
	bodyClass?: string;
	heading?: string;
	hideCloseBtn?: boolean;
	onClose?: () => void;
	isOverFlowAdd?: boolean;
	isBackButton?: boolean;
	oldScrollPosition?: number;
	handleBackClick?: () => void;
	isHeaderRightIcon?: boolean;
	rightIconConfig?: { icon: JSX.Element; onClick: () => void };
}

const Modal: React.FC<IModalProps> = (props) => {
	return (
		<div className={`modal flex flex--column justify-content--end ${props.className || ''}`}>
			{props.heading && (
				<div
					className={`modal__heading bg--white width--full box-size--border-box flex justify-content--center align-items--center position--relative ${
						props.headerClass || ''
					}`}
				>
					<p className={`text--center font-size--14 font--bold line-height--17 no--margin`}>
						<Translate text={props.heading} />
					</p>
				</div>
			)}
			<div className={`modal__body box-size--border-box bg--white width--full ${props.bodyClass || ''}`}>
				{props.children}
			</div>
		</div>
	);
};

export default Modal;
