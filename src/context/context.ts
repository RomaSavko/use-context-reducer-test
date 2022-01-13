import { createContext } from 'react';
import { InitialStateType } from '../types/types';

type AuthContextType = [state: InitialStateType, dispatch: any] | [];

const AuthContext = createContext<AuthContextType>([]);

export default AuthContext;