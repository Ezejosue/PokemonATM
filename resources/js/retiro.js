// Creamos un json con los usuarios que podran acceder al ATM
var recibos = [
        {
            "TipoRecibo": "Agua",
            "Total": 30.00,
            "NPE": "1000 3100 9550 6433",
        },
        {
            "TipoRecibo": "CAESS",
            "Total": 25.00,
            "NPE": "2346 4507 8943 1347",
        },
    ];





// Recuperar del localstorage los datos de la session
let user_data = localStorage.getItem('session_user');
let datos = JSON.parse(user_data);
// pasamos del array de  localstorage el saldoInicial
var saldoActualPokemon = datos.SaldoInicial;

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
        var inputRetiro = document.getElementById("cantidadRetirar").value;
        if(inputRetiro > saldoActualPokemon){
          Swal.fire({
              icon: 'error',
              title: 'Saldo insuficiente... :('
          });
        }else{
          let timerInterval
          const alertSound = new Audio('resources/audio/pokemon.mp3');
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
              alertSound.play();
          }
          })
          .then((result) => {
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
    }
  });
  