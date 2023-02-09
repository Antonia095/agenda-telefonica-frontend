import { useState } from "react"
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { FormControl } from '@mui/material';
import Paper from '@mui/material/Paper';


const Register = () => {
  const [username, setUsername] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      await api
        .post('/users/register', { username, email, password })
        .then((res) => {
          console.log(res.data);
          navigate('/');
        })
        .catch((err) => console.error(err.res));
    
  }

  return (
    <Paper elevation={4} >
      <center>
        <div className='Form-div'>
          <h1 className='title'>Cadastro</h1>
          <FormControl onSubmit={(e) => handleSubmit(e)}>
            <TextField
              placeholder='Nome'
              type='text'
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            /><br></br>
            <TextField
              placeholder='Email'
              type='email'
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            /><br></br>
            <TextField
              placeholder='Senha'
              type='password'
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            /><br></br>

            <Button variant="contained" onClick={handleSubmit}>Registrar-se</Button>
          </FormControl>

          <p className='text' style={{ marginTop: '2rem', fontWeight: '400' }}>
            <span style={{ color: 'red', marginRight: '1px' }}>*</span>
            Depois de cadastrado um link de confirmação será enviado para seu email.
            <span className='text'>
              Já possui conta?
              <br />
              Clique{' '}
              <a href='/' className='link'>
                aqui
              </a>{' '}
              para entrar.
            </span>
          </p>
        </div>
      </center>
    </Paper>
  )
}

export default Register;