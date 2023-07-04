import HeaderStyles from './header.module.scss';

interface IProps {
	className?: string;
}

const HeaderHoc: React.FC<IProps> = (props) => {
	return (
		<>
			<header
				className={`${HeaderStyles['header']} ${
					HeaderStyles[props.className || '']
				} bg--white width--full flex align-items--center position--fixed z-index--1 box-size--border-box top--0`}
			>
				{props.children}
			</header>
		</>
	);
};

export default HeaderHoc;
