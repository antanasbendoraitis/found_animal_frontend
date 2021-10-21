import { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Add_Animal from './pages/Add_Animal';
import Edit_Animal from './pages/Edit_Animal';
import Found_Animal from './pages/Found_Animal';
import Home from './pages/Home';
import Login from './pages/Login';
import More_information from './pages/More_Information';
import Register from './pages/Register';
import Add_Shelter from './pages/Shelter/Add_Shelter';
import Edit_Shelter from './pages/Shelter/Edit_Shelter';
import Shelter from './pages/Shelter/Shelter';
import Shelter_More_Information from './pages/Shelter/Shelter_More_Information';
import Users from './pages/Users';


function App() {

  const [username, setName] = useState(' ');
  const [id, setId] = useState(-1);
  const [role, setRole] = useState('-1');
  const [jwt, setJWT] = useState('');
  
  useEffect(()=>{

    fetch('https://foundanimal.azurewebsites.net/api/user', {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      }).then(resp => resp.json())
        .then(resp => {
        try {
          setName(resp.username);
          setRole(resp.role);
          setId(resp.id);
          setJWT(resp.jwt);

          } catch (error) {
          setName(' ');
          }
        });
  },[])

  if(username == undefined){
    setName(' ');
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Nav username={username} setName={setName} role={role} setRole={setRole} setId={setId} jwt={jwt} setJWT={setJWT}/>
        <main>
          <div className="form-signin">
            <Route path={"/login"} component={() => <Login username={username} setName={setName}/>}/>
            <Route path={"/register"} component={Register}/>
            <Route path={"/"} exact component={() => <Home username={username}/>}/>
            <Route path={"/more/animal/:id"} component={() => <More_information id={id} role={role} jwt={jwt}/>}/>
            <Route path={"/more/shelter/:id"} component={Shelter_More_Information}/>
            {(role == '1' || role == '2' ) && <Route path={"/add"} component={() => <Add_Animal id={id} jwt={jwt}/>}/>}
            {role == '2' && <Route path={"/create/shelter"} component={() => <Add_Shelter id={id} jwt={jwt}/>}/>}
            {(role == '1' || role == '2' ) && <Route path={"/edit/animal/:id"} component={() => <Edit_Animal id={id} jwt={jwt}/>}/>}
            {role == '2' && <Route path={"/edit/shelter/:id/"} component={() => <Edit_Shelter id={id} jwt={jwt}/>}/>}
          </div>
          <Route path={"/found"} component={() => <Found_Animal id={id} role={role} jwt={jwt}/>}/>
          {role == '2' && <Route path={"/users"} component={() => <Users jwt={jwt}/> }/>}
          <Route path={"/shelters"} component={() => <Shelter role={role} jwt={jwt}/>}/>
        </main>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
