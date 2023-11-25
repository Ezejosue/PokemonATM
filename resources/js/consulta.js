function obtenerSaldoDisponible() {

    let user_data_consulta = localStorage.getItem('session_user');
    let datosConsulta = JSON.parse(user_data_consulta);

    // Simularemos un saldo de ejemplo (puedes cambiar esto)
    let saldoConsulta = datosConsulta.SaldoInicial;

    // Mostrar el saldo disponible en el elemento "saldoResultado" del Modal de Consulta de Saldo
    document.getElementById("saldoResultado").textContent = "Saldo disponible: $" + saldoConsulta.toFixed(2);
}

// Asignar la función obtenerSaldoDisponible al evento "shown.bs.modal" del Modal de Consulta de Saldo
$('#pokemonModalConsulta').on('shown.bs.modal', function () {
    obtenerSaldoDisponible();
});


