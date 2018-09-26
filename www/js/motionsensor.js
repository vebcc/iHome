function drawsensor1(){
	$.get('include/handlers.php?id=6&name=motion&value=sensor', function(result) {
		var wynsensor = parseInt(result);
		//console.log("resulttemp: " + result);
		if(isNaN(wynsensor)){
			$('#motionsensor1').html("Error: NaN");
		}else{
			if(wynsensor==1){
				$('#motionsensor1').html("Ruch");
			}else if(wynsensor==0){
				$('#motionsensor1').html("Brak ruchu");
			}else if(sensordaydec=-1){
				$('#motionsensor1').html("Error: -1");
			}else{
				$('#motionsensor1').html("Error: "+wynsensor);
			}
		}
	});
}

setTimeout(function(){ drawsensor1(); }, 100);

setInterval(function(){ drawsensor1(); }, 2000);




