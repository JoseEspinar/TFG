import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const ConsultarJugadores = () => {
    const [csvData, setCsvData] = useState([]);
    const [jugadoresClasificados, setJugadoresClasificados] = useState([]);
    const [pesos, setPesos] = useState({
        Aname: 0,
        Brating: 0.2,
        Cpos: 0,
        Dclub: 0,
        Enation: 0,
        Fliga: 0,
        Hpierna: 0,
        Gprice: 0.1,
        Ipace: 0.1,
        Jshooting: 0.15,
        Kpassing: 0.1,
        Ldribbling: 0.1,
        Mdefending: 0.1,
        Nphysicality: 0.1,
        Raltura: 0,
        Speso: 0
    });
    const [columnaOrden, setColumnaOrden] = useState('TOPSIS'); // Columna inicialmente ordenada por TOPSIS
    const [orden, setOrden] = useState('desc'); // Orden inicialmente descendente
    const [posicionSeleccionada, setPosicionSeleccionada] = useState(''); // Estado para la posición seleccionada

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
    }, []); // No incluir aplicarTOPSIS en el arreglo de dependencias
    
    useEffect(() => {
        const clasificados = aplicarTOPSIS(csvData);
        setJugadoresClasificados(clasificados);
    }, [csvData]); // Incluir csvData en el arreglo de dependencias

    const aplicarTOPSIS = (data) => {
        console.log('Datos recibidos:', data);
        console.log('Posición seleccionada:', posicionSeleccionada);
    

        // Filtrar los jugadores según la posición seleccionada
        const jugadoresFiltrados = data.filter(jugador => {
            if (posicionSeleccionada === '') {
                return true; // Si no se ha seleccionado una posición, mostrar todos los jugadores
            } else {
                return jugador.Cpos === posicionSeleccionada; // Filtrar por la posición seleccionada
            }
        });
        console.log('Jugadores filtrados:', jugadoresFiltrados);

        const sumaPesos = Object.values(pesos).reduce((acc, peso) => acc + peso, 0);
        if (sumaPesos === 0) {
            console.error('Todos los pesos no pueden ser cero.');
            return [];
        }
    
        // Encontrar el criterio con un peso distinto de cero
        const criterioConPeso = Object.keys(pesos).find(criterio => pesos[criterio] !== 0);
    
        // Si solo un criterio tiene un peso distinto de cero, normalizar los datos solo con respecto a ese criterio
        if (criterioConPeso) {
            const valores = data.map(jugador => parseFloat(jugador[criterioConPeso]));
            const maximo = Math.max(...valores);
            const minimo = Math.min(...valores);
            const normalizado = data.map((jugador, index) => ({
                ...jugador,
                TOPSIS: (parseFloat(jugador[criterioConPeso]) - minimo) / (maximo - minimo),
            }));
            return normalizado;
        }
    
        // Realizar el cálculo normal de TOPSIS como antes
    
        // Normalizar los datos utilizando los pesos
        const normalizado = data.map(jugador => {
            let norm = {};
            const sumaCuadrados = Object.keys(pesos).reduce((total, criterio) => {
                const valorNumerico = isNaN(jugador[criterio]) ? 0 : Number(jugador[criterio]);
                norm[criterio] = valorNumerico * pesos[criterio];
                return total + Math.pow(norm[criterio], 2);
            }, 0);
            const normEuclidiana = Math.sqrt(sumaCuadrados);
            return Object.keys(norm).reduce((normalizedJugador, criterio) => {
                normalizedJugador[criterio] = norm[criterio] / normEuclidiana;
                return normalizedJugador;
            }, {});
        });
    
        // Calcular el puntaje TOPSIS
        const clasificados = normalizado.map(jugador => ({
            ...jugador,
            TOPSIS: jugador.distanciaNegativaIdeal / (jugador.distanciaIdeal + jugador.distanciaNegativaIdeal),
        }));
    
        // Ordenar los jugadores por su puntaje TOPSIS o la columna seleccionada
        clasificados.sort((a, b) => {
            if (columnaOrden === 'TOPSIS') {
                return orden === 'asc' ? a.TOPSIS - b.TOPSIS : b.TOPSIS - a.TOPSIS;
            } else {
                return orden === 'asc' ? a[columnaOrden] - b[columnaOrden] : b[columnaOrden] - a[columnaOrden];
            }
        });
    
        return clasificados;
    };

    const handleChangePesos = (event) => {
        const { name, value } = event.target;
        let parsedValue = parseFloat(value);
        
        // Si el valor es negativo, establecerlo como 0
        if (parsedValue < 0) {
            parsedValue = 0;
        }
        
        // Si el valor es mayor que 10, establecerlo como 10
        if (parsedValue > 10) {
            parsedValue = 10;
        }
    
        setPesos(prevPesos => ({
            ...prevPesos,
            [name]: parsedValue
        }));
    };

    const handleAplicarTOPSIS = () => {
        //console.log("Aplicar TOPSIS button clicked");
        //console.log('Datos actuales:', csvData); // Verifica los datos antes de llamar a aplicarTOPSIS
        //console.log('Pesos actuales:', pesos); // Verifica los pesos antes de llamar a aplicarTOPSIS
        const clasificados = aplicarTOPSIS(csvData);
        //console.log('Resultados de TOPSIS:', clasificados); // Verifica los resultados obtenidos

        setJugadoresClasificados(clasificados);
    };
    
    // Ordenar csvData
    const sortedCsvData = [...jugadoresClasificados].sort((a, b) => {
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
        if (columnaOrden === 'TOPSIS') {
            return orden === 'asc' ? a.TOPSIS - b.TOPSIS : b.TOPSIS - a.TOPSIS;
        } else {
            return orden === 'asc' ? a[columnaOrden] - b[columnaOrden] : b[columnaOrden] - a[columnaOrden];
        }
        return 0;
    })

    const handleColumnaOrdenClick = (columna) => {
         if (columnaOrden === columna) {
            setOrden(orden === 'asc' ? 'desc' : 'asc');
        } else {
            setColumnaOrden(columna);
            setOrden('asc');
        }
    
    };

    const handlePosicionSeleccionadaChange = (event) => {
        setPosicionSeleccionada(event.target.value);
    };

    const colors = ['#ff9999', '#99ff99', '#9999ff', '#ffff99', '#ff99ff', '#99ffff', '#ffcc99', '#ccff99', '#99ccff', '#ff9999', '#99ff99', '#9999ff', '#ffff99', '#ff99ff', '#99ffff', '#ffcc99', '#ccff99', '#99ccff', '#ff9999', '#99ff99']; // Ejemplo de colores
    const atributosBloqueados = ["Aname", "Raltura", "Speso", "Cpos", "Dclub", "Enation", "Fliga"];
    const filteredData = posicionSeleccionada ? sortedCsvData.filter(jugador => jugador['Cpos'] === posicionSeleccionada) : sortedCsvData;

    return (
        <div className='ConsultarJugadores'>
            <h1 style={{ fontSize: '1.5em', fontWeight: 'bold' }}>Jugadores Clasificados (TOPSIS)</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                
                    {Object.keys(pesos).map((criterio, index) => (
                        <div key={index} style={{ marginRight: '10px' }}>
                            <label style={{ marginRight: '5px' }}>{criterio}:</label>
                            <input
                                type="number"
                                name={criterio}
                                value={pesos[criterio]}
                                onChange={handleChangePesos}
                                readOnly={atributosBloqueados.includes(criterio)} // Bloquea la edición si el atributo está en la lista de bloqueados
                                style={{
                                    backgroundColor: colors[index % colors.length],
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="posicion">Seleccionar Posición:</label>
                    <select id="posicion" value={posicionSeleccionada} onChange={handlePosicionSeleccionadaChange}>
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
                </div>
                <button onClick={handleAplicarTOPSIS} style={{ fontWeight: 'bold', backgroundColor: 'white' }}>Aplicar TOPSIS</button>
            </div>
            <table>
                <thead>
                    <tr>
                        {csvData.length > 0 && Object.keys(csvData[0]).map((header, index) => (
                            <th key={index} onClick={() => handleColumnaOrdenClick(header)} style={{ cursor: 'pointer' }}>
                                {header} {columnaOrden === header && (orden === 'asc' ? '▲' : '▼')}
                            </th>
                        ))}
                        <th onClick={() => handleColumnaOrdenClick('TOPSIS')} style={{ cursor: 'pointer' }}>
                            TOPSIS {columnaOrden === 'TOPSIS' && (orden === 'asc' ? '▲' : '▼')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((jugador, jugadorIndex) => (
                        <tr key={jugadorIndex}>
                            {Object.keys(jugador).map((stat, statIndex) => {
                                return (
                                    <td key={statIndex}>
                                        {jugador[stat]}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ConsultarJugadores;