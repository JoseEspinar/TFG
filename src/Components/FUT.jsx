import React from 'react';
import './FUT.css';
import PantallaIni from '../Images/PantallaInicioFUT.jpg';
import RarezaCartas from '../Images/CartasOrig.jpg';
import Modos from '../Images/ModosdeJuego.jpg';
import Monedas from '../Images/MonedasFUT.jpg';

const FUT= () => {

    return(
        <div className='FUT'>
            <br></br>
            <p>
            En FIFA Ultimate Team, los jugadores comienzan desde cero recolectando cartas y construyendo su propio equipo, el cual pueden mejorar con el tiempo. Este modo competitivo ha sido una parte fundamental de la franquicia durante años, aunque experimenta cambios y novedades de temporada en temporada.
            </p>
            <p>
            En pocas palabras, en FUT juegas partidos para obtener recompensas que te permiten adquirir mejores jugadores y mejorar tu equipo.
            </p>
            <img src={PantallaIni} alt="Inicio FUT" />
            <h2>Pasos Iniciales en FIFA Ultimate Team</h2>
            <ul>
                <li><strong>Elige tu sobre inicial:</strong> Selecciona una de las 9 naciones disponibles. La elección de tu país determinará qué jugadores obtendrás principalmente en tu plantilla inicial, incluido tu jugador con la mejor valoración.</li>
                <li><strong>Escoge un jugador cedido:</strong> Puedes elegir una carta de entre 5 opciones aleatorias. Esta carta cedida se suma a tu equipo, pero debes reemplazar a uno de tus jugadores existentes. Ten en cuenta que las cartas cedidas tienen un límite de usos.</li>
                <li><strong>Selecciona una equipación:</strong> Elige los uniformes local y visitante para tu equipo. Las opciones son aleatorias en este momento, pero podrás cambiarlas más adelante en el juego.</li>
                <li><strong>Elige tu escudo:</strong> Al igual que con la equipación, debes seleccionar un escudo para tu equipo. Hay hasta nueve opciones disponibles, y se te presentarán aleatoriamente para que elijas una.</li>
            </ul>
            <br></br>
            <h2>Conceptos importantes en FIFA Ultimate Team</h2>
            <ul>
                <li><strong>Química de equipo:</strong> En FUT, la química entre los jugadores es crucial. Para optimizarla, busca jugadores que compartan nacionalidad, liga o equipo, ya que esto mejora la compenetración entre ellos.</li>
                <li><strong>Contratos:</strong> Todos los jugadores necesitan contratos para participar en partidos. Estos consumibles determinan cuántos encuentros puede disputar un jugador. Adminístralos adecuadamente para garantizar la disponibilidad de tus mejores jugadores en los momentos clave.</li>
                <li><strong>Rareza de las cartas:</strong> Las cartas se clasifican en oro, plata y bronce según su rareza. Por lo general, las cartas más raras tienen valoraciones más altas, pero a veces es más importante priorizar la química sobre las estadísticas individuales.</li>
                <li><strong>Plantillas conceptuales:</strong> Te permiten planificar y visualizar cómo se vería tu equipo con jugadores que aún no posees. Esta herramienta es útil para trazar estrategias futuras, aunque recuerda que no podrás utilizar estos jugadores hasta adquirirlos.</li>
                <li><strong>Cesiones:</strong> Otra opción para obtener temporalmente a jugadores de alto nivel para enfrentar situaciones complicadas en partidos importantes.</li>
                <li><strong>Mi club:</strong> Aquí se encuentran todas las cartas y consumibles que posees pero no están activos en tu plantilla. Es fundamental gestionarlo de manera eficiente para mantener un inventario organizado y aprovechar al máximo tus recursos.</li>
            </ul>
            <img src={RarezaCartas} alt="Cartas originales de FUT" />
            <h2>Modos de Juego FUT</h2>
            <ul>
                <li><strong>Momentos de FUT:</strong> Un nuevo modo en FUT 23 con desafíos rápidos y ajustables, donde puedes ganar Estrellas para canjearlas por jugadores, sobres y más.</li>
                <li><strong>Squad Battles:</strong> Enfrenta hasta 40 partidos offline contra otras plantillas de jugadores de todo el mundo y deja tu marca semanalmente.</li>
                <li><strong>Division Rivals:</strong> Una competición semanal para todos los niveles de habilidad, donde puedes elegir tus recompensas finales.</li>
                <li><strong>FUT Champions:</strong> Consigue puntos en Rivalidades de División para acceder a este modo con grandes recompensas.</li>
                <li><strong>Desafíos de Creación de Equipos:</strong> Demuestra tus habilidades creando equipos, intercambia jugadores y gana recompensas.</li>
                <li><strong>Partidos Amistosos:</strong> Disfruta de partidos informales online y offline con reglas diversas, sin consecuencias para otros modos.</li>
                <li><strong>Draft Online de FUT:</strong> Crea el mejor equipo online eligiendo entre jugadores y gana recompensas en hasta 4 partidos.</li>
                <li><strong>Draft de un Jugador:</strong> Similar al modo anterior, pero para un solo jugador.</li>
            </ul>
            <br></br>
            <img src={Modos} alt="Modos de FUT" />
            <h2>Monedas de FIFA</h2>
            <ul>
                <li><strong>Monedas FUT:</strong> Se utilizan para comprar sobres, consumibles y acceder a modos como FUT Draft. Puedes obtenerlas jugando partidos, completando objetivos o vendiendo jugadores que no necesites.</li>
                <li><strong>Estrellas de FUT:</strong> Son una nueva divisa relacionada con el modo Momentos de FUT. Puedes obtenerlas al avanzar en este modo y se utilizan para conseguir recompensas especiales en la galería de estrellas.</li>
                <li><strong>FIFA Points:</strong> Es la moneda premium de FIFA. Se adquiere con dinero real y se utiliza para comprar sobres sin usar monedas.</li>
            </ul>
            <br></br>
            <img src={Monedas} alt="Monedas de FUT" />
            <br></br>
        </div>

    )

}

export default FUT