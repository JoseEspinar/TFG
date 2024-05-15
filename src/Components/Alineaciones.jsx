import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const Alineaciones = () => {
    const [csvData, setCsvData] = useState([]);
    const [columnaOrden, setColumnaOrden] = useState(null);
    const [orden, setOrden] = useState('asc');
    const [estadisticaSeleccionada, setEstadisticaSeleccionada] = useState('');
    const [valorDeseado, setValorDeseado] = useState('');
    const [jugadoresSugeridos, setJugadoresSugeridos] = useState([]);
    const [mostrarTabla, setMostrarTabla] = useState(true);

    useEffect(() => {
        const fetchCSVData = async () => {
            // Ruta relativa al archivo CSV
            const filePath = 'jugadores.csv';

            // Intenta cargar el archivo CSV automáticamente
            try {
                const response = await fetch(filePath);
                const csvString = await response.text();

                // Analiza el CSV y almacena los datos en el estado
                Papa.parse(csvString, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        setCsvData(results.data);
                    },
                    error: (error) => {
                        console.error('Error parsing CSV:', error);
                    }
                });
            } catch (error) {
                console.error('Error fetching CSV:', error);
            }
        };

        fetchCSVData();
    }, []);

    const handleColumnaOrdenClick = (columna) => {
        if (columnaOrden === columna) {
            setOrden(orden === 'asc' ? 'desc' : 'asc');
        } else {
            setColumnaOrden(columna);
            setOrden('asc');
        }
    };

    const handleEstadisticaSeleccionadaChange = (e) => {
        setEstadisticaSeleccionada(e.target.value);
    };

    const handleValorDeseadoChange = (e) => {
        setValorDeseado(e.target.value);
    };

    const handleSugerirJugadorClick = () => {
        const jugadoresSugeridos = csvData.filter((row) => {
            const valor = row[estadisticaSeleccionada];
            if (!isNaN(valorDeseado)) { // Verifica si el valor deseado es un número
                const numValor = parseFloat(valor);
                const numDeseado = parseFloat(valorDeseado);
                return numValor === numDeseado;
            } else {
                return valor.toLowerCase().includes(valorDeseado.toLowerCase());
            }
        });
        setJugadoresSugeridos(jugadoresSugeridos);
        setMostrarTabla(false); // Ocultar la tabla después de sugerir jugadores
    };

    const sortedData = [...csvData].sort((a, b) => {
        if (columnaOrden === null) {
            return 0;
        }

        const valorA = a[columnaOrden];
        const valorB = b[columnaOrden];

        if (valorA < valorB) {
            return orden === 'asc' ? -1 : 1;
        }
        if (valorA > valorB) {
            return orden === 'asc' ? 1 : -1;
        }
        return 0;
    });
    const handleMostrarTablaClick = () => {
        setMostrarTabla(true);
    };
    
    return (
        <div className='Alineaciones'> 
            <div>
                <label>Selecciona una estadística:</label>
                <select value={estadisticaSeleccionada} onChange={handleEstadisticaSeleccionadaChange}>
                    {csvData.length > 0 && Object.keys(csvData[0]).filter(header => header !== 'Aname').map((header, index) => (
                        <option key={index} value={header}>{header}</option>
                    ))}
                </select>
                <input type="text" value={valorDeseado} onChange={handleValorDeseadoChange} placeholder="Valor deseado" />
                <button onClick={handleSugerirJugadorClick}>Sugerir Jugador</button>
            </div>
            {mostrarTabla && ( // Renderizar la tabla solo si mostrarTabla es verdadero
                <table>
                    <thead>
                        <tr>
                            {csvData && csvData.length > 0 && Object.keys(csvData[0]).map((header, index) => (
                                <th key={index} onClick={() => handleColumnaOrdenClick(header)}>
                                    {header} {columnaOrden === header && (orden === 'asc' ? '▲' : '▼')}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((row, index) => (
                            <tr key={index}>
                                {Object.values(row).map((value, index) => (
                                    <td key={index}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {jugadoresSugeridos && (
                <div>
                    <h2>Jugadores Sugeridos:</h2>
                    <ul>
                        {jugadoresSugeridos.map((jugador, index) => (
                            <li key={index}>{JSON.stringify(jugador)}</li>
                        ))}
                    </ul>
                    <button onClick={handleMostrarTablaClick}>Mostrar Tabla</button>
                </div>
            )}
        </div>
    );
}

export default Alineaciones;