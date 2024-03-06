<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
  <head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">

	  let dataAry = [['Sido','Cnt Per Sido']]; // [['Sido'],['Cnt Per Sido'],['서울',33].[]....[]]
	  
        fetch('../getSidoInfo.do')
        .then(resolve => resolve.json())
        .then(result => {
        	console.log(result) // [{sido: '서울특별시', cnt: 43}]
        	// [{},{}] -> [[],[]]
            result.forEach(function(item){
            	dataAry.push([item.sido, item.cnt])
            	
           /* result.forEach(item => {
        	  let ary = [];
        	  for (let prop in item){
        		  ary.push(item[prop]);
        	  }
          	 dataAry.push(ary;) 
          })*/
          
            })
            console.log(dataAry)
          	google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart);
        	
        })
        .catch(err => console.log(err));  
	  
        function drawChart() {

        var data = google.visualization.arrayToDataTable(dataAry);

        var options = {
          title: '일과 구성표'
        };
		
        
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
		
        chart.draw(data, options);
      }
    </script>
  </head>
  <body>
    <div id="piechart" style="width: 900px; height: 500px;"></div>
  </body>
</html>
