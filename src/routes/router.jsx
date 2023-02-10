import React from "react";
import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from '../pages/admin';
import Register from '../pages/register';
import RegisterConfirmation from '../pages/registerConfirmation';
import Login from '../pages/login';
import Home from '../pages/home';

const Router = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
        <Route path='/home' caseSensitive={false} exact element={ <Home/>} />
          <Route path='/admin' caseSensitive={false} exact element={<Admin />}/>
          <Route path='/' caseSensitive={false} exact element={<Login />} />
          <Route path='/register' caseSensitive={false} exact element={<Register />} />
          <Route path='/confirmation' caseSensitive={false} exact element={<RegisterConfirmation />} />
          <Route path="*" element={<Login/>}/>
        </Routes>
      </Fragment>
    </BrowserRouter>
  )
}

export default Router;