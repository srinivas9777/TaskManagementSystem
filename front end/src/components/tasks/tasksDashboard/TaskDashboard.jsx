
import React from "react";
import { Grid } from "semantic-ui-react";
import TaskList from "./TaskList";
import TaskDetails from "./details/TaskDetails";
import TaskForm from "./form/TaskForm";




const TaskDashBoard= ({tasks,selectedTask,selectTask,cancelSelectTask,editMode,
                        openForm,closeForm,createOrEdit,deleteTask,submitting}) =>{
   

    return (
        <Grid>
            <Grid.Column width='10'>
            <TaskList tasks={tasks} selectTask={selectTask}
            deleteTask={deleteTask}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedTask && !editMode &&
                 <TaskDetails task={selectedTask} 
                 cancelSelectTask={cancelSelectTask}
                 openForm={openForm}
                 submitting={submitting}
                 />}
                 {editMode &&
                    <TaskForm closeForm={closeForm} 
                    task={selectedTask} 
                    createOrEdit={createOrEdit}
                    submitting={submitting}/>}                              
            </Grid.Column>
        </Grid>
          
    )
};

export default TaskDashBoard;