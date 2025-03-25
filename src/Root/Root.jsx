import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../sheard/NavBar';

const Root = () => {
    return (
        <div>
            <div className='py-14 bg-white '>
                <NavBar/>
            </div>
            <Outlet/>
        </div>
    );
};

export default Root;