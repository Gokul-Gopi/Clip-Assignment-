import React from 'react';
import { useState } from 'react/cjs/react.development';
import { useFeed } from '../../context/FeedContext';
import { networkCall } from '../../networkCall';
import '../EditCardPopup/EditCardPopup.css'

const EditCardPopup = () => {

    const { state, dispatch } = useFeed()
    const [editedDetails, setEditedDetails] = useState({
        url: '',
        desc: ''
    })

    const editBookmark = async () => {
        dispatch({ type: 'LOADING' })
        const response = await networkCall(`/bookmark/${state.modal}`, 'PUT', editedDetails);
        if (response.status === 200) {
            dispatch({ type: 'EDIT_BOOKMARK', payload: state.modal, value: editedDetails });
            dispatch({ type: 'SET_MODAL', payload: '' })
        };
        dispatch({ type: 'LOADING' })
    }

    return (
        <div className='edit-card' style={{ display: state.modal && 'block' }} onClick={() => dispatch({ type: 'SET_MODAL' })}>
            <div className='edit-input' onClick={(e) => e.stopPropagation()}>
                <input type="text" placeholder='URL' className='url' onChange={(e) => setEditedDetails(preState => ({ ...preState, url: e.target.value }))} value={editedDetails.url} />

                <input type="text" placeholder='Description' className='description' onChange={(e) => setEditedDetails(preState => ({ ...preState, desc: e.target.value }))} value={editedDetails.desc} />

                <button onClick={editBookmark}>{state.loading ? 'Saving..' : 'Save'}</button>
            </div>
        </div>
    )
}

export default EditCardPopup
