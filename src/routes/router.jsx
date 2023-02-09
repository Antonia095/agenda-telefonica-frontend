import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from '../pages/admin';
import Register from '../pages/register';
import RegisterConfirmation from '../pages/registerConfirmation';
import Login from '../pages/login';
import Home from '../pages/home';
 
const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
          <Route
            path='/admin'
            caseSensitive={false} exact 
            element={
              // <PrivateAdmin>
              <Admin />
              // </PrivateAdmin>
            }
          />
          <Route
            path='/' caseSensitive={false} exact element={<Login />}/>
          <Route path='/register' caseSensitive={false} exact element={<Register />} />
          <Route path='/confirmation' caseSensitive={false} exact element={<RegisterConfirmation />}/>
          <Route path='/home' caseSensitive={false} exact 
          element={
          // <Private> 
            <Home /> 
          // </Private> 
        } />
        </Routes>
    </BrowserRouter>
    )
}

export default Router;