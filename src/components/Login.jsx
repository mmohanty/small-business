import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simple authentication logic
    if ((username === 'admin' && password === 'admin') || (username === 'admin1' && password === 'admin1')) {
      localStorage.setItem('authenticated', true);
      localStorage.setItem("loggedInUser", username === 'admin'? "AssetManager": "Custodian");  
      navigate('/home');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Box
      component={Paper}
      elevation={6}
      sx={{
        width: '300px',
        margin: '100px auto',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
