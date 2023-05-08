import './Cabecera.css';


const Cabecera = () => {

    return (
    <header className="Cabecera">
        <h1 className="Cabecera-h1">
            <a href="#" className="Cabecera-a">
            <nav className="Cabecera-nav">
            <ul className="Cabecera-ul">
                <li className="Cabecera-li"><a href="/inicio" className="Cabecera-a">Inicio</a></li>
                <li className="Cabecera-li"><a href="/quienesSomos" className="Cabecera-a">Quienes somos</a></li>
                <li className="Cabecera-li"><a href="#" className="Cabecera-a">Alineaciones</a></li>
                <li className="Cabecera-li"><a href="#" className="Cabecera-a">Consultar jugadores</a></li>
            </ul>
        </nav>
            </a>
        </h1>


    </header>
    )
}

export default Cabecera