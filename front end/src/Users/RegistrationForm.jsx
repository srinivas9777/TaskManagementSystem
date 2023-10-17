
import { Button, Form, Input, Segment } from "semantic-ui-react";
import React, { useState } from "react";
import Agent from '../api/Agent';
import { useNavigate,NavLink } from "react-router-dom";


const RegistrationForm= () =>{


    const initialState = {
        username:'',
        password:'',
        email:'',
        gender:''
    }

    const [submitting,setSubmitting] = useState(false);
    const [registrationValues,setregistrationValues]= useState(initialState);
    const navigate = useNavigate();

    function handleSubmit(){
        console.log("logging",registrationValues);
        setregistrationValues(registrationValues);
        const registrationValuesWithStatus = {...registrationValues,isActive:true};    
        setSubmitting(true);
        const agent= Agent();
          agent.tasks.registration(registrationValuesWithStatus).then((response) =>{
            console.log("Response",response);
            localStorage.setItem('accessToken',response.token);
            localStorage.setItem('username',response.username);
            navigate('/tasks');
           setSubmitting(false);
        }); 
    }

    function handleInputChange(event){
        const {name,value} = event.target;
        setregistrationValues({...registrationValues,[name]:value});
        }

        return(
            <Segment clearing>        
            <Form  onSubmit={handleSubmit} autoComplete="off">
                <Form.Input required type="text" 
                placeholder="Username" 
                name="username"
                 value={registrationValues.username} 
                 onChange={handleInputChange}/>
                <Form.Input 
                required
                type="password" 
                placeholder="Password"
                 name="password"  
                 value={registrationValues.password} 
                 onChange={handleInputChange}/>
                  <Form.Input 
                required
                type="text" 
                placeholder="email"
                 name="email"  
                 value={registrationValues.email} 
                 onChange={handleInputChange}/>
                 <Form.Input 
                required
                type="text" 
                placeholder="gender"
                 name="gender"  
                 value={registrationValues.gender} 
                 onChange={handleInputChange}/>
                <Button positive content='registration' type="submit" fluid/>
            </Form>    
            </Segment>
        )
}

export default RegistrationForm;

