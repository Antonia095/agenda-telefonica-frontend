import React from "react";
import Router from "./routes/router";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const App = () => {
  return (
    <> <AppBar>
      <center>
      <Typography variant="h6" color="inherit" component="div">
        Agenda Telefônica
      </Typography>
      <Button href='/home' variant="contained" >Gerenciar Contatos</Button>
      <Button href='/admin' variant="contained">Gerenciar Usuários</Button>
      </center>
    </AppBar>
    <br></br>
    <br></br>
    <br></br>
      <div className="App">
        <Router />
      </div>
    </>
  );
};

export default App;
