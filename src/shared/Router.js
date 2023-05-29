import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import Logins from '../pages/Login';
import Signup from '../pages/Signup';
import AdminPage from '../pages/AdminPage';
import UserMyPage from '../pages/UserMyPage';
import TestPage from '../pages/TestPage';
import SearchResultPage from '../pages/SearchResultPage';
import Header from '../components/layout/Header/Header';

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/logins' element={<Logins />} />
        <Route path='/signups' element={<Signup />} />
        <Route path='/adminpages' element={<AdminPage />} />
        <Route path='/usermypages/:user_id' element={<UserMyPage />} />
        <Route path='/testpages' element={<TestPage />} />
        <Route path='/searchresultpage' element={<SearchResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
