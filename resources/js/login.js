// Creamos un json con los usuarios que podran acceder al ATM
var usuarios = [
        {
            "Nombre": "Vladimir Alvarado",
            "PIN": 6666,
            "Cuenta": "0987654321",
            "SaldoInicial": 300.00
        },
        {
            "Nombre": "Sofia Lopez",
            "PIN": 1111,
            "Cuenta": "1234567890",
            "SaldoInicial": 500.00
        },
        {
            "Nombre": "Gerardo Marroquin",
            "PIN": 9999,
            "Cuenta": "9876543219",
            "SaldoInicial": 950.00
        },
        {
            "Nombre": "Josue Avalos",
            "PIN": 7896,
            "Cuenta": "964785142",
            "SaldoInicial": 800.00
        },
        {
            "Nombre": "Kevin Martinez",
            "PIN": 2806,
            "Cuenta": "0584457894",
            "SaldoInicial": 700.00
        }
    ];
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

    // obtenemos el click del boton iniciar sesion
  document.getElementById("btn-login").addEventListener("click", function () {
    // aplicamos la reglar de la validación
    var formValues = {
      pin: document.getElementById("pin").value,
    };
  
    var errors = validate(formValues, constraints);
  
    document.getElementById("errors").innerHTML = "";
  
    if (errors) {
        // recorremos la lista de errores de la validación 
      for (var key in errors) {
        document.getElementById("errors").innerHTML += errors[key] + "<br>";
      }
    }else{
        // obtenmos el valor del input del login
        var pin = document.getElementById("pin").value;
        /* 
            Con la funcion filtel buscamos dentro del json un valor en especificio
            En este caso buscamos el valor del input 
        */
        let user = usuarios.filter((obj) => obj.PIN == pin);
        if(user.length > 0){
            // lanzamos la alerta con la animacion de cargando para iniciar session
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
                    if (result.dismiss === Swal.DismissReason.timer) {
                        /* 
                        Creacion un variable en el localStorage con el objeto del usuarios
                        que ingreso in PIN
                        */
                        localStorage.setItem("session_user",JSON.stringify(user[0]));
                        // Redireccionamos al usuario a la pagina inicial
                        window.location.href = './pagina_inicial.html';
                    }
                });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'PIN Incorrecto'
            });
            // limpiamos el input al poner un PIN incorrecto 
            document.getElementById("pin").value = "";
        }
    }
  });
  