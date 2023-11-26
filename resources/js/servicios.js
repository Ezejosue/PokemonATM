// Creamos un json con los servicios a pagar
var recibos = [
  {
    TipoRecibo: "ANDA",
    Total: 30.0,
    NPE: "1000 3100 9550 6433",
  },
  {
    TipoRecibo: "CLESA",
    Total: 25.0,
    NPE: "2346 4507 8943 1347",
  },
  {
    TipoRecibo: "TIGO",
    Total: 45.0,
    NPE: "2346 4507 8943 4567",
  },
];

// Definir las reglas de validación
var constraints = {
  servicio: {
    presence: {
      message: "El servicio es requerido.",
    },
    exclusion: {
      within: ["Seleccione un servicio"],
      message: "Por favor, elija un servicio válido.",
    },
  },
  npe: {
    presence: {
      message: "El código NPE es requerido.",
    },
    length: {
      minimum: 5,
      message: "El código NPE debe tener al menos 5 caracteres.",
    },
  },
};

// Evento al hacer clic en el botón "Pagar"
document.getElementById("payButton").addEventListener("click", function () {
  var formValues = {
    servicio: document.getElementById("servicio").value,
    npe: document.getElementById("npe").value,
  };

  var errors = validate(formValues, constraints);

  // Limpiar mensajes de error anteriores
  document.getElementById("errors").innerHTML = "";

  // Si hay errores, mostrarlos
  if (errors) {
    for (var key in errors) {
      document.getElementById("errors").innerHTML += errors[key] + "<br>";
    }
  } else {
    // Si no hay errores, muestra la alerta de SweetAlert

    // Crea una instancia de Audio con la ruta al archivo de sonido de alerta
    const alertSound = new Audio("resources/audio/pokemon.mp3"); // Reemplaza con la ruta correcta

    // obtenemos el value de select y input
    let servicio = document.getElementById("servicio").value;
    let npe = document.getElementById("npe").value;

    let validNPE = recibos.filter((obj) => obj.NPE == npe);
    if (validNPE.length > 0) {
      let totalPagar = validNPE[0].Total;
      // Recuperar del localstorage los datos de la sesión
      let user_data_servicio = localStorage.getItem("session_user");
      let datosUsuario = JSON.parse(user_data_servicio);
      // pasamos del array de localstorage el saldoActualAntesDePagarServicio
      let saldoActualAntesDePagarServicio = datosUsuario.SaldoInicial;
      // validar que el totalPagar sea menos al saldo actual
      if (saldoActualAntesDePagarServicio >= totalPagar) {
        // mostramos al usuario cuando va pagar y que confirma la transacción
        let proveedor = validNPE[0].TipoRecibo;
        Swal.fire({
          title:
            "El valor de su factura de " + proveedor + " es de $ " + totalPagar,
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Realizar pago",
          denyButtonText: `Cancelar`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            registrarPagoServicio(datosUsuario, totalPagar, proveedor);
            // resta del saldo actual el recibo
            let pagarRecibo =
              parseFloat(saldoActualAntesDePagarServicio) -
              parseFloat(totalPagar);
            datosUsuario.SaldoInicial = pagarRecibo;
            localStorage.setItem("session_user", JSON.stringify(datosUsuario));
            // Reproduce el sonido de alerta cuando se muestra la alerta
            alertSound.play();
            Swal.fire({
              title:
                "Su pago fue realizado con éxito ¡Gracias por usar POKEMONATM!",
              width: 600,
              padding: "3em",
              color: "#080808",
              background: "FAF5F5 url(/images/trees.png)",
              backdrop: `
                rgba(0,0,123,0.4)
                url("resources/img/pikachu2.gif")
                left top
                no-repeat
              `,
            }).then(() => {
              location.reload();
            });
          } else if (result.isDenied) {
            Swal.fire({
              icon: "info",
              title: "Transaccion Finalizada",
            }).then(() => {
              location.reload();
            });
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No tiene suficiente saldo para pagar!",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "NPE no encontrado.",
      });
    }

    // console.log("Formulario válido, continuar con el proceso de pago.");
  }
});

function registrarPagoServicio(datosUsuario, totalPagar, proveedor) {
  // Resta del saldo actual el total a pagar del servicio
  datosUsuario.SaldoInicial -= totalPagar;

  // Registra la transacción de pago de servicio
  datosUsuario.transacciones.push({
    concepto: "Pago de servicio " + proveedor,
    fecha: new Date().toISOString().split("T")[0], // Fecha actual en formato YYYY-MM-DD
    monto: totalPagar,
    tipo: "retiro", // Asumiendo que todos los pagos de servicios se registran como 'retiro'
  });

  // Guarda los datos actualizados en localStorage
  localStorage.setItem("session_user", JSON.stringify(datosUsuario));

  // Actualiza los gráficos
  procesarTransaccionesParaGraficos(datosUsuario.transacciones);
  calcularPromedioRetiros(datosUsuario.transacciones);
}
