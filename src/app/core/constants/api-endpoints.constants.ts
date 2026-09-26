import { environment } from '../../../environments/environment';

const BASE_USER_URL = environment.userApiUrl;
const BASE_EXPENSE_URL = environment.expenseApiUrl;
const BASE_CATEGORY_URL = environment.categoryApiUrl;

export const API_ENDPOINTS = {
    USERS: {
        BASE: `${BASE_USER_URL}/all`,
        CREATE_USER: `${BASE_USER_URL}/createUser`,
        BY_ID: (id: string) => `${BASE_USER_URL}/getById/${id}`,
        MODIFY_ID: (id: string) => `${BASE_USER_URL}/modify/${id}`,
        DELETE_ID: (id: string) => `${BASE_USER_URL}/delete/${id}`,
    },
    PROFILE: {
        BY_ID: (id: string) => `${BASE_USER_URL}/profile/${id}`,
    },
    // Inside API_ENDPOINTS constant object
    CATEGORIES: {
        BASE: `${BASE_CATEGORY_URL}/all`
    },
    EXPENSES: {
        BASE: `${BASE_EXPENSE_URL}/all`,
        TOTAL: `${BASE_EXPENSE_URL}/total`
    }
} as const;