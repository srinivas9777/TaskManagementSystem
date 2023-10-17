import React, { useState } from "react";
import { Button, Container, Image, Menu } from "semantic-ui-react";
import {NavLink, useNavigate} from 'react-router-dom';

const NavBar= ({openForm}) =>{

    const navigation = useNavigate()
    let isLoggedIn = false
    let username ='';

    if(localStorage.getItem('accessToken')){
        username = localStorage.getItem('username');
        isLoggedIn = true;
    }

   function  logout(){
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
        localStorage.clear();
        username='';
        isLoggedIn=false;
        navigation('/Login');
    }


    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <Image src="../assets/tasks-icon.png"/>
                    Task Management
                </Menu.Item>
                <Menu.Item as={NavLink} to='/tasks' name="Tasks"/>
                    <Menu.Item>
                        <Button as={NavLink} to='/createTask' positive inverted content="Create Task"></Button>
                    </Menu.Item>{!isLoggedIn ?(
                            <Menu.Item position="right">
                            <Button  as={NavLink} to='/login' basic inverted content="Log In"></Button>
                            <Button as={NavLink} to='/register' basic inverted content="Sign Up"></Button>
                        </Menu.Item>
                    ):
                    (isLoggedIn &&
                    <Menu.Item position="right">
                          <Button basic inverted >Welcome {username}</Button> 
                          <Button onClick={logout} basic inverted content="Logout"></Button>
                    </Menu.Item>)}
                    
            </Container>
        </Menu>
    )

};

export default NavBar;

