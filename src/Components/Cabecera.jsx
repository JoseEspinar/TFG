import './Cabecera.css';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const Cabecera = () => {
    return (
        <header className="Cabecera">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">
                    TFG FIFA 
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink to="/Inicio" className="nav-link">Inicio</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/FUT" className="nav-link">Ultimate Team</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/Alineaciones" className="nav-link">Alineaciones</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/Analisis" className="nav-link">TOPSIS</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
export default Cabecera