import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

const TaskForm= ({task:selectedTask,closeForm,createOrEdit,submitting}) =>{
    
    const initialState = selectedTask ?? {
        id:'',
        title:'',
        description:'',
        dueDate:'',
        priority:'',
        status:''
    }

    const [task,setTask]= useState(initialState);

    function handleSubmit(){
        createOrEdit(task);
    }

    function handleInputChange(event){
            const {name,value} = event.target;
            setTask({...task,[name]:value});
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input required placeholder='Title' value = {task.title} name ='title' onChange={handleInputChange}/>
                <Form.TextArea required placeholder='Description' value = {task.description} name ='description' onChange={handleInputChange}/>
                <Form.Input required type="date" placeholder='DueDate' value = {task.dueDate} name ='dueDate' onChange={handleInputChange}/>
                <Form.Input required placeholder='Priority' value = {task.priority} name ='priority' onChange={handleInputChange}/>
                <Form.Input required placeholder='Status'value = {task.status} name ='status' onChange={handleInputChange}/>
                <Button loading={submitting} floated="right" positive type='submit' content='Submit' onChange={handleInputChange}/>
                <Button onClick={closeForm} floated="right"  type='button' content='Cancel' onChange={handleInputChange}/>
            </Form>

        </Segment>
    )
}

export default TaskForm;
