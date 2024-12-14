import React , { useState } from 'react';
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({username,password})
        });

        const data = await response.json();
        if(data.token){
            localStorage.setItem("token", data.token);
            window.location = "/todos";
        } else {
            alert("Invalid Credentials");
        }
    }; 

    return(
        <>
    <div style={{display: "flex", justifyContent: "center", marginTop:100}}>
    <TextField id="outlined-basic" 
        label="Username" 
        variant="outlined" 
        style={{marginTop: 20, marginRight: 20}}
        onChange={(e) => setUsername(e.target.value)}   />

    <TextField id="outlined-basic" 
        label="Password"
        variant="outlined"
        style={{marginTop: 20, marginRight: 20}}
        onChange={(e) => setPassword(e.target.value)}   />
    </div>

    <div style={{display: "flex", justifyContent: "center"}}> 
        <Button onClick={handleLogin} 
        variant="outlined" 
        sx={{ width: 200, height: 57}} 
        style={{marginRight: 20, marginTop:30}}> Login 
        </Button> 
    </div>
    </>
    )
}

export default Login;