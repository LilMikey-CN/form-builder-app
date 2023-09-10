export const API_BASE_URL = process.env.REACT_APP_API_ENDPOINT;
export const FORMS_ENDPOINT = '/forms';
export const FORM_RESPONSES_ENDPOINT = (formId) => `/forms/${formId}/responses`;
export const SINGLE_FORM_ENDPOINT = (formId) => `/forms/${formId}`;

