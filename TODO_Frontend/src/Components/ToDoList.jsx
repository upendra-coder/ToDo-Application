import React, { useContext, useState, useEffect } from 'react';
import { authState } from '../store/authState.js';
import {useRecoilValue} from "recoil";
import { Typography } from '@mui/material';
import Button from '@mui/material/Button'; 
import TextField from '@mui/material/TextField';
import TodoItem from './TodoItem';



const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const authStateValue = useRecoilValue(authState);

    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch('http://localhost:3000/todo/todos', {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            const data = await response.json();
            setTodos(data);
        };
        getTodos();
    }, [authState.token]);

    const addTodo = async () => {
        const response = await fetch('http://localhost:3000/todo/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ title, description })
        });
        const data = await response.json();
        setTodos([...todos, data]);
    };

    const markDone = async (id) => {
        const response = await fetch(`http://localhost:3000/todo/todos/${id}`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const updatedTodo = await response.json();
        setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
    };

return ( <>
<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" , marginTop: 20}}>
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: "center" , paddingLeft: 150}}>WELCOME TO TODO APP</Typography>
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            window.location = "/";
          }}
          variant="outlined"
          sx={{ width: 150, height: 40 }}
        >
          Log Out
        </Button>
</div>
<div style={{ margin: 100, display: "flex", flexDirection: "column", alignItems: "center" , justifyContent: "center"}}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          style={{ marginBottom: 20 }}
          value={title} onChange={(e) => setTitle(e.target.value)} placeholder='eg. Gym'
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          style={{ marginBottom: 20 }}
           value={description} onChange={(e) => setDescription(e.target.value)} placeholder='eg. 6-7 am in morning'
        />
        <Button
          variant="outlined"
          sx={{ width: 120, height: 30 }}
          onClick={addTodo}
        >
          Add TODO
        </Button>

        <TodoItem todos={todos} markDone={markDone}/>
</div>
</>
    );
};

export default TodoList;
