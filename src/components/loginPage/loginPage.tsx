import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context';
import { loginUser } from '../../reducer/authReducer';
import { ErrorsFormType } from '../../types/types';

import s from './loginPage.module.css';

const LoginPage = () => {
    const [state, dispatch] = useContext(AuthContext);

    const login = useFormik({
        initialValues: {
          user: '',
          password: '',
          rememberMe: false
        },
        onSubmit: (values) => {
            loginUser(dispatch)(values);
        },
        validate: ({user, password}) => {
            let errors: ErrorsFormType = {};

            if (user === '') {
                errors.user = '* This field cannot be empty.';
            }
            if (password === '') {
                errors.password = '* This field cannot be empty.';
            } else if (password.length > 20) {
                errors.password = `* It's too much symbols. Max length is ${20}`;
            }
            return errors;
        }
    });

    if (state?.isLoggedIn) {
        return <Navigate to='/private' />
    }

    return (
        <div className={s.loginPage}>
        <div className={s.loginFormWrapper}>
            <form className={s.loginForm} onSubmit={login.handleSubmit} >
                <div className={s.formBasic}>
                    <label htmlFor='user' className={s.label}>Enter name</label>
                    <input className={s.input}
                        required
                        type='user'
                        placeholder='Your name'
                        id='user'
                        name='user'
                        onChange={login.handleChange}
                        value={login.values.user} />
                </div>
                {login.errors.user && <div className={s.error}>{login.errors.user}</div>}
                <div className={s.formBasic}>
                    <label htmlFor='password' className={s.label}>Password&nbsp;</label>
                    <input className={s.input}
                        required
                        type='password'
                        placeholder='Enter password'
                        id='password'
                        name='password'
                        onChange={login.handleChange}
                        value={login.values.password} />
                </div>
                {login.errors.password&& <div className={s.error}>{login.errors.password}</div>}
                <div className={s.formCheckbox}>
                    <input
                        type='checkbox'
                        id='rememberMe'
                        name='rememberMe'
                        onChange={login.handleChange}
                        checked={login.values.rememberMe} />
                    <span className={s.rememberMe}>Remember me</span>
                </div>
                <div className={s.wrapperStyle}>
                    <button type='submit' className={s.btnStyle}>Submit</button>
                </div>
            </form>
            {
                state?.isLoading && <div className={s.formAdditionalInfo}>
                    Data is uploading. Please wait.
                </div>
            }
        </div>
    </div>
    )
}

export default LoginPage;