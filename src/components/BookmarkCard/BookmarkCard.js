import React from 'react';
import '../BookmarkCard/BookmarkCard.css';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { BiEditAlt } from 'react-icons/bi';
import { networkCall } from '../../networkCall';
import { useFeed } from '../../context/FeedContext';


const BookmarkCard = ({ bookmark }) => {

    const { dispatch } = useFeed();

    const bookmarkDeleteHandler = async () => {
        const response = await networkCall('/bookmark', "DELETE", { bookmarkID: bookmark._id });
        if (response?.data?.success) {
            dispatch({ type: 'REMOVE_BOOKMARK', payload: bookmark._id })
        }
    }

    const openModal = () => {
        dispatch({ type: 'SET_MODAL', payload: bookmark._id })
    }

    return (
        <div className='bookmark-card'>
            <div className="name">
                <BsFillBookmarkCheckFill /><span>{bookmark?.url}</span>
            </div>
            <div className="desc">
                <span>{bookmark?.description?.length > 1 ? bookmark?.description : 'Description'}</span>
                <button className='card-btn1' onClick={openModal}><BiEditAlt /></button>
                <button className='card-btn2' onClick={bookmarkDeleteHandler}><MdDelete /></button>
            </div>
        </div>
    )
}

export default BookmarkCard
