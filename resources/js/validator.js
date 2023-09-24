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

    // Crea la alerta de SweetAlert2 con un mensaje de éxito
    Swal.fire({
      title: "Su pago fue realizado con éxito ¡Gracias por usar POKEMONATM!",
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
      // Reproduce el sonido de alerta cuando se muestra la alerta
      alertSound.play();
    });

    console.log("Formulario válido, continuar con el proceso de pago.");
  }
});
