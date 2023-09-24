function obtenerSaldoDisponible(saldoActualPokemon) {
    // Simularemos un saldo de ejemplo (puedes cambiar esto)
    var saldo = saldoActualPokemon ;

    // Mostrar el saldo disponible en el elemento "saldoResultado" del Modal de Consulta de Saldo
    document.getElementById("saldoResultado").textContent = "Saldo disponible: $" + saldo.toFixed(2);
}

// Asignar la función obtenerSaldoDisponible al evento "shown.bs.modal" del Modal de Consulta de Saldo
$('#pokemonModalConsulta').on('shown.bs.modal', function () {
    obtenerSaldoDisponible(saldoActualPokemon);
});