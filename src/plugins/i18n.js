import { createI18n } from 'vue-i18n'
import fr from '../locales/french.json'
import en from '../locales/english.json'

const defaultLocale = 'fr'

const options = {
    legacy: false,
    locale: defaultLocale,
    fallbackLocale: defaultLocale,
    warnHtmlMessage: false,
    messages: {
      fr: fr,
      en: en,
    },
    datetimeFormats: {
      fr: {
        short: {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        },
      },
      en: {
        short: {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        },
      },
    },
    numberFormats: {
      fr: {
        currency: {
          style: 'currency',
          currency: 'EUR',
        },
      },
      en: {
        currency: {
          style: 'currency',
          currency: 'EUR',
        },
      },
    },
  }
  const i18n = createI18n(options)
  export default i18n