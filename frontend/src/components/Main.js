import React from 'react';
import { Routes , Route } from 'react-router-dom';

import App from './App';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';

const Main = () => {
  return (
    <Routes > {/* The Routes  decides which component to show based on the current URL.*/}
      <Route exact path='/' element={<App/>}></Route>
      <Route exact path='/login' element={<Login/>}></Route>
      <Route exact path='/register' element={<Register/>}></Route>
      <Route exact path='/logout' element={<Logout/>}></Route>
    </Routes >
  );
}

export default Main;