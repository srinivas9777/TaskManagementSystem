
import { Button, Form, Input, Segment } from "semantic-ui-react";
import React, { useState } from "react";
import Agent from '../api/Agent';
import { useNavigate,NavLink } from "react-router-dom";


const LoginForm= () =>{


    const initialState = {
        username:'',
        password:''
    }

    const [submitting,setSubmitting] = useState(false);
    const [loginValues,setLoginValues]= useState(initialState);
    const navigate = useNavigate();

    function handleSubmit(){
        console.log("logging",loginValues);
        setLoginValues(loginValues);
        setSubmitting(true);
        const agent= Agent();
          agent.tasks.login(loginValues).then((response) =>{
            console.log("Response",response);
            localStorage.setItem('accessToken',response.token);
            localStorage.setItem('username',response.username);
            navigate('/tasks');
           setSubmitting(false);
        }); 
    }

    function handleInputChange(event){
        const {name,value} = event.target;
        setLoginValues({...loginValues,[name]:value});
        }

        return(
            <Segment clearing>        
            <Form  onSubmit={handleSubmit} autoComplete="off">
                <Form.Input required type="text" 
                placeholder="Username" 
                name="username"
                 value={loginValues.username} 
                 onChange={handleInputChange}/>
                <Form.Input 
                required
                type="password" 
                placeholder="Password"
                 name="password"  
                 value={loginValues.password} 
                 onChange={handleInputChange}/>
                <Button positive content='Login' type="submit" fluid/>
            </Form>    
            </Segment>
        )
}

export default LoginForm;

