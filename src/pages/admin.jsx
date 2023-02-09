import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { FormControl } from '@mui/material';
import Paper from '@mui/material/Paper';


import {
  UserContainer,
  UsersContainer,
  UserText,
  IconDiv,
  IconsDiv,
  TitleBox,
} from '../styles/adminStyle';

const Admin = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isUserFormVisible, setIsUserFormVisible] = useState(false)
  const [isButtonVisible, setIsButtonVisible] = useState(true);


  //const [admiUpdate, setadmiUpdate] = useState('');
  //const [telefoneUpdate, setTelefoneUpdate] = useState('');
  const [idUpdate, setIdUpdate] = useState('')
  const [usernameUpdate, setUserNameUpdate] = useState('');
  const [emailUpdate, setEmailUpdate] = useState('');
  const [passwordUpdate, setPasswordUpdate] = useState('');

  const token = localStorage.getItem("token");

  useEffect(() => {
    updateUsersDataList();
  }, [token]);

  async function updateUsersDataList() {
    const responseData = await api.get('/users', {
      headers: {
        token: token,
      }
    }).then((res) => res.data);
    setUsers(responseData);
    console.log(responseData);
  }

  async function saveUser(e) {
    e.preventDefault();
    
    await api
      .post('/users/register', { username, email, password })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err.res));

    setIsUserFormVisible(false);
    setIsButtonVisible(true);
    updateUsersDataList();
    limpar();
  }

  async function handleUpdate(e) {
    e.preventDefault()

    const data = {
      id: idUpdate,
      username: usernameUpdate,
      email: emailUpdate,
      password: passwordUpdate
    }
    console.log(data)
    try {
      await api
        .put(
          `/users/${data.id}`, data,
          {
            headers: {
              token: token,
            },
          }
        )
      updateUsersDataList();
      limpar();
      setIsEditFormVisible(false);
      setIsButtonVisible(true)

    } catch (error) {
      console.log(error)
    }
  }

  async function handleDelete(id) {

    try {
      await api
        .delete(`/users/${id}`, {
          headers: {
            token: token,
          },

        })
      updateUsersDataList();
      limpar();
    } catch (error) {
      console.log(error)
    }

  }

  function limpar() {
    setUserNameUpdate('');
    setEmailUpdate('');

  }

  return (
    <Paper elevation={4}>
      <center>
        <div className='App'>
          <br></br>
          <h1 className='title'>Gerenciador de Usuários</h1>
          <br></br>
          {isButtonVisible && (
            <div className='Add-button'>
              <Button variant="contained"
                onClick={() => {
                  setIsUserFormVisible(true);
                  setIsButtonVisible(false);
                }}
              >
                Adicionar um novo usuário
              </Button>
            </div>
          )}

          {isUserFormVisible && (
            <Paper elevation={4}>
              <br></br>
              <h2 className='title'>Adicionar Usuário</h2>
              <br></br>
              <FormControl onSubmit={(e) => saveUser(e)} style={{ width: '25vw' }}>
                <TextField
                  placeholder='Nome'
                  type='text'
                  name="username"
                  onChange={(e) => setUserName(e.target.value)}
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

                <div>
                  <Button variant="contained"
                    onClick={() => {
                      setIsUserFormVisible(false);
                      setIsButtonVisible(true);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button variant="contained" onClick={saveUser}>Adicionar</Button>
                </div>


              </FormControl>
            </Paper>

          )}

          {isEditFormVisible && (
            <Paper elevation={4}>
              <br></br>
              <h2 className='title'>Atualizar Usuário</h2>
              <br></br>
              <FormControl onSubmit={(e) => handleUpdate(e)} style={{ width: '25vw' }}>
                <TextField
                  placeholder={usernameUpdate}
                  type='text'
                  name="username"
                  onChange={(e) => setUserNameUpdate(e.target.value)}
                /><br></br>
                <TextField
                  placeholder={emailUpdate}
                  type='email'
                  name="email"
                  onChange={(e) => setEmailUpdate(e.target.value)}
                /><br></br>
                <TextField
                  placeholder={passwordUpdate}
                  type='password'
                  name="password"
                  onChange={(e) => setPasswordUpdate(e.target.value)}
                /><br></br>
                <div>
                  <Button variant="contained"
                    onClick={() => {
                      setIsEditFormVisible(false);
                      setIsButtonVisible(true);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button variant="contained" onClick={handleUpdate}>atualizar</Button>
                </div>
              </FormControl>
            </Paper>
          )}

          <Paper elevation={4}>
            <br></br>
            <h2 className='title'>Lista de Usuários cadastrados</h2>
            <br></br>
            <UsersContainer>

              {users.map((user) => (
                <UserContainer key={user.id}>
                  <TitleBox>{user.username}</TitleBox>
                  <UserText>Email: {user.email}</UserText>
                  <UserText>Admin: {user.isAdmin ? "sim" : "Não"}</UserText>
                  <UserText>Verify: {user.isVerified ? "Sim" : "Não"}</UserText>

                  <IconsDiv>
                    <IconDiv
                      borderRadius='0 0 0 0.6rem'
                      color='#2c6663'
                      onClick={() => {
                        setIsEditFormVisible(true)
                        setIsButtonVisible(false)
                        setIsUserFormVisible(false)
                        setUserNameUpdate(user.username)
                        setEmailUpdate(user.email)
                        setIdUpdate(user.id)
                      }} >
                      Atualizar
                    </IconDiv>
                    <IconDiv
                      borderRadius='0 0 0.6rem 0'
                      color='#d83c3c'
                      onClick={() => handleDelete(user.id)}>
                     Deletar
                    </IconDiv>
                  </IconsDiv>
                  <br></br>
                </UserContainer>
              ))}         
            </UsersContainer>
          </Paper>
        </div>
      </center>
    </Paper>

  );
}

export default Admin;