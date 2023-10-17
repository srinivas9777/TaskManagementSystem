import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL='https://localhost:44361/api';


function Agent() {

    const sleep =(delay) =>{
        return new Promise((resolve) => {
            setTimeout(resolve,delay)
        })
    }

    // axios.interceptors.request.use((config) => {

    //     const accessToken = localStorage.getItem('accessToken');
    //     const excludeBearerTokenURLs = ['/Account/Login', '/Account/Register'];

    //     if (accessToken && !excludeBearerTokenURLs.includes(config.url)) {
    //         config.headers.Authorization = `Bearer ${accessToken}`;
    //     }
    //     return config;
    // });

    const responseBody = (response) => response.data;
    
    axios.interceptors.response.use(async response =>{
        try{
           await  sleep(1000);
            return response;
        }
        catch(error){
            console.log(error);
            return Promise.reject(error);
        }
    });


    
    const requests = {
        get: (url) => axios.get(url).then(responseBody),
        post: (url, data) => axios.post(url,data).then(responseBody),
        put: (url, data) => axios.put(url,data).then(responseBody),
        delete: (url) => axios.delete(url).then(responseBody)
    };


    const tasks = {
        list: () => requests.get('/Task/getAllTasks'),
        details : (id) =>requests.get(`/Task/taskById/${id}`),
        create : (task) => requests.post('/Task/insertTask',task),
        update:(task) => requests.put('/Task/updateTask',task),
        delete:(id) => requests.delete(`/Task/deleteTask/${id}`),
        login:(creds) => requests.post('/Account/Login',creds),
        registration:(creds) => requests.post('/Account/Register',creds)
    };

    return { tasks };

}

export default Agent;