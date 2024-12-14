import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';

const TodoItem = ({ todos, markDone }) => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
            {todos.map(todo => (
                <div key={todo._id} style={{ display: "flex", flexDirection: "column", marginBottom: 10, width: 'auto' }}>
                    <Card variant="outlined" sx={{ width: 200, padding: 2 }}>
                        <CardContent>
                            <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                                {todo.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {todo.description}
                            </Typography>
                        </CardContent>
                    </Card>
                    <div style={{ marginTop: 10, display: 'flex', alignItems: 'center' }}>
                        <Button
                            variant="outlined"
                            sx={{ width: 150, height: 40 }}
                            onClick={() => markDone(todo._id)}
                        >
                            {todo.done ? 'Done' : 'Mark as Done'}
                        </Button>
                    </div>
                </div>
            ))}
        </Box>
    );
};

export default TodoItem;