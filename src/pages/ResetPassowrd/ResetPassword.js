import React from 'react';
import '../../components/SignupForm/form.css';
import '../ResetPassowrd/ResetPassword.css';
import { useState } from 'react/cjs/react.development';
import { networkCall } from '../../networkCall';
import { useFeed } from '../../context/FeedContext';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {

    const Navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({
        email: '',
        newPwd: ''
    })
    const { state, dispatch } = useFeed();
    const [error, setError] = useState('')

    const changePassword = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOADING' });
        const response = await networkCall('/user/resetpassword', 'PUT', userDetails);
        console.log(error, response)
        if (response.status === 200) {
            Navigate('/login');
        } else {
            setError('User doesn\'t exist')
        }
        dispatch({ type: 'LOADING' });
    }

    return (
        <div className='reset-page'>
            <form className='reset-pwd'>
                <span className='error'>{error}</span>
                <div className='form-input'>
                    <label>Email</label>
                    <input type="text" onChange={(e) => setUserDetails(preState => ({ ...preState, email: e.target.value }))} value={userDetails.email} />
                </div>

                <div>
                    <label>New Passowrd</label>
                    <input type="text" onChange={(e) => setUserDetails(preState => ({ ...preState, newPwd: e.target.value }))} value={userDetails.newPwd} />
                </div>

                <button onClick={changePassword}>{state.loading ? 'Hold on a sec..' : 'Reset'} </button>
            </form>
        </div>
    )
}

export default ResetPassword
