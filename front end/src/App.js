
import { Container } from 'semantic-ui-react';
import './App.css';
import NavBar from './components/nav/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
 
  return (
    <>
     <NavBar/>
     <Container style={{marginTop:'7em'}}>
      <h1>Welcome to Task Management Application</h1>
      <Outlet/>
     </Container>
    </>      
  );
}

export default App;
