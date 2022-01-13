import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context';
import { logout } from '../../reducer/authReducer';

import s from './privatePage.module.css';

const PrivatePage = () => {
    const [state, dispatch] = useContext(AuthContext);

    if (!state?.isLoggedIn) {
        return <Navigate to='/login' />
    }

    const handleOnClick = () => {
        logout(dispatch)(state.rememberMe);
    }

    return (
        <div className={s.privatePage}>
            <span>{state.user}</span>, you have access to see private page.
            <div className={s.contentWrapper}>
                <div>If you want to go out</div>
                <button className={s.buttonSubmit} type='button' onClick={handleOnClick}>Click here to logout</button>
            </div>
        </div>
    )
}

export default PrivatePage;