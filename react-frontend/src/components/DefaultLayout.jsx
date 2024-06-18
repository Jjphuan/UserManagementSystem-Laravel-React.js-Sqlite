import React, { useEffect } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../views/axios-client';

function DefaultLayout() {

    const {user, token, notification, setUser, setToken} = useStateContext();

    if(!token){
        return <Navigate to='/login'/>
    }

    const toLogout = (e) => {
        e.preventDefault();

        axiosClient.post('/logout')
            .then(()=>{
                setUser({})
                setToken(null)
            })
    };

    useEffect(()=>{
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
    },[])

    return (
        <div id="defaultLayout">
            
            <div className="content">
                <header>
                    <div>
                        <Link to='/user' className='link'><h1 className='title'>User Management System</h1></Link>
                        {/* <nav className='navbar'>
                            <Link className='link' to='/dashboard'>Dashboard</Link>
                            <Link className='link' to='/user'>Users</Link>
                        </nav> */}
                    </div>
                    <div className='nav-right'>
                        {user.name}
                        <a href="#" onClick={toLogout} className='btn-logout'>Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>

            {notification &&
                <div className="notification">
                    {notification}
                </div>
            }
        </div>
    )
}

export default DefaultLayout
