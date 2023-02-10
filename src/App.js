import React from "react";
import Router from "./routes/router";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

const App = () => {
  return (
    <> <AppBar>
      <center>
      <Typography variant="h4" color="inherit" component="div">
        Agenda Telefônica
      </Typography>
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
