import { HashDataType, InitialStateType, LoginDataType, SendingUserDataType } from '../types/types';

const SET_LOGIN: 'authReducer/setLogin' = 'authReducer/setLogin',
      SET_IS_LOADING: 'authReducer/setIsLoading' = 'authReducer/setIsLoading',
    //   UPDATE_TOKENS: 'authReducer/updateTokens' = 'authReducer/updateTokens',
      SET_LOGOUT: 'authReducer/setLogout' = 'authReducer/setLogout';


export const initialState = {
    user: null as null | string,
    accessToken: null as null | string,
    refreshToken: null as null | string,
    isLoggedIn: false as boolean,
    isLoading: false as boolean,
    rememberMe: false as boolean,
};

const authReducer = (state: InitialStateType, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_LOGIN:
        case SET_IS_LOADING:
        case SET_LOGOUT:
        return {
            ...state,
            ...action.payload,
        };
        default:
            return state;
    }
}

export type ActionType = ReturnType<typeof setIsLoading> |
                  ReturnType<typeof setLogout> |
                  ReturnType<typeof setLogin>

export const setLogin = (data: LoginDataType) => ({type: SET_LOGIN,
    payload: {
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        rememberMe: data.rememberMe,
        isLoggedIn: true,
    }
});

export const setIsLoading = (value: boolean) => ({type: SET_IS_LOADING, payload: {isLoading: value}});

export const setLogout = () => ({type: SET_LOGOUT, payload: {...initialState}});

const setTokensToStorage = ({accessToken, refreshToken, user}: HashDataType, rememberMe: boolean): void => {
    if (rememberMe) {
        sessionStorage.clear();
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', user);
    } else {
        localStorage.clear();
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        sessionStorage.setItem('user', user);
    }
}

export const loginUser = (dispatch: React.Dispatch<ActionType>) => ({user, password, rememberMe}: SendingUserDataType) => {
    dispatch(setIsLoading(true));
    if (user !== 'undefined' && password !== 'undefined') {
        setTimeout(() => {
            const accessToken = 'accessToken';
            const refreshToken = 'refreshToken';
            setTokensToStorage({accessToken, refreshToken, user}, rememberMe);
            dispatch(setLogin({user, accessToken, refreshToken, rememberMe}));
            dispatch(setIsLoading(false));
        }, 2000);
    }
}

export const logout = (dispatch: React.Dispatch<ActionType>) => (rememberMe: boolean) => {
    if (rememberMe) {
        localStorage.clear();
    } else {
        sessionStorage.clear();
    }
    dispatch(setLogout());
}

export default authReducer;