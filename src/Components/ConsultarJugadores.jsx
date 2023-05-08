import Papa from 'papaparse'
const handleFile = (event) =>{
    Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function(result){
            
        }
    })
}
const ConsultarJugadores = () => {

    return (
    <header className="Cabecera">


    </header>
    )
}

export default ConsultarJugadores