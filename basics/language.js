import universalLanguageDetect from '@unly/universal-language-detector';

const detect = (supportedLanguages, defaultLanguage) =>
	universalLanguageDetect({
		supportedLanguages: supportedLanguages,
		fallbackLanguage: defaultLanguage,
	});

export { detect };
