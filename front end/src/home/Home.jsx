import { Container } from "semantic-ui-react";
import { useEffect, useState } from 'react';
import Agent from "../api/Agent";
import TaskDashBoard from "../components/tasks/tasksDashboard/TaskDashboard";
import LoadingComponent from "../LoadingComponent";


const HomePage= () =>{

    const [tasks,setTasks] = useState([]);
    const [selectedTask,setSelectedTask] = useState(undefined);
    const [editMode,setEditMode] = useState(false);
    const [loading,setLoading]= useState(true);
    const [submitting,setSubmitting] = useState(false);
    
  
      
    useEffect(() =>{
          const agent= Agent();
           agent.tasks.list().then(response =>{
            console.log("response",response);
           let tasks =[];
           response.forEach(element => {
            element.dueDate = element.dueDate.split('T')[0];
            tasks.push(element);
           })
  
            setTasks(tasks);
            setLoading(false);
           })
           .catch(error =>{
            console.error("Error fecthing data",error);
           }) 
    },[])
  
    function handleSelectTask(id){
      setSelectedTask(tasks.find(x =>x.id === id));
    }
  
    function cancelSelectTask(){
      setSelectedTask(undefined);
    }
  
  
    function handleFormOpen(id){
      id ? handleSelectTask(id) : cancelSelectTask();
      setEditMode(true);
    }
  
    function handleFormClose(){
      setEditMode(false);
    }
  
    function handleCreateOrEditTask(task){
      setSubmitting(true);
      const agent= Agent();
      if(task.id){
        agent.tasks.update(task).then(() =>{
          setTasks([...tasks.filter(x =>x.id !== task.id),task])
          setEditMode(false);
          setSelectedTask(task);
          setSubmitting(false)
        })
      }else{
        task.id = 0;
        agent.tasks.create(task).then(() =>{
          setTasks([...tasks,task]);
          setEditMode(false);
         setSelectedTask(task);
         setSubmitting(false);
      });  
    }
  }
  
    function handleDeleteTask(id){
        setSubmitting(true);
        const agent = new Agent();
        agent.tasks.delete(id).then(() =>{
          setTasks([...tasks.filter(x =>x.id !== id)]);
          setSubmitting(false);
        })
        
        
    }
  
    if(loading) return <LoadingComponent content='Loading app'/>
  


    return (
        <div>
    
      <Container className='main'>
      <TaskDashBoard tasks={tasks}
        selectedTask={selectedTask}
        selectTask={handleSelectTask}
        cancelSelectTask ={cancelSelectTask}
        editMode ={editMode}
        openForm ={handleFormOpen}
        closeForm ={handleFormClose}
        createOrEdit={handleCreateOrEditTask}
        deleteTask= {handleDeleteTask}
        submitting={submitting}
        />
      </Container>   
        </div>
      
    )
}

export default HomePage;
