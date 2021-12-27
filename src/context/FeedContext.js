import { createContext, useReducer, useContext } from "react";
import { removeBookmark, editBookmark } from "../ArrayManipulation";

const FeedContext = createContext();

const initialState = {
    feed: [],
    modal: false,
    loading: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_FEED': return { ...state, feed: action.payload, loading: !state.loading };

        case 'REMOVE_BOOKMARK': return { ...state, feed: removeBookmark(state.feed, action.payload) }

        case 'EDIT_BOOKMARK': return { ...state, feed: editBookmark(state.feed, action.payload, action.value) }

        case 'SET_MODAL': return { ...state, modal: action.payload }

        case 'LOADING': return { ...state, loading: !state.loading };

        default: return { ...state }
    }
}

const FeedProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <FeedContext.Provider value={{ state, dispatch }}>
            {children}
        </FeedContext.Provider>
    )
}

const useFeed = () => useContext(FeedContext)

export { FeedProvider, useFeed }
