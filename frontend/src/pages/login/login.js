import React, { useState } from 'react'
import { BsFillExclamationTriangleFill, BsExclamationCircleFill } from 'react-icons/bs'

import './login.css'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState()

    const dummyUser = {
        username: 'Benedict-J',
        password: '123ab'
    }

    const submitHandler = e => {
        e.preventDefault();

        if(dummyUser.username === username && dummyUser.password === password) {
            console.log('Working authentication')
        } else {
            setAlert(
                <div className='error'>
                    <BsFillExclamationTriangleFill className='danger-icon' />
                    <h3>Incorrect username or password</h3>
                </div>
            )
        }
    }

    return (
        <div className='flex-container'>
            <div id='loginContent'>
                <div id='content-container'>
                    <h1>Login</h1>
                    <div id='alert'>
                        {alert}
                    </div>
                    <form>
                        <input id='username-field' name='username' type='text' placeholder='Username' onChange={ e => { setUsername(e.target.value) }} />
                        {/* Maybe not going to use this */}
                        {/* <div className='empty-warning' hidden>
                            <BsExclamationCircleFill className='circle-exclamaination' />
                            This field cannot be empty
                        </div> */}
                        <input id='password-field' type='password' placeholder='*********' onChange={ e => { setPassword(e.target.value) }} />
                        {/* Maybe not going to use this */}
                        {/* <div className='empty-warning' hidden>
                            <BsExclamationCircleFill className='circle-exclamaination' />
                            This field cannot be empty
                        </div> */}
                        <a id='forgot-password-link' href='/forgot-password'>Forgot password?</a>
                        <input type='submit' onClick={submitHandler} />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;