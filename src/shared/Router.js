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
        <Route path='/' element={<Logins />} />
        <Route path='/' element={<Signup />} />
        <Route path='/' element={<AdminPage />} />
        <Route path='/' element={<UserMyPage />} />
        <Route path='/' element={<TestPage />} />
        <Route path='/' element={<SearchResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
