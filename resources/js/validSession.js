/* 
    Agreamos un evento de escucha en el DOM para que cuando este cargado por completo
    valide que la session exista
*/
document.addEventListener("DOMContentLoaded", function () {
  // obtenemos del localStorage con el metodo getItem
  var user_data = localStorage.getItem("session_user");
  // si no tiene valores eso quiere decir que es nulo = null
  if (user_data == null) {
    location.href = "./index.html";
  } else {
    // Creamos un variable par asignar los datos de la session en formato json
    let datos = JSON.parse(user_data);
    // pasamos a las etiquetas HTML el valor del Nombre y la cuenta.
    document.getElementById("nombre").innerText = datos.Nombre;
    document.getElementById("cuenta").innerText = datos.Cuenta;

    cargarTransacciones(datos.transacciones);
    procesarTransaccionesParaGraficos(datos.transacciones);
    calcularPromedioRetiros(datos.transacciones);

    document
      .getElementById("buscarTransaccion")
      .addEventListener("input", function (e) {
        var textoBusqueda = e.target.value.toLowerCase(); // Convertir la búsqueda a minúsculas para hacerla insensible a mayúsculas
        var transaccionesFiltradas = datos.transacciones.filter(function (
          transaccion
        ) {
          // Verificar si el concepto, la fecha o el monto contiene el texto buscado
          return (
            transaccion.concepto.toLowerCase().includes(textoBusqueda) ||
            transaccion.fecha.includes(textoBusqueda) ||
            transaccion.monto.toString().includes(textoBusqueda)
          );
        });

        // Actualizar la tabla con las transacciones filtradas
        cargarTransacciones(transaccionesFiltradas);
      });
  }
});

function cargarTransacciones(transacciones) {
  if (transacciones) {
    var tablaTransacciones = document.getElementById("tablaTransacciones");
    tablaTransacciones.innerHTML = ""; // Limpia la tabla antes de cargar nuevas transacciones

    transacciones.forEach(function (transaccion) {
      var fila = tablaTransacciones.insertRow();
      fila.insertCell(0).textContent = transaccion.concepto;
      fila.insertCell(1).textContent = transaccion.fecha;
      fila.insertCell(2).textContent = transaccion.tipo;
      fila.insertCell(3).textContent = `$${transaccion.monto.toFixed(2)}`;
    });
  }
}

function procesarTransaccionesParaGraficos(transacciones) {
  let totales = { deposito: 0, retiro: 0 };

  // Calcula los totales de depósitos y retiros
  transacciones.forEach((t) => {
    if (t.tipo === "deposito") {
      totales.deposito += t.monto;
    } else if (t.tipo === "retiro") {
      totales.retiro += t.monto;
    }
  });

  // Actualiza el gráfico
  actualizarGraficoDeBarras(totales);
}

var myChart;

function actualizarGraficoDeBarras(totales) {
  var ctx = document.getElementById("myChart").getContext("2d");

  // Destruir la instancia actual del gráfico si existe
  if (myChart) {
    myChart.destroy();
  }

  // Crear una nueva instancia del gráfico con los datos actualizados
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Depósitos", "Retiros"],
      datasets: [
        {
          label: "Monto",
          data: [totales.deposito, totales.retiro],
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255,99,132,1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function calcularPromedioRetiros(transacciones) {
  let totalRetiros = 0;
  let contadorRetiros = 0;

  // Suma solo las transacciones de tipo 'retiro' y cuenta cuántas hay
  transacciones.forEach((transaccion) => {
    if (transaccion.tipo === "retiro") {
      totalRetiros += transaccion.monto;
      contadorRetiros++;
    }
  });

  // Calcula el promedio de retiros
  let promedioRetiros =
    contadorRetiros > 0 ? totalRetiros / contadorRetiros : 0;

  // Actualiza el gráfico
  actualizarGraficoPromedioRetiros(promedioRetiros);
}

var myChart2;

function actualizarGraficoPromedioRetiros(promedioRetiros) {
  var ctx = document.getElementById("myChart2").getContext("2d");

  // Destruir la instancia actual del gráfico si existe
  if (myChart2) {
    myChart2.destroy();
  }

  // Crear una nueva instancia del gráfico con los datos actualizados
  myChart2 = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Promedio de Retiros"],
      datasets: [
        {
          label: "Promedio de Retiros",
          data: [promedioRetiros],
          backgroundColor: ["rgba(255, 159, 64, 0.2)"],
          borderColor: ["rgba(255, 159, 64, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Promedio de Retiros",
      },
      animation: {
        animateScale: true,
        animateRotate: true,
      },
    },
  });
}
