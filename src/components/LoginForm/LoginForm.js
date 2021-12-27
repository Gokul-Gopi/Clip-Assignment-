import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import '../SignupForm/form.css'
import { Link, useNavigate } from 'react-router-dom'

const LoginForm = () => {

    const Navigate = useNavigate();
    const { authState, authDispatch, loginHandler } = useAuth();
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        pwd: '',
    });
    const [error, setError] = useState();

    const loginUser = async (e) => {
        e.preventDefault();
        authDispatch({ type: 'LOADING' });

        if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(userCredentials.email)) {
            setError('Invalid email')
            authDispatch({ type: 'LOADING' });
            return
        }

        const response = await loginHandler(userCredentials)

        if (response.status === 200) {
            setUserCredentials({ pNum: '', email: '', })
            Navigate('/');
        } else if (response.status === 404) {
            console.log('else if')
            setError('email & password doesn\'t match')
        }
        authDispatch({ type: 'LOADING' });
    };


    return (
        <form className='login-form'>
            <span className='error'>{error}</span>
            <div className='form-input'>
                <label>Email</label>
                <input type="text" onChange={(e) => { setUserCredentials(preState => ({ ...preState, email: e.target.value })) }} />
            </div>

            <div className='form-input'>
                <label>Password</label>
                <input type="password" onChange={(e) => { setUserCredentials(preState => ({ ...preState, pwd: e.target.value })) }} />
            </div>

            <button onClick={loginUser}>{authState.loading ? 'Logging in...' : 'Login'}</button>
            <span className='desc'>Don't have an account? <Link className='link' to='/signup'>Sign Up</Link></span>
            <span className='desc'>Forgot Password? <Link className='link' to='/reset'>Reset</Link></span>
        </form>
    )
}

export default LoginForm
