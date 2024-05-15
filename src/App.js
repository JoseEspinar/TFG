
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Cabecera from './Components/Cabecera';
import Footer from './Components/Footer';
import Inicio from './Components/Inicio';
import FUT from './Components/FUT';
import ConsultarJugadores from './Components/ConsultarJugadores'
import Alineaciones from './Components/Alineaciones';
import Topsis from './Components/Topsis';



const App = () => {
  return (
    <Router>
      <div className="App">
        <Cabecera />
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/FUT" element={<FUT />} />
          <Route path="/ConsultarJugadores" element={<ConsultarJugadores />} />
          <Route path='/Alineaciones' element={<Alineaciones/>}/>
          <Route path='/Topsis' element={<Topsis/>}/>
          {/* Agrega más rutas aquí para otros componentes */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
