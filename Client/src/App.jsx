import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./Styles/App.css";

import Home from './Components/Home';
import Aluno from './Components/Aluno';
import Professor from './Components/Professor';
import Login from './Components/Login';
import Assunto from './Components/Assunto';

export default function App() {
  return (
    <div className="main">
      <nav id="navbar">
      </nav>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aluno" element={<Aluno />} />
            <Route path="/professor" element={<Professor />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/aluno/assunto" element={<Assunto/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}