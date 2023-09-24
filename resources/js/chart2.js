var ctxchart2 = document.getElementById("myChart2").getContext("2d");
var chart2 = new Chart(ctxchart2, {
    // tipo de grafico
    type: 'bar',

    // Datos de MisFinanzas 
    data: {
        labels: ["15-06-2023", "16-09-2023", "17-09-2023", "18-09-2023"],
        datasets: [
            {
            label: 'Ingrersos',
            data: [42,55,65,70],
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

                ticks: {
                    beginAtZero: true
                       }
                    }]
             }
            
            }
  
});