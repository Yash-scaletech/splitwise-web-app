import { useTranslation } from 'react-i18next';

const Translate: React.FC<{ text: string }> = (props) => {
	const { t } = useTranslation();
	return t(props.text);
};

export { Translate };
