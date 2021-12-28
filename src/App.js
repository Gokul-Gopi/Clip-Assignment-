import './App.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Profile from './pages/Profile/Profile';
import { defaultHeaderForToken } from './networkCall';
import { useAuth } from './context/AuthContext';
import ResetPassword from './pages/ResetPassowrd/ResetPassword';

function App() {
  const { authState, authDispatch } = useAuth();
  defaultHeaderForToken(authState.currentUserToken);

  useEffect(() => {
    const user = JSON.parse(localStorage?.getItem('userDetails'));
    user?.name && authDispatch({ type: 'SET_USER', payload: user.name });
    user?.token && authDispatch({ type: 'SET_USER_TOKEN', payload: user.token });
  }, [])

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="reset" element={<ResetPassword />} />
        <Route path="profile" element={<Profile />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
