import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { FormControl } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom"
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
  const history = useNavigate();
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isUserFormVisible, setIsUserFormVisible] = useState(false)
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [idUpdate, setIdUpdate] = useState('')
  const [usernameUpdate, setUserNameUpdate] = useState('');
  const [emailUpdate, setEmailUpdate] = useState('');
  //const [passwordUpdate, setPasswordUpdate] = useState('');
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");

  useEffect(() => {
    updateUsersDataList();
  }, [token]);

  async function updateUsersDataList() {
    const responseData = await api.get('/users', {
      headers: {
        token: token,
        isAdmin: isAdmin
      }
    }).then((res) => res.data);
    setUsers(responseData);
    console.log(responseData);
  }

  async function saveUser(e) {
    e.preventDefault();

    await api
      .post('/users/admin/register', { username, email, password},
      {
        headers: {
          token: token,
          isAdmin: isAdmin
        },
      })
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
      /* password: passwordUpdate */
    }
    console.log(data)
    try {
      await api
        .patch(
          `/users/${data.id}`, data,
          {
            headers: {
              token: token
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
            isAdmin: isAdmin,
              token: token
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

  function handleLogout() {
    localStorage.clear();
    history("/")

  }

  return (
    
    <Paper elevation={4}>
      <center>    
            <Button href='/home' variant="contained" >Gerenciar Contatos</Button> 
        </center>
      <center>
        <div className='App'>
          <br></br>
          <h1 className='title'>Gerenciador de Usu??rios</h1>
          <br></br>
          {isButtonVisible && (
            <div className='Add-button'>
              <Button variant="contained"
                onClick={() => {
                  setIsUserFormVisible(true);
                  setIsButtonVisible(false);
                }}
              >
                Adicionar um novo usu??rio
              </Button>
            </div>
          )}

          {isUserFormVisible && (
            <Paper elevation={4}>
              <br></br>
              <h2 className='title'>Adicionar Usu??rio</h2>
              <br></br>
              <FormControl onSubmit={(e) => saveUser(e)} style={{ width: '25vw' }}>
                <TextField
                required={true}
                  placeholder='Nome'
                  type='text'
                  name="username"
                  onChange={(e) => setUserName(e.target.value)}
                /><br></br>
                <TextField
                required={true}
                  placeholder='Email'
                  type='email'
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                /><br></br>
                <TextField
                required={true}
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
            <Paper elevation={14}>
              <br></br>
              <h2 className='title'>Atualizar Usu??rio</h2>
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
               {/*  <TextField
                  placeholder={passwordUpdate}
                  type='password'
                  name="password"
                  onChange={(e) => setPasswordUpdate(e.target.value)}
                /> */}<br></br>
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
          <br></br>
          <Paper elevation={4}>
            <br></br>
            <h2 className='title'>Lista de Usu??rios cadastrados</h2>
            <br></br>
            <UsersContainer>

              {users.map((user) => (
                <UserContainer key={user.id}>
                  <TitleBox>{user.username}</TitleBox>
                  <UserText>Email: {user.email}</UserText>
                  <UserText>Admin: {user.isAdmin ? "sim" : "N??o"}</UserText>
                  <UserText>Verify: {user.isVerified ? "Sim" : "N??o"}</UserText>

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
        <br></br>
        <br></br>
        <Button variant="contained" onClick={handleLogout}>Sair</Button>
        
      </center>
    </Paper>

  );
}

export default Admin;