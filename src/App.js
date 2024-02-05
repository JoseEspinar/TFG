
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Cabecera from './Components/Cabecera';
import Footer from './Components/Footer';
import Inicio from './Components/Inicio';
import QuienesSomos from './Components/QuienesSomos';
import Jugadores from './jugadores.csv'


const App = () => {
  return (
    <Router>
      <div className="App">
        <Cabecera />
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/quienesSomos" element={<QuienesSomos />} />
          {/* Agrega más rutas aquí para otros componentes */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
