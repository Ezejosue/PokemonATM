// Definir las reglas de validación
var constraintsRetiro = {
    cantidadRetirar: {
      presence: {
        message: "Cantidad",
      },
      length: {
        minimum: 1,
        message: "Requerida",
      },
    },
  };

  document.getElementById("ButtonRetirar").addEventListener("click", function () {
    var formValuesRetiro = {
        cantidadRetirar: document.getElementById("cantidadRetirar").value,
    };
  
    var errorsRe = validate(formValuesRetiro, constraintsRetiro);
  
    document.getElementById("errors_retiro").innerHTML = "";
  
    if (errorsRe) {
      for (var key in errorsRe) {
        document.getElementById("errors_retiro").innerHTML += errorsRe[key] + "<br>";
      }
    }else{
        let timerInterval
        Swal.fire({
        title: 'Retirando Efectivo...',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {

                document.getElementById("cantidadRetirar").value = "";

                Swal.fire({
                    icon: 'success',
                    title: 'Retire el efectivo'
                });
                
                $("#pokemonModalRetiro").modal('hide');
            }
        });
    }
  });
  