import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import 'bootstrap/dist/css/bootstrap.min.css';

const Topsis = () => {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([
    'Name', 'Rating', 'Pos', 'Club', 'Nation', 'Liga', 'Price', 'Pierna', 'Pace', 'Shooting', 'Passing', 'Dribbling', 'Defending', 'Physicality', 'Altura', 'Peso'
  ]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [topsisResults, setTopsisResults] = useState([]);
  const [relevantHeaders, setRelevantHeaders] = useState([]);
  const [showOriginalTable, setShowOriginalTable] = useState(true); // Estado para controlar la visualización de la tabla original

  useEffect(() => {
    fetch('/jugadores.csv')
      .then(response => response.text())
      .then(csvText => {
        const parsedData = Papa.parse(csvText, { header: true });
        setCsvData(parsedData.data);
        setFilteredData(parsedData.data);
        setHeaders(parsedData.meta.fields);
      })
      .catch(error => console.error('Error fetching CSV:', error));
  }, []);

  useEffect(() => {
    if (selectedPosition === '') {
      setFilteredData(csvData);
    } else {
      setFilteredData(csvData.filter(row => row.Pos === selectedPosition));
    }
  }, [selectedPosition, csvData]);

  const handlePositionChange = (event) => {
    setSelectedPosition(event.target.value);
  };

  const handleTopsis = () => {
    if (filteredData.length === 0) {
      console.error('No hay datos para procesar TOPSIS');
      return;
    }

    const criteria = ['Name', 'Pos', 'Club', 'Nation', 'Liga', 'Peso'];
    const relevantHeaders = headers.filter(header => !criteria.includes(header));
    setRelevantHeaders(relevantHeaders);
    const dataForTopsis = filteredData.map((row) => {
      return relevantHeaders.map(header => parseFloat(row[header]));
    });

    try {
      if (dataForTopsis.length === 0 || dataForTopsis[0].length === 0) {
        throw new Error('La matriz de datos para TOPSIS está vacía o mal formada');
      }

      const linearAlgebra = require('linear-algebra')(),
        Matrix = linearAlgebra.Matrix;

      const topsis = require("topsis");

      const m = new Matrix(dataForTopsis);
      const weights = [0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
      const impacts = ['min', 'min', 'min', 'max', 'min', 'min', 'min', 'min', 'min', 'min'];

      const scores = topsis.getBest(m, weights, impacts);

      const results = scores.map((score, index) => {
        const playerIndex = dataForTopsis.findIndex(row => row.every((val, i) => val === score[i]));
        return {
          score,
          index: playerIndex,
          data: filteredData[playerIndex] // Almacenar los datos completos del jugador
        };
      });

      setTopsisResults(results);
      setShowOriginalTable(false); // Ocultar la tabla original
    } catch (error) {
      console.error('Error executing TOPSIS:', error);
      setTopsisResults(['ERROR']);
    }
  };

  const handleShowOriginalTable = () => {
    setShowOriginalTable(true); // Mostrar la tabla original
    setTopsisResults([]); // Limpiar los resultados del TOPSIS
  };

  return (
    <div className="container mt-4">
      <h1 className="font-weight-bold mb-4">Jugadores</h1>
      <div className="mb-3">
        <select className="form-select mb-3" onChange={handlePositionChange} value={selectedPosition}>
          <option value="">Todos</option>
          <option value="GK">Portero (GK)</option>
          <option value="LB">Defensa Lateral Izquierdo (LB)</option>
          <option value="LWB">Defensa Lateral Izquierdo (LWB)</option>
          <option value="RB">Defensa Lateral Derecho (RB)</option>
          <option value="RWB">Defensa Lateral Derecho (RWB)</option>
          <option value="CB">Defensa Central (CB)</option>
          <option value="CDM">Centrocampista Defensivo (CDM)</option>
          <option value="CM">Centrocampista Central (CM)</option>
          <option value="CAM">Centrocampista Ofensivo (CAM)</option>
          <option value="LM">Centrocampista Lateral Izquierdo (LM)</option>
          <option value="RM">Centrocampista Lateral Derecho (RM)</option>
          <option value="LW">Delantero Lateral Izquierdo (LW)</option>
          <option value="RW">Delantero Lateral Derecho (RW)</option>
          <option value="CF">Centrodelantero (CF)</option>
          <option value="ST">Delantero (ST)</option>
        </select>
        <div className="d-flex">
          <button className="btn btn-primary me-3" onClick={handleTopsis}>Run TOPSIS</button>
          {!showOriginalTable && (
            <button className="btn btn-secondary" onClick={handleShowOriginalTable}>Mostrar Tabla Original</button>
          )}
        </div>
      </div>
      {topsisResults.length > 0 && topsisResults[0] !== 'ERROR' ? (
        <div>
          <h2 className="mt-4 mb-3">Resultados TOPSIS</h2>
          <table className="table">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topsisResults.map((result, rowIndex) => {
                const playerData = result.data; // Obtener los datos completos del jugador
                return (
                  <tr key={rowIndex}>
                    {headers.map((header, colIndex) => (
                      <td key={colIndex}>{playerData[header]}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        showOriginalTable && filteredData.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((header, colIndex) => (
                    <td key={colIndex}>{row[header]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Cargando datos...</p>
        )
      )}
    </div>
  );
};

export default Topsis;