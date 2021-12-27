import React from 'react';
import '../ProfileCard/ProfileCard.css';
import { FiMail } from 'react-icons/fi';
import { AiOutlineKey } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProfileCard = ({ userInfo }) => {

    const Navigate = useNavigate();
    const { authDispatch } = useAuth();

    const logoutHandler = () => {
        localStorage.removeItem('userDetails');
        authDispatch({ type: 'RESET' });
        Navigate('/login');
        window.location.reload()
    }

    return (
        <div className="profile-card">
            <div className="image">
                <img src={userInfo?.profilePic} alt="" />
            </div>

            <div className='user-details'>
                <div className="primary-details">
                    <span>{userInfo?.fName}</span>
                    <span>{userInfo?.lName}</span>
                </div>

                <div className="sec-details">
                    <span><FiMail className='icon' /> {userInfo?.email}</span>
                    <span><AiOutlineKey className='icon' /> {userInfo?.pwd}</span>
                    <button className='logout-btn' onClick={logoutHandler}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard
