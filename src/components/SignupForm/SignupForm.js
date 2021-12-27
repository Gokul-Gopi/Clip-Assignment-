import React, { useEffect, useState } from 'react';
import './form.css';
import { storage } from '../../cdn';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {

    const { authState, authDispatch, signUpHandler } = useAuth();
    const Navigate = useNavigate();
    const [uploadProgress, setUploadProgress] = useState(0);
    const [userDetails, setUserDetails] = useState({
        fName: '',
        lName: '',
        email: '',
        pNum: '',
        pwd: '',
    });
    const [profilePic, setProfilePic] = useState('');

    const handleUserProfilePic = async () => {
        const storageRef = ref(storage, `/images/${profilePic.name}`);
        const uploadTask = uploadBytesResumable(storageRef, profilePic);

        uploadTask.on("state_changed", (snapShot) => {
            const progress = Math.round((snapShot.bytesTransferred / snapShot.totalBytes) * 100)
            setUploadProgress(progress)
        },
            (err) => { console.log(err.message) },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        return url
                    })
            }
        )
    }

    const registerUser = async (e) => {
        e.preventDefault();
        authDispatch({ type: 'LOADING' })

        if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(userDetails.email)) {

            handleUserProfilePic();
            const response = await signUpHandler({ ...userDetails, profilePic });
            if (response?.status === 201) {
                Navigate('/');
            }

        } else {
            alert("Invalid Email")
        }

        authDispatch({ type: 'LOADING' })
    }


    return (
        <form className='signup-form'>
            <div className='form-input'>
                <label>Firstname</label>
                <input type="text" onChange={(e) => setUserDetails((preState) => ({ ...preState, fName: e.target.value }))} value={userDetails.fName} />
            </div>

            <div className='form-input'>
                <label>Lastname</label>
                <input type="text" onChange={(e) => setUserDetails((preState) => ({ ...preState, lName: e.target.value }))} value={userDetails.lName} />
            </div>

            <div className='form-input'>
                <label>Email</label>
                <input type="text" onChange={(e) => setUserDetails((preState) => ({ ...preState, email: e.target.value }))} value={userDetails.email} />
            </div>

            <div className='form-input'>
                <label>Phone no.</label>
                <input type="text" onChange={(e) => setUserDetails((preState) => ({ ...preState, pNum: e.target.value }))} value={userDetails.pNum} />
            </div>

            <div className='form-input'>
                <label>Password</label>
                <input type="password" onChange={(e) => setUserDetails((preState) => ({ ...preState, pwd: e.target.value }))} value={userDetails.pwd} placeholder='Optional' />
            </div>

            <div className='form-input'>
                <label>Profile Picture</label>
                <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} />
            </div>

            <button onClick={registerUser}>{authState.loading ? 'Signing in..' : 'Resgister'}</button>
            <span className='desc'>Already have an account? <Link className='link' to='/login'>Login</Link></span>
        </form>
    )
}

export default SignupForm
