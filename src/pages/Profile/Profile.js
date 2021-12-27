import React, { useState, useEffect } from 'react';
import '../Profile/Profile.css'
import { useAuth } from '../../context/AuthContext';
import { networkCall } from '../../networkCall';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import BookmarkForm from '../../components/BookmarkForm/BookmarkForm';
import { useFeed } from '../../context/FeedContext';

const Profile = () => {

    const { authState } = useAuth();
    const { state, dispatch } = useFeed()
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const getUserDetails = async () => {
            dispatch({ type: 'LOADING' })
            const response = await networkCall('/user', "GET");
            if (response?.data) {
                setUserInfo(response.data)
                dispatch({ type: 'LOADING' })
            }
        }
        if (authState.currentUserToken) {
            getUserDetails();
        }
    }, [authState])



    return (
        <div className='profile-page'>
            {state.loading
                ? <span className='.loading'>Loading...</span>
                : <>
                    <ProfileCard userInfo={userInfo} />
                    <BookmarkForm />
                </>
            }
        </div>
    )
}

export default Profile
