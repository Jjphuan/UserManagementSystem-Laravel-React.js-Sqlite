import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import axiosClient from './axios-client';

function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [error ,setError] = useState();

    const {setUser ,setToken} = useStateContext();

    const submit = (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post('/login',payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                const response = err.response;
                if(response && response.status === 422){
                    if (response.data.errors) {
                        setError(response.data.errors)
                    } else {
                        setError({
                            email: [response.data.message]
                        })
                    }
                        
                }
            })
    }

    return (
        <div className='login-signup-form animated fadeInDown'>
            <div className="form">
                <h1 className="title">Login Page</h1>
                {error && <div className='alert'>
                    {Object.keys(error).map(key => (
                        <p key={key}> {error[key][0]} </p>
                    ))}
                </div>
                }
                <form onSubmit={submit}>
                    <input ref={emailRef} type="email" placeholder='Email' />
                    <input ref={passwordRef} type="password" placeholder='Password' />
                    <button className='btn btn-block'>Login</button>
                </form>
                <p className='message'>
                    Not Registered ?  <Link to='/signup'>Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
