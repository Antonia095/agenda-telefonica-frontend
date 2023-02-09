import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../services/api';
import Card from '@mui/material/Card';

const RegisterConfirmation = () => {
  const findParams = useLocation();
  const params = new URLSearchParams(findParams.search);
  const token = params.get('token');

  async function accountConfirmation() {
    await api
      .get(`users/confirmation?token=${token}`)
      .then((res) => console.log(res.data))
      .then((err) => console.error(err));
  }

  accountConfirmation();

  return (
    <>
    <center>
      <Card>
      <h1 className='title' style={{ fontSize: '1.2rem', fontWeight: '400' }}>
        Seu cadastro foi confirmado com sucesso!
        <br />
        Clique <Link to='/'>aqui</Link> para fazer o login
      </h1>
      </Card>
   
    </center>
     
    </>
  );
}

export default RegisterConfirmation;