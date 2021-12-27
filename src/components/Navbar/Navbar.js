import React from 'react';
import '../Navbar/Navbar.css';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom'

const Navbar = () => {

    const { authState } = useAuth()
    return (
        <nav className='navbar-component'>
            <Link to='/' className='link'>
                <h2><AiOutlinePaperClip /> CLIP</h2>
            </Link>
            <Link to={authState.isLoggedIn ? '/profile' : '/login'}>
                <button><BiUserCircle className='icon' /> {authState.isLoggedIn ? 'User' : 'Login'}</button>
            </Link>
        </nav>
    )
}

export default Navbar
