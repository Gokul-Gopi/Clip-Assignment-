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
    const { state, dispatch } = useFeed()

    const changePassword = async () => {
        dispatch({ type: 'LOADING' });
        const response = await networkCall('/user/resetpassword', 'PUT', userDetails);
        console.log(response)
        if (response.staus === 200) {
            Navigate('/login');
        }
        dispatch({ type: 'LOADING' });
    }

    return (
        <div className='reset-page'>
            <form className='reset-pwd'>
                <div className='form-input'>
                    <label>Email</label>
                    <input type="text" onChange={(e) => setUserDetails(preState => ({ ...preState, email: e.target.value }))} value={userDetails.email} />
                </div>

                <div>
                    <label>New Passowrd</label>
                    <input type="text" onChange={(e) => setUserDetails(preState => ({ ...preState, newPwd: e.target.value }))} value={userDetails.newPwd} />
                </div>

                <button onClick={changePassword}>Change Password</button>
            </form>
        </div>
    )
}

export default ResetPassword
