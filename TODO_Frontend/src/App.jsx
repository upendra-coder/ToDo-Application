import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Login from './Components/Login';
import Signup from './Components/Signup';
import TodoList from './Components/ToDoList';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState } from './store/authState.js';
import Button from '@mui/material/Button'; 
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

function App() {
    return (
      <RecoilRoot>
            <Router>
                <Routes>
                <Route path='/' element={<Maincontent />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/todos' element={<TodoList />} />
                <Route path='/login' element={<Login />} />
                </Routes>
            </Router>
        </RecoilRoot>
    );
}

function Alert() {
    return(
        <div style={{display: "flex", justifyContent: "center"}}>
            <Typography variant="h6" color='red'>Login / SignUp to Continue !!</Typography>
        </div>
    )
}

function Maincontent() {
    return (
      <>
      <div style={{textAlign: "center",
        fontSize: 40, 
        marginTop: 100}}>Welcome to TODO App</div>
       
        <div style={{display: "flex", justifyContent:"center"} }>
        <Button variant="outlined" 
        style={{marginRight: 20, marginTop:20}} 
        component={Link}
        to="/signup">SignUp</Button>
   
        <Button variant="outlined" 
         component={Link}
         to="/login" 
         style={{marginTop:20}}> Login</Button>
        </div>
   
        <div style={{display: "flex", justifyContent:"center"}}>
   
        <TextField id="outlined-basic" 
        label="Title" variant="outlined" 
        style={{marginTop: 20, marginRight: 20}} />

        <TextField id="outlined-basic" 
        label="Description" variant="outlined" 
        style={{marginTop: 20, marginRight: 20}} />

        <Button variant="outlined" 
        sx={{ width: 200, height: 57}} 
        onClick={() => alert('Login/SignUp to use')}
        // onClick={() => <Alert />}
        style={{marginRight: 20, marginTop:20}}> Sumbit </Button>
     </div>
     </>
    )
}

function InitState() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const init = async () => {
      const token = localStorage.getItem("token");
      try {
          const response = await fetch('http://localhost:3000/auth/me', {
              headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          if (data.username) {
              setAuth({ token: data.token, username: data.username });
              navigate("/todos");
          } else {
              navigate("/login");
          }
      } catch (e) {
          navigate("/login");
      }
  }
  useEffect(() => {
      init();
  }, [])
  return <></>
}

export default App;