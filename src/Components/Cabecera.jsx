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
                            <li className="Cabecera-li"><NavLink to="/QuienesSomos" className="Cabecera-a">Quienes somos</NavLink></li>
                            <li className="Cabecera-li"><a href="/alineaciones" className="Cabecera-a">Alineaciones</a></li>
                            <li className="Cabecera-li"><a href="/consultarJugadores" className="Cabecera-a">Consultar jugadores</a></li>
                        </ul>
                    </nav>
                </a>
            </h1>
        </header>
    );
}

export default Cabecera