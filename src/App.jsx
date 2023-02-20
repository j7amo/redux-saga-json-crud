import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AddEditUser from './pages/AddEditUser';
import UserInfo from './pages/UserInfo';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/addUser" element={<AddEditUser />} />
        <Route path="/editUser/:id" element={<AddEditUser />} />
        <Route path="/userInfo/:id" element={<UserInfo />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
