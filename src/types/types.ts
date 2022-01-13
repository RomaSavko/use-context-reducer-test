import { initialState } from '../reducer/authReducer';

export type InitialStateType = typeof initialState;

export type LoginDataType = Omit<InitialStateType, 'isLoading' | 'isLoggedIn' >;

export type HashDataType = {
    accessToken: string
    refreshToken: string
    user: string
}

export type ErrorsFormType = {
    user?: string
    password?: string
}

export type SendingUserDataType = {
    user: string
    password: string
    rememberMe: boolean
}