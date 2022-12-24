import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import Message from './components/Message';
import PrivateComponent from './components/PrivateComponent';
import Friends from './components/Friends';
import Profile from './components/Profile';

function App() {

  const [sidebar, setSidebar] = useState(["sidebar"])

  return (
    <>
      <Router>
        <Header setSidebar={setSidebar} />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<Friends sidebar={sidebar} />} />
            <Route path='/message' element={<Message />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
