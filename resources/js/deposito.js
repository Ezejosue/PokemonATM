// Definir las reglas de validación
var constraints2 = {
    cantidadDeposito: {
      presence: {
        message: "Ingrese la cantidad a depositar.",
      },
      length: {
        minimum: 1,
        message: " Requerida",
      },
    },
  };

  document.getElementById("ButtonDepositar").addEventListener("click", function () {
    var formValues2 = {
        cantidadDeposito: document.getElementById("cantidadDeposito").value,
    };
  
    var errors2 = validate(formValues2, constraints2);
  
    document.getElementById("errors_deposito").innerHTML = "";
  
    if (errors2) {
      for (var key2 in errors2) {
        document.getElementById("errors_deposito").innerHTML += errors2[key2] + "<br>";
      }
    }else{
        $("#pokemonModalDeposito").modal('hide');
        document.getElementById("cantidadDeposito").value = "";

        Swal.fire({
            icon: 'success',
            title: 'Depósito Ingresado.'
        })    
    }
  });
  