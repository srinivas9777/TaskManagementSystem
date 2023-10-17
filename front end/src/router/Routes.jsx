import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../home/Home";
import LoginForm from "../Users/LoginForm";
import NewTask from "../components/tasks/tasksDashboard/form/NewTaskForm";
import RegistrationForm from "../Users/RegistrationForm";


export const routes = [
    {
        path:'/',
        element:<App/>,
        children:[
            { path:'tasks',element:<HomePage/> },
            {path:'createTask',element:<NewTask/>},
            { path:'login',element:<LoginForm/>},
            {path:'register',element:<RegistrationForm/>}
            
        ]
    }
]


export const router = createBrowserRouter(routes) 