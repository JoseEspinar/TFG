import './Cabecera.css';
import { NavLink } from 'react-router-dom';

const Cabecera = () => {
    return (
        <header className="Cabecera">
            <h1 className="Cabecera-h1">
                <a href="#" className="Cabecera-a">
                    <nav className="Cabecera-nav">
                        <ul className="Cabecera-ul">
                            <li className="Cabecera-li"><NavLink to="/Inicio" className="Cabecera-a">Inicio</NavLink></li>
                            <li className="Cabecera-li"><NavLink to="/FUT" className="Cabecera-a">Ultimate Team</NavLink></li>
                            <li className="Cabecera-li"><NavLink to="/Alineaciones" className="Cabecera-a">Alineaciones</NavLink></li>
                            <li className="Cabecera-li"><NavLink to="/ConsultarJugadores" className="Cabecera-a">Consultar Tabla</NavLink></li>
                            <li className="Cabecera-li"><NavLink to="/Topsis" className="Cabecera-a">TOPSIS</NavLink></li>
                        </ul>
                    </nav>
                </a>
            </h1>
        </header>
    );
}

export default Cabecera