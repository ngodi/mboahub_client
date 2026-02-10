/* eslint-disable camelcase */
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const HOUSES_URL = `/${BASE_URL}/houses`;
export const MY_HOUSES_URL = `/${BASE_URL}/my/houses`;
export const getHouseUrl = (house_id) => `/${BASE_URL}/houses/${house_id}`;
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const ME_URL = `/${BASE_URL}/me`;
export const OTP_RESEND_URL = `/${BASE_URL}/auth/otp-resend`;
export const SIGNUP_URL = `/${BASE_URL}/auth/register`;
export const LOGOUT_URL = `/${BASE_URL}/auth/logout`;
export const USER_DETAILS_URL = `/${BASE_URL}/my/details`;

export const PASSWORD_UPDATE_URL = `/${BASE_URL}/password/change`;
export const PASSWORD_FORGOT_URL = `/${BASE_URL}/password/forgot`;
export const PASSWORD_VERIFY_URL = `/${BASE_URL}/password/verify`;
export const PASSWORD_RESET_URL = `/${BASE_URL}/password/reset`;

export const MESSAGE_CREATE_URL = `/${BASE_URL}/messages`;
export const ANONYMOUS_MESSAGE_URL = `/${BASE_URL}/messages/anonymous_create`;
export const OTP_VERIFY_URL = `/${BASE_URL}/auth/verify`;
