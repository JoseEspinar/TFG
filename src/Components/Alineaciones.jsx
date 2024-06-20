import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import 'bootstrap/dist/css/bootstrap.min.css';

const Alineaciones = () => {
    const [csvData, setCsvData] = useState([]);
    const [columnaOrden, setColumnaOrden] = useState(null);
    const [orden, setOrden] = useState('asc');
    const [estadisticaSeleccionada, setEstadisticaSeleccionada] = useState('');
    const [valorDeseado, setValorDeseado] = useState('');
    const [jugadoresSugeridos, setJugadoresSugeridos] = useState([]);
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [errorMensaje, setErrorMensaje] = useState('');

    useEffect(() => {
        const fetchCSVData = async () => {
            const filePath = 'jugadores.csv';

            try {
                const response = await fetch(filePath);
                const csvString = await response.text();

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
        const jugadoresFiltrados = csvData.filter((row) => {
            const valor = row[estadisticaSeleccionada];
            if (!isNaN(valorDeseado)) {
                const numValor = parseFloat(valor);
                const numDeseado = parseFloat(valorDeseado);
                return numValor === numDeseado;
            } else {
                return valor.toLowerCase().includes(valorDeseado.toLowerCase());
            }
        });

        if (jugadoresFiltrados.length > 0) {
            setJugadoresSugeridos(jugadoresFiltrados);
            setMostrarTabla(false);
            setErrorMensaje('');
        } else {
            setErrorMensaje('No se encontraron jugadores que coincidan con los criterios de búsqueda.');
        }
    };

    const handleMostrarTablaClick = () => {
        setMostrarTabla(true);
        setJugadoresSugeridos([]);
        setErrorMensaje('');
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

    return (
        <div className="container my-4">
            <div className="mb-4">
                <label htmlFor="estadistica" className="form-label">Selecciona una estadística:</label>
                <select id="estadistica" className="form-select" value={estadisticaSeleccionada} onChange={handleEstadisticaSeleccionadaChange}>
                    {csvData.length > 0 && Object.keys(csvData[0]).filter(header => header !== 'Name').map((header, index) => (
                        <option key={index} value={header}>{header}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    value={valorDeseado}
                    onChange={handleValorDeseadoChange}
                    placeholder="Valor deseado"
                />
            </div>
            <button className="btn btn-primary mb-4" onClick={handleSugerirJugadorClick}>Sugerir Jugador</button>
            
            {errorMensaje && (
                <div className="alert alert-danger" role="alert">
                    {errorMensaje}
                </div>
            )}

            {mostrarTabla && (
                <table className="table table-striped">
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
            
            {jugadoresSugeridos.length > 0 && (
                <div>
                    <h2>Jugadores Sugeridos:</h2>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                {Object.keys(jugadoresSugeridos[0]).map((key, index) => (
                                    <th key={index}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {jugadoresSugeridos.map((jugador, index) => (
                                <tr key={index}>
                                    {Object.values(jugador).map((value, index) => (
                                        <td key={index}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-secondary" onClick={handleMostrarTablaClick}>Mostrar Tabla</button>
                </div>
            )}

            <button
                className="btn btn-light position-fixed"
                style={{ bottom: '20px', right: '20px', opacity: '0.7' }}
                onClick={handleScrollToTop}
            >
                ↑ Subir
            </button>
        </div>
    );
}
export default Alineaciones;