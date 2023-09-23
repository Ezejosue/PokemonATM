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
  Swal.fire({
    title: 'Su pago fue realizado con exito ¡Gracias por usar POKEMONATM!',
    width: 600,
    padding: '3em',
    color: '#080808',
    background: 'FAF5F5 url(/images/trees.png)',
    backdrop: `
      rgba(0,0,123,0.4)
      url("resources/img/pikachu2.gif")
      left top
      no-repeat
    `
  })
  
  
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
    // Aquí puedes continuar con el proceso de pago si no hay errores
    console.log("Formulario válido, continuar con el proceso de pago.");
  }
  
});
