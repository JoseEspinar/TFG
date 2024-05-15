import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
// @ts-ignore
import topsis from 'topsis';




const Topsis = () => {
  const [csvData, setCsvData] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Load the CSV data when the component mounts
    fetch('/jugadores.csv')
      .then(response => response.text())
      .then(csvText => {
        const parsedData = Papa.parse(csvText, { header: true });
        setCsvData(parsedData.data);
      })
      .catch(error => console.error('Error fetching CSV:', error));
  }, []);

  const handleTopsis = () => {
    if (csvData.length === 0) {
      console.error('CSV data not loaded yet');
      return;
    }

    // Extracting the values from the CSV data
    const values = csvData.map(row => {
      const rowValues = Object.values(row);
      // Eliminamos el último elemento que corresponde al puntaje de rendimiento
      rowValues.pop();
      return rowValues.map(value => parseFloat(value));
    });

    // Assuming the last column contains the performance scores
    const scores = csvData.map(row => parseFloat(row[row.length - 1]));

    // Performing TOPSIS analysis
    const result = topsis(values, scores, '++', 'natural');

    // Setting the results
    setResults(result);
  };

  return (
    <div>
      <button onClick={handleTopsis}>Run TOPSIS</button>
      {results && results.length > 0 && (
        <div>
          <h2>Results</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
  };



export default Topsis;