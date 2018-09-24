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
		$.get('include/handlers.php?id=6&name=lamptype&value=status', function(result2) {
			var lamptype = parseInt(result2);
			//console.log("resulttemp: " + result);
			if(isNaN(lamptype)){
				$('#6-out1-stat-sensor > td:nth-child(2) > span').html("Error: NaN");
			}else{
				if(wynsensor==1){
					$('#6-out1-stat-sensor > td:nth-child(2) > span').html("OFF");
				}else if(wynsensor==-1){
					$('#6-out1-stat-sensor > td:nth-child(2) > span').html("Error: -1");
				}else if(wynsensor==0){
					$('#6-out1-stat-sensor > td:nth-child(2) > span').html("ON");
				}else{
					$('#6-out1-stat-sensor > td:nth-child(2) > span').html("Error: "+sensordaydec);
				}
			}
			$.get('include/handlers.php?id=6&name=sensordaydec&value=status', function(result3) {
				var sensordaydec = parseInt(result3);
				//console.log("sensordaydec: " + sensordaydec);
				//console.log("sensordaydecres: " + result3);
				if(isNaN(sensordaydec)){
					$('#6-out1-stat-sensor > td:nth-child(2) > span').html("Error: NaN");
				}else{
					if(sensordaydec==1){
						$('#6-out1-stat-sensor > td:nth-child(3) > span').html("OFF");
					}else if(sensordaydec=-1){
						$('#6-out1-stat-sensor > td:nth-child(3) > span').html("Error: -1");
					}else if(sensordaydec==0){
						$('#6-out1-stat-sensor > td:nth-child(3) > span').html("ON");
					}else{
						$('#6-out1-stat-sensor > td:nth-child(3) > span').html("Error: "+sensordaydec);
					}
				}
			});
		});
	});
}

setTimeout(function(){ drawsensor1(); }, 100);

setInterval(function(){ drawsensor1(); }, 10000);




