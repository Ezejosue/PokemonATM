
// Recuperar del localstorage los datos de la sesión
let user_data_retiro = localStorage.getItem('session_user');
let datosRetiro = JSON.parse(user_data_retiro);
// pasamos del array de localstorage el saldoInicial
let saldoActualAntesDeRetiro = datosRetiro.SaldoInicial;

// Definir las reglas de validación
var constraintsRetiro = {
  cantidadRetirar: {
    presence: {
      message: "Cantidad requerida",
    },
    numericality: {
      greaterThan: 0,
      message: "Debe ser mayor que cero",
    },
  },
};

document.getElementById("ButtonRetirar").addEventListener("click", function () {
  let inputRetiro = parseFloat(document.getElementById("cantidadRetirar").value);

  // Verificar si la cantidad a retirar es mayor que el saldo actual
  if (inputRetiro > saldoActualAntesDeRetiro) {
    Swal.fire({
      icon: 'error',
      title: 'Saldo insuficiente...',
      text: 'No puedes retirar más dinero del que tienes en tu cuenta.',
    });
    return; // Salir de la función si el saldo es insuficiente
  }

  var formValuesRetiro = {
    cantidadRetirar: inputRetiro,
  };

  var errorsRe = validate(formValuesRetiro, constraintsRetiro);

  document.getElementById("errors_retiro").innerHTML = "";

  if (errorsRe) {
    for (var key in errorsRe) {
      document.getElementById("errors_retiro").innerHTML += errorsRe[key] + "<br>";
    }
  } else {
    let timerInterval;
    const alertSound = new Audio('resources/audio/pokemon.mp3');
    Swal.fire({
      title: 'Retirando Efectivo...',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector('b');
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
        alertSound.play();
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        // Realizar el retiro y actualizar el saldo
        let operacion = saldoActualAntesDeRetiro - inputRetiro;
        // Actualizar el saldo en el localStorage
        datosRetiro.SaldoInicial = operacion;
        localStorage.setItem('session_user', JSON.stringify(datosRetiro));
        location.reload();
        
        Swal.fire({
          icon: 'success',
          title: 'Retire el efectivo'
        });

        $("#pokemonModalRetiro").modal('hide');
      }
    });
  }
});
