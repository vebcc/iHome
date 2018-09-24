function drawtempin(){
    $.get('include/handlers.php?id=5&name=get&value=temp', function(result) {
        var wyntemp = parseInt(result);
        //console.log("resulttemp: " + result);
        //console.log("temp: " + wyntemp);
        if(isNaN(wyntemp)){
			$('#motionsensor1').html("Error");
        }else{
            if(wyntemp>100 && wyntemp<-20){
				$('#motionsensor1').html("Error");
            }else{
                $('#tempin1').html(wyntemp);
            }
        }
    });
}
function drawwilin(){
    $.get('include/handlers.php?id=5&name=get&value=wil', function(result) {
        var wynhumi = parseInt(result);
        //console.log("resulthumi: " + result);
        //console.log("humi: " + wynhumi);
        if(isNaN(wynhumi)){
			$('#motionsensor1').html("Error");
        }else{
            if(wynhumi>100 && wynhumi<0){
				$('#motionsensor1').html("Error");
            }else{
                $('#wilin1').html(wynhumi);
            }
        }
    });
}

function drawtempout(){
    $.get('include/handlers.php?id=6&name=get&value=temp', function(result) {
        var wyntemp = parseInt(result);
        //console.log("resulttemp: " + result);
        //console.log("temp: " + wyntemp);
        if(isNaN(wyntemp)){
			$('#motionsensor1').html("Error");
        }else{
            if(wyntemp>100 && wyntemp<-20){
				$('#motionsensor1').html("Error");
            }else{
                $('#tempout1').html(wyntemp);
            }
        }
    });
}
function drawwilout(){
    $.get('include/handlers.php?id=6&name=get&value=wil', function(result) {
        var wynhumi = parseInt(result);
        //console.log("resulthumi: " + result);
        //console.log("humi: " + wynhumi);
        if(isNaN(wynhumi)){
			$('#motionsensor1').html("Error");
        }else{
            if(wynhumi>100 && wynhumi<0){
				$('#motionsensor1').html("Error");
            }else{
                $('#wilout1').html(wynhumi);
            }
        }
    });
}

setTimeout(function(){ drawtempin(); }, 100);
setTimeout(function(){ drawwilin(); }, 100);
setTimeout(function(){ drawtempout(); }, 100);
setTimeout(function(){ drawwilout(); }, 100);

setInterval(function(){ drawtempin(); }, 10000);
setInterval(function(){ drawwilin(); }, 10000);
setInterval(function(){ drawtempout(); }, 10000);
setInterval(function(){ drawwilout(); }, 10000);
