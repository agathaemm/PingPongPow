
// copia um objeto para uma variavel
function copy( obj ) {
    
    // transforma em string e em objeto novamente
    return JSON.parse( JSON.stringify( obj ) );
}