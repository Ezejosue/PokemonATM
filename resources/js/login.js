// Definir las reglas de validación
var constraints = {
    pin: {
      presence: {
        message: "Ingrese el PIN es requerido.",
      },
      length: {
        minimum: 4,
        message: "El PIN debe tener 4 caracteres.",
      },
    },
  };

  document.getElementById("btn-login").addEventListener("click", function () {
    var formValues = {
      pin: document.getElementById("pin").value,
    };
  
    var errors = validate(formValues, constraints);
  
    document.getElementById("errors").innerHTML = "";
  
    if (errors) {
      for (var key in errors) {
        document.getElementById("errors").innerHTML += errors[key] + "<br>";
      }
    }else{
        var pwd = document.getElementById("pin").value;
        if(pwd == '1234'){
            let timerInterval
            Swal.fire({
                title: 'Ingresando...',
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
                        window.location.href = 'pagina_inicial.html';
                    }
                });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Contraseña Incorrecta'
            })
        }
        
    }
  });
  