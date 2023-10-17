import React,{useState} from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import Agent from '../../../../api/Agent';
import { useNavigate,NavLink } from "react-router-dom";


const NewTask= () =>{

    const initialState =  {
        id:'',
        title:'',
        description:'',
        dueDate:'',
        priority:'',
        status:''
    }

    const [submitting,setSubmitting] = useState(false);

    const [formValues,setFormValues]= useState(initialState);
    
    const navigate = useNavigate();

    function handleSubmit(){
        console.log("logging",formValues);
        setFormValues(formValues);
        const formValuesWithId ={...formValues,id:0};
        setSubmitting(true);
        const agent= Agent();
          agent.tasks.create(formValuesWithId).then(() =>{
            navigate('/tasks');
           setSubmitting(false);
        }); 
    }

    function handleInputChange(event){
        const {name,value} = event.target;
        setFormValues({...formValues,[name]:value});
    }


    return(
        <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Input required placeholder='Title' value = {formValues.title} name ='title' onChange={handleInputChange}/>
            <Form.TextArea required placeholder='Description' value = {formValues.description} name ='description' onChange={handleInputChange}/>
            <Form.Input required type="date" placeholder='DueDate' value = {formValues.dueDate} name ='dueDate' onChange={handleInputChange}/>
            <Form.Input required placeholder='Priority' value = {formValues.priority} name ='priority' onChange={handleInputChange}/>
            <Form.Input required placeholder='Status'value = {formValues.status} name ='status' onChange={handleInputChange}/>
            <Button loading={submitting} floated="right" positive type='submit' content='Submit' onChange={handleInputChange}/>
            <Button as={NavLink} to='/tasks' floated="right"  type='button' content='Cancel' onChange={handleInputChange}/>
        </Form>

    </Segment>
    )
}

export default NewTask;
