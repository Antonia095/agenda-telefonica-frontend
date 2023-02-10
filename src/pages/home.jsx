import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { FormControl } from '@mui/material';
import api from '../services/api';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom"
import {
  ContactContainer,
  ContactsContainer,
  ContactText,
  IconDiv,
  IconsDiv,
  TitleBox,
} from '../styles/homeStyle';

const Home = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [contacts, setContacts] = useState([]);
  const history = useNavigate();
  const token = localStorage.getItem("token");
  const admin = localStorage.getItem("isAdmin");
  const [nomeUpdate, setNomeUpdate] = useState('');
  const [telefoneUpdate, setTelefoneUpdate] = useState('');
  const [idUpdate, setIdUpdate] = useState('')
  console.log(admin)


  useEffect(() => {
    updateContactsDataList();
  }, []);

  async function updateContactsDataList() {
    const responseData = await api
      .get('/contato')
      .then((res) => res.data.contatos);
    setContacts(responseData);
    console.log(contacts);
  }

  async function handleUpdate(e) {
    e.preventDefault()

    const data = {
      id: idUpdate,
      nome: nomeUpdate,
      telefone: telefoneUpdate
    }
    try {
      await api
        .patch(
          `/contato/${data.id}`, data,
          {
            headers: {
              token: token,
            },
          }
        )
      updateContactsDataList();
      limpar()
      setIsEditFormVisible(false)
      setIsButtonVisible(true)

    } catch (error) {
      console.log(error)
    }
  }

  async function handleDelete(id) {
    await api
      .delete(`/contato/${id}`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        setContacts(contacts.filter((contact) => contacts.id !== id));
        updateContactsDataList();
      })
      .catch((err) => console.error(err));
  }

  async function saveContact(e) {
    e.preventDefault();
    await api
      .post(
        '/contato/register',
        { nome, telefone },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => res.data)
      .catch((err) => console.error(err));

    setIsContactFormVisible(false);
    setIsButtonVisible(true);
    updateContactsDataList();
    limpar()
  }

  function limpar() {
    setNome("")
    setTelefone("")
    setTelefoneUpdate('')
    setNomeUpdate('')
  }

  function handleLogout() {
    localStorage.clear();
    history("/")

  }



  return (
    <>
      <center>
        <Paper elevation={4}>
          <center>
            <br></br>
        
             <Button href='/admin' variant="contained">Gerenciar Usuários</Button> 
          </center>
          <br></br>
          <h1 className='title'>Gerenciador de Contatos</h1>
          <br></br>
          {isButtonVisible && (
            <div className='Add-button'>
              <Button variant="contained"
                onClick={() => {
                  setIsContactFormVisible(true);
                  setIsButtonVisible(false);
                }}
              >
                Adicionar um novo Contato
              </Button>
            </div>
          )}

          {isContactFormVisible && (
            <Paper elevation={4}>
              <br></br>
              <h2 className='title'>Adicionar Contato</h2>
              <br></br>
              <FormControl onSubmit={(e) => saveContact(e)} style={{ width: '25vw' }}>
                < TextField
                  placeholder='Nome'
                  type='text'
                  onChange={(e) => setNome(e.target.value)}
                /><br></br>
                <TextField
                  placeholder='Telefone'
                  type='text'
                  maxLength='12'
                  onChange={(e) => setTelefone(e.target.value)}
                /><br></br>
                <div>
                  <Button variant="contained"
                    onClick={() => {
                      setIsContactFormVisible(false);
                      setIsButtonVisible(true);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button variant="contained" onClick={saveContact}>Adicionar</Button>
                </div>
              </FormControl>
            </Paper>
          )}

          {isEditFormVisible && (
            <Paper elevation={4}>
              <br></br>
              <h2 className='title'>Atualizar Contato</h2>
              <br></br>
              <FormControl onSubmit={(e) => handleUpdate(e)} style={{ width: '25vw' }}>
                <TextField
                  placeholder={nomeUpdate}
                  type='text'
                  onChange={(e) => setNomeUpdate(e.target.value)}
                /><br></br>
                <TextField
                  placeholder={telefoneUpdate}
                  type='text'
                  maxLength='12'
                  onChange={(e) => setTelefoneUpdate(e.target.value)}
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
          <br></br>

          <Paper elevation={4}>
            <br></br>
            <h2 className='title'>Lista de Contatos</h2>
            <br></br>
            <ContactsContainer>
              {contacts.map((contact) => (
                <ContactContainer key={contact.id}>
                  <TitleBox>{contact.nome}</TitleBox>
                  <ContactText>Telefone: {contact.telefone}</ContactText>
                  <IconsDiv>
                    <IconDiv variant="contained"
                      borderRadius='0 0 0 0.6rem'
                      color='#2c6663'
                      onClick={() => {
                        setIsEditFormVisible(true)
                        setIsButtonVisible(false)
                        setIsContactFormVisible(false)
                        setNomeUpdate(contact.nome)
                        setTelefoneUpdate(contact.telefone)
                        setIdUpdate(contact.id)
                      }}
                    >
                      Atualizar
                    </IconDiv>
                    <IconDiv variant="contained"
                      borderRadius='0 0 0.6rem 0'
                      color='#d83c3c'
                      onClick={() => handleDelete(contact.id)}
                    >
                      Deletar
                    </IconDiv>
                  </IconsDiv>
                </ContactContainer>
              ))}
            </ContactsContainer>
            <br></br>
            <br></br>
            <Button variant="contained" onClick={handleLogout}>Sair</Button>
          </Paper>
        </Paper>
      </center>


    </>
  );
}

export default Home;