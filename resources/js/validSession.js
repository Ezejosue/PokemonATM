/* 
    Agreamos un evento de escucha en el DOM para que cuando este cargado por completo
    valide que la session exista
*/
document.addEventListener("DOMContentLoaded", function() {
    // obtenemos del localStorage con el metodo getItem
    var user_data = localStorage.getItem('session_user');
    // si no tiene valores eso quiere decir que es nulo = null
    if(user_data == null){
        location.href = './index.html';
    }else{
        // Creamos un variable par asignar los datos de la session en formato json
        let datos = JSON.parse(user_data);
        // pasamos a las etiquetas HTML el valor del Nombre y la cuenta.
        document.getElementById("nombre").innerText= datos.Nombre;  
        document.getElementById("cuenta").innerText= datos.Cuenta; 
    }
}); 