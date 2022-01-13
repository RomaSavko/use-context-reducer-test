import React, { useContext, useEffect, useReducer } from 'react';
import './App.css';
import AuthContext from './context';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import authReducer from './reducer';
import { initialState, setLogin } from './reducer/authReducer';
import LoginPage from './components/loginPage';
import PrivatePage from './components/privatePage';

const App = () => {
  const [state, dispatch] = useContext(AuthContext);

  useEffect(() => {
    if (!state?.isLoggedIn && localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
      dispatch(setLogin({
        user: localStorage.getItem('user'),
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
        rememberMe: true,
      }));
    }
  
    if (!state?.isLoggedIn && sessionStorage.getItem('accessToken') && sessionStorage.getItem('refreshToken')) {
      dispatch(setLogin({
        user: sessionStorage.getItem('user'),
        accessToken: sessionStorage.getItem('accessToken'),
        refreshToken: sessionStorage.getItem('refreshToken'),
        rememberMe: false,
      }));
    }
  });

  return (
    <div className="App">
      <Routes >
        <Route path='/login' element={<LoginPage />} />
        <Route path='/private' element={<PrivatePage />} />
        <Route path='*' element={<Navigate to='/private' />} />
      </Routes>
    </div>
  );
}

const AppWithContext = () => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <Router>
      <AuthContext.Provider value={[state, dispatch]}>
        <App />
      </AuthContext.Provider>
    </Router>
  );
}

export default AppWithContext;
