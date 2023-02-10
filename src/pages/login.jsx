import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { FormControl } from '@mui/material';
import Paper from '@mui/material/Paper';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      await api
        .post('/users/login', { email, password })
        .then((res) => {
          
          const { token, isAdmin } = res.data;
          localStorage.setItem('isAdmin', isAdmin);
          localStorage.setItem("token", token);

          console.log(res.data);
          history("/home");
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <center>
      <Paper elevation={4}>
        <div className='contentForm'>
          <h1 className='title'> Login</h1>
          <FormControl onSubmit={handleSubmit}>
            <TextField
              placeholder='Email'
              type='email'
              onChange={(event) => [setEmail(event.target.value), setError("")]}
            /><br></br>
            <TextField
              placeholder='Senha'
              type='password'
              onChange={(event) => setPassword(event.target.value)}
            /><br></br>
            <label>{error}</label>
            <Button variant="contained" onClick={handleSubmit}>Entrar</Button>
            <p className='text'>
              Não possui conta ainda?
              <br />
              Clique{' '}
              <a href='/register' className='link'>
                aqui
              </a>{' '}
              para se resgistrar
            </p>
          </FormControl>
        </div>

      </Paper>

    </center>

  );
}

export default Login;