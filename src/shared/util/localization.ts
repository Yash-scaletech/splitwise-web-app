import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AuthService from 'shared/services/auth.service';
import en from './translation/en';
import de from './translation/de';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
	en: {
		translation: en
	},
	de: {
		translation: de
	}
};

i18n.use(initReactI18next as any) // passes i18n down to react-i18next
	.init({
		resources,
		lng: AuthService.getUserLanguage(),
		keySeparator: false, // we do not use keys in form messages.welcome
		interpolation: {
			escapeValue: false
		}
	});

export default i18n;
const refreshLanguage = (language: string) => {
	i18n.changeLanguage(language);
	localStorage.setItem('lang', language);
	window.location.reload();
};
export { refreshLanguage };
