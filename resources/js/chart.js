var ctx = document.getElementById("myChart").getContext("2d");
var chart = new Chart(ctx, {
    // tipo de grafico
    type: 'bar',

    // Datos de MisFinanzas 
    data: {
        labels: ["Rosario", "Pizza Hut", "Texaco", "Callejas S.A"],
        datasets: [
            {
            label: 'Compras',
            data: [20,40,60,45],
            backgroundColor:  [
                'rgba(255, 99, 132, 0.2 )',
                'rgba(54, 162, 235, 0.2 )',
                'rgba(255, 206, 86, 0.2 )',
                'rgba(75, 192, 192, 0.2 )',
               
             ],
            borderColor: [
                'rgba(255, 99, 132, 1 )',
                'rgba(54, 162, 235, 1 )',
                'rgba(255, 206, 86, 1 )',
                'rgba(75, 192, 192, 1 )',
             
            ],
            borderWidth: 2
        }]
    },

    // Configuration options go here
    options: {
        scales: {
             yAxes:[{

                ticks:  {
                        beginAtZero: true
                        }
                   }]
                 }
            
            }
  
});