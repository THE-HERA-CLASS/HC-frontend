import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import Logins from '../pages/Login';
import Signup from '../pages/Signup';
import AdminPage from '../pages/AdminPage';
import UserMyPage from '../pages/UserMyPage';
import TestPage from '../pages/TestPage';
import SearchResultPage from '../pages/SearchResultPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/logins' element={<Logins />} />
        <Route path='/signups' element={<Signup />} />
        <Route path='/adminpages' element={<AdminPage />} />
        <Route path='/usermypages' element={<UserMyPage />} />
        <Route path='/testpages' element={<TestPage />} />
        <Route path='/searchresultpage' element={<SearchResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
