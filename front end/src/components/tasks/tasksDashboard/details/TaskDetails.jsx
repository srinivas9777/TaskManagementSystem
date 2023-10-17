import React from "react";
import { Button, Card, Image } from "semantic-ui-react";


const TaskDetails= ({task,cancelSelectTask,openForm}) =>{
    return(
        <Card fluid>
        <Image src="" />
        <Card.Content>
          <Card.Header>{task.title}</Card.Header>
          <Card.Meta>
            <span className='date'>{task.dueDate}</span>
          </Card.Meta>
          <Card.Description>
           {task.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <Button.Group widths='2'>
            <Button onClick={() => openForm(task.id)} basic color='blue' content='Edit'/>
            <Button onClick={cancelSelectTask} basic color='grey' content='Cancel'/>
        </Button.Group>
        </Card.Content>
      </Card>

    )
};

export default TaskDetails;