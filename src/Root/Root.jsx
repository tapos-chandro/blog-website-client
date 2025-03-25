import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../sheard/NavBar';
import { Button, HStack } from "@chakra-ui/react"
const Root = () => {
    return (
<>
            <div className='py-14 bg-white '>
                <NavBar/>
            </div> 
            {/* {/* <Outlet/> */}
 
    </>
    );
};

export default Root;