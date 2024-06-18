import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import axiosClient from './axios-client';

function Signup() {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordconfirmationRef = useRef();
    const [error ,setError] = useState();

    const {setUser ,setToken} = useStateContext();

    const submit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordconfirmationRef.current.value
        }
        axiosClient.post('/signup',payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                const response = err.response;
                if(response && response.status === 422){
                        setError(response.data.errors)
                    }
            })
    }

    return (
        <div className='login-signup-form animated fadeInDown'>
            <div className="form">
                <h1 className="title">Create an account</h1>
                {error && <div className='alert'>
                    {Object.keys(error).map(key => (
                        <p key={key}> {error[key][0]} </p>
                    ))}
                </div>
                }
                <form onSubmit={submit}>
                    <input ref={nameRef} placeholder='Full Name' />
                    <input ref={emailRef} type="email" placeholder='Email Address' />
                    <input ref={passwordRef} type="password" placeholder='Password' />
                    <input ref={passwordconfirmationRef} type="password" placeholder='Password Confirmation' />
                    <button className='btn btn-block'>Sign Up</button>
                </form>
                <p className='message'>
                    Already have an account ?  <Link to='/login'>Sign In</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup
