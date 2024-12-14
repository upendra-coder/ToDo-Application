import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useSetRecoilState} from "recoil";
import {authState} from "../store/authState.js";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 
import { Typography } from '@mui/material';

const Signup = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const handleSignup = async () => {
        const response = await fetch("http://localhost:3000/auth/signup", {
            method: "POST",
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify({username,password})
        });

        const data = await response.json();
        if(data.token){
            localStorage.setItem("token", data.token);
            window.location = "/todos";
        } else {
            alert("Error while signing Up");
        }
    };

    return( <>
    <div style={{display: "flex",justifyContent: "space-between"}}>
    <Typography variant="h6">SignUp</Typography>
    <Typography variant="h6">Already Signed Up <Link to="/login">Login</Link> </Typography>
    </div>

    <div style={{display: "flex", justifyContent: "center", marginTop:100}}>
    <TextField id="outlined-basic" 
        label="Username" 
        variant="outlined" 
        style={{marginTop: 20, marginRight: 20}}
        onChange={(e) => setUsername(e.target.value)} />

    <TextField id="outlined-basic" 
        label="Password"
        variant="outlined"
        style={{marginTop: 20, marginRight: 20}} 
        onChange={(e) => setPassword(e.target.value)}/>
    </div>

    <div style={{display: "flex", justifyContent: "center"}}> 
        <Button onClick={handleSignup} 
        variant="outlined" 
        sx={{ width: 200, height: 57}} 
        style={{marginRight: 20, marginTop:30}}> SignUp 
        </Button> 
    </div>
    </>
    );
};

export default Signup;
