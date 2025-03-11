import { currencyOptions } from './inputOptions';

//REGEXS
export const phoneRegex = new RegExp(
  /^\+48 ?\d{3} ?\d{3} ?\d{3}$|^\d{7,10}$|^\d{9}$|^\d{3} ?\d{3} ?\d{3}$/
);

export const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

//DATES
export const DATE_FORMAT = 'dd.MM.yyyy';

//CONTACT DATA
export const contactPhone: {
  label: string;
  value: string;
} = { label: '+48 505 184 510', value: '+48505184510' };
export const contactEmail: string = 'futbolovo.contact@gmail.com';

//GOOGLE PLACES
export const MAX_ZOOM_LEVEL = 14;

//AUTH MESSAGES
export const authMessages = {
  credentialsRequired: 'credentialsRequired',
  userNotFound: 'userNotFound',
  invalidPassword: 'invalidPassword',
  emailExists: 'emailExists',
};

export const DEFAULT_CURRENCY = currencyOptions[0].value;
