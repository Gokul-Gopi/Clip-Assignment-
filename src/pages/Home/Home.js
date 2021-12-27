import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import BookmarkCard from '../../components/BookmarkCard/BookmarkCard';
import EditCardPopup from '../../components/EditCardPopup/EditCardPopup';
import { useAuth } from '../../context/AuthContext';
import { useFeed } from '../../context/FeedContext';
import { networkCall } from '../../networkCall';
import '../Home/Home.css'


const Home = () => {

    const { authState } = useAuth();
    const { state, dispatch } = useFeed();
    const Navigate = useNavigate();

    useEffect(() => {
        if (!authState.isLoggedIn) {
            Navigate('/login')
            console.log('useffect1')
        }
    }, [])


    useEffect(() => {
        console.log('useffect2')
        const getAllBookmarks = async () => {
            dispatch({ type: 'LOADING' })
            const response = await networkCall('/bookmark', 'GET');
            if (response.status === 200) {
                dispatch({ type: 'SET_FEED', payload: response.data.feed })
            }
        }

        if (authState.currentUserToken) {
            console.log('useffect3')
            getAllBookmarks();
        };

    }, [authState]);

    return (
        <div className='home-page'>
            <EditCardPopup />
            {
                state.loading
                    ? <span className='loading'>Loading...</span>
                    : state.feed.map(e => {
                        return <BookmarkCard key={e._id} bookmark={e} />
                    })
            }
        </div>
    )
}

export default Home
