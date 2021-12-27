import { createContext, useReducer, useContext, useEffect } from "react";
import { networkCall } from '../networkCall'

const AuthContext = createContext();

const initialState = {
    currentUserName: '',
    currentUserToken: '',
    isLoggedIn: false,
    loading: false
}

const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER': return { ...state, currentUserName: action.payload, isLoggedIn: true }

        case 'SET_USER_TOKEN': return { ...state, currentUserToken: action.payload }

        case 'LOADING': return { ...state, loading: !state.loading }

        default: return { ...state }
    }
}

const AuthProvider = ({ children }) => {
    const [authState, authDispatch] = useReducer(authReducer, initialState)

    useEffect(() => {
        const user = JSON.parse(localStorage?.getItem('userDetails'));
        user?.name && authDispatch({ type: 'SET_USER', payload: user.name })
        user?.token && authDispatch({ type: 'SET_USER_TOKEN', payload: user.token })
    }, [])

    const signUpHandler = async (userDetails) => {
        const response = await networkCall('/user/signup', 'POST', userDetails);
        if (response?.status === 201) {
            const { name, token } = response.data;
            localStorage.setItem('userDetails', `${JSON.stringify({ name, token })}`);
            authDispatch({ type: "SET_USER", payload: name });
            authDispatch({ type: "SET_USER_TOKEN", payload: token });
        }
        return response
    }

    const loginHandler = async (userDetails) => {
        let response = await networkCall('/user/login', 'POST', userDetails);
        if (response?.status === 200) {
            const user = response.data;
            authDispatch({ type: "SET_USER", payload: user.name });
            authDispatch({ type: "SET_USER_TOKEN", payload: user.token });
            localStorage.setItem('userDetails', JSON.stringify({
                name: user.name,
                token: user.token,
            }))
        }
        return response;
    }

    return (
        <AuthContext.Provider value={{ authState, authDispatch, signUpHandler, loginHandler }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }