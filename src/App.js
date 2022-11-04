import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import Message from './components/Message';

function App() {
  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path='/login' element={ <Login /> } />
        <Route path='/signup' element={ <Signup /> } />
        <Route path='/' element={ <Message /> } />
      </Routes>
    </Router>
    </>
  );
}

export default App;
