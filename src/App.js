
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Cabecera from './Components/Cabecera';
import Footer from './Components/Footer';
import Inicio from './Components/Inicio';
import FUT from './Components/FUT';
import Alineaciones from './Components/Alineaciones';
import Analisis from './Components/Analisis';



const App = () => {
  return (
    <Router>
      <div className="App">
        <Cabecera />
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/FUT" element={<FUT />} />
          <Route path='/Alineaciones' element={<Alineaciones/>}/>
          <Route path='/Analisis' element={<Analisis/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
