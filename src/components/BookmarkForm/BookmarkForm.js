import React from 'react'
import '../SignupForm/form.css'
import '../BookmarkForm/BookmarkForm.css'
import { useState } from 'react/cjs/react.development'
import { networkCall } from '../../networkCall'
import { useFeed } from '../../context/FeedContext'

const BookmarkForm = () => {

    const { state, dispatch } = useFeed();
    const [bookmarkDetails, setBookmarkDetails] = useState({
        url: '',
        desc: ''
    });

    const createBookmark = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOADING' })
        const response = await networkCall('/bookmark', 'POST', bookmarkDetails);
        if (response.status === 200) {
            dispatch({ type: 'LOADING' })
            alert('Bookmark successfully created')
        }
        // setBookmarkDetails(preState => ({ ...preState, url: '', desc: '' }));
    }

    return (
        <form className='bookmark-form'>
            <div className='form-input'>
                <label>URL</label>
                <input type="text" onChange={(e) => setBookmarkDetails(preState => ({ ...preState, url: e.target.value }))} value={bookmarkDetails.url} />
            </div>

            <div className='form-input'>
                <label>Description</label>
                <textarea className='desc-area' placeholder='Optional' onChange={(e) => setBookmarkDetails(preState => ({ ...preState, desc: e.target.value }))} value={bookmarkDetails.desc}></textarea>
            </div>

            <button onClick={createBookmark}>{state.loading ? 'Clipping..' : 'Clip it'}</button>
        </form>
    )
}

export default BookmarkForm
