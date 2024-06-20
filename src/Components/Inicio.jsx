import React from 'react';
import './Inicio.css';
import Logo from '../Images/Logo.jpg';

const Inicio = () => {
    return (
        <div className="container my-5">
            <div className="text-center mb-4">
                <h2>Bienvenido al Mundo FIFA</h2>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <p>
                        Desde hace años, FIFA ha sido uno de los videojuegos deportivos más populares en todo el mundo. Su último lanzamiento, FIFA 23, vendió más de 10,3 millones de copias en su primera semana, tanto en formato físico como digital. Uno de los principales factores que contribuyen al éxito de FIFA es su modo Ultimate Team, que permite a los usuarios crear su propio equipo desde cero utilizando artículos de jugador coleccionables. Con miles de jugadores disponibles en Ultimate Team, las posibilidades de formar equipos son prácticamente infinitas.
                    </p>
                    <p>
                        Para obtener jugadores en FIFA Ultimate Team, los usuarios pueden obtener monedas de forma gratuita al ganar partidos contra otros usuarios. También pueden adquirir FIFA Points, una moneda virtual que se puede comprar con dinero real para obtener jugadores de diferentes niveles. FIFA Ultimate Team proporciona un mercado de jugadores transferibles, que es la base económica de la comunidad de jugadores que apoya este modo competitivo. Conocido como "tradeo", los usuarios pueden comprar y vender jugadores y otros artículos en el mercado para ganar monedas y obtener a los jugadores deseados para sus equipos.
                    </p>
                    <p>
                        Los jugadores en FIFA Ultimate Team tienen diferentes atributos, como velocidad, ritmo, regate, etc., que determinan su nivel. Sin embargo, el hecho de que un jugador tenga una puntuación media alta en sus atributos no siempre significa que sea el mejor jugador. Algunos atributos pueden tener más importancia que otros en determinados momentos, por lo que es importante tener en cuenta este aspecto al comprar un jugador.
                    </p>
                    <p>
                        Dado el gran número de jugadores disponibles en el mercado, sus múltiples atributos y precios de mercado, y las infinitas posibilidades de formar un equipo, identificar al jugador que mejor se adapta a cada plantilla no es una tarea sencilla. Por lo tanto, el objetivo de este proyecto es diseñar un asistente web que permita a los usuarios identificar a los mejores jugadores de FIFA Ultimate Team en función de diferentes atributos de los jugadores.
                    </p>
                </div>
                <div className="col-md-12 text-center">
                    <img src={Logo} alt="Logo del juego" className="img-fluid" />
                </div>
            </div>
        </div>
    );
}

export default Inicio;