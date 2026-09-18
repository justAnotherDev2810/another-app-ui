import { environment } from '../../../environments/environment';

const BASE_URL = environment.userApiUrl;

export const API_ENDPOINTS = {
    USERS: {
        BASE: `${BASE_URL}/all`,
        CREATE_USER: `${BASE_URL}/createUser`,
        BY_ID: (id: string) => `${BASE_URL}/getById/${id}`,
        MODIFY_ID: (id: string) => `${BASE_URL}/modify/${id}`,
        DELETE_ID: (id: string) => `${BASE_URL}/delete/${id}`,
    },
    PROFILE: {
        BY_ID: (id: string) => `${BASE_URL}/profile/${id}`,
    }
} as const;