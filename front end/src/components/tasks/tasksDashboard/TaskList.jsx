import React, { useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";

const TaskList = ({tasks,selectTask,deleteTask,submitting}) =>{

    const [target,setTarget] = useState('');

    function handleTaskDelete(event,id){
        setTarget(event.target.name);
        deleteTask(id);
    }

    return(
        <Segment>
            <Item.Group divided>
                {tasks.map(task =>(
                    <Item key={task.id}> 
                        <Item.Content>
                            <Item.Header as="a">{task.title}</Item.Header>
                            <Item.Meta>{task.dueDate}</Item.Meta>
                            <Item.Description>
                                <div>{task.description}</div>
                                <div>{task.priority}</div>
                                <div>{task.status}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectTask(task.id)} floated="right" content="View" color="blue"/>     
                                <Button loading={submitting && target === task.id} 
                                name={task.id}
                                onClick={(e) => handleTaskDelete(e,task.id)}
                                 floated="right" 
                                 content="Delete" 
                                 color="red"/>                           
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}

export default TaskList;