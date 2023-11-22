/* 
    Funcion que cierra sesion y limpia o destruye lo que tenemos 
    creado en el localStorage
    y lo redireccionamos al index 

*/

function cerrarSesion(){
    localStorage.clear();
    location.href = './index.html';
}