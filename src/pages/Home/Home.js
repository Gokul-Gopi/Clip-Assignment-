import React, { useEffect } from 'react'
import BookmarkCard from '../../components/BookmarkCard/BookmarkCard';
import EditCardPopup from '../../components/EditCardPopup/EditCardPopup';
import { useAuth } from '../../context/AuthContext';
import { useFeed } from '../../context/FeedContext';
import { networkCall } from '../../networkCall';
import '../Home/Home.css'


const Home = () => {

    const { authState } = useAuth();
    const { state, dispatch } = useFeed();

    useEffect(() => {
        const getAllBookmarks = async () => {
            dispatch({ type: 'LOADING' })
            const response = await networkCall('/bookmark', 'GET');
            if (response.status === 200) {
                dispatch({ type: 'SET_FEED', payload: response.data.feed })
            }
        }

        if (authState.currentUserToken) {
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
