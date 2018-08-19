function drawtempin(){
    $.get('include/handlers.php?id=1&name=get&value=temp', function(result) {
        var wyntemp = parseInt(result);
        console.log("resulttemp: " + result);
        console.log("temp: " + wyntemp);
        if(isNaN(wyntemp)){
            //setTimeout(function() { drawtempin(); }, 1000);
        }else{
            if(wyntemp>100 && wyntemp<-20){
                //setTimeout(function() { drawtempin(); }, 1000);
            }else{
                $('#tempin1').html(wyntemp);
            }
        }
    });
}
function drawwilin(){
    $.get('include/handlers.php?id=1&name=get&value=wil', function(result) {
        var wynhumi = parseInt(result);
        console.log("resulthumi: " + result);
        console.log("humi: " + wynhumi);
        if(isNaN(wynhumi)){
            //setTimeout(function() { drawtempin(); }, 1000);
        }else{
            if(wynhumi>100 && wynhumi<0){
                //setTimeout(function() { drawwilin(); }, 1000);
            }else{
                $('#wilin1').html(wynhumi);
            }
        }
    });
}

function drawtempout(){
    $.get('include/handlers.php?id=5&name=get&value=temp', function(result) {
        var wyntemp = parseInt(result);
        console.log("resulttemp: " + result);
        console.log("temp: " + wyntemp);
        if(isNaN(wyntemp)){
            //setTimeout(function() { drawtempin(); }, 1000);
        }else{
            if(wyntemp>100 && wyntemp<-20){
                //setTimeout(function() { drawtempin(); }, 1000);
            }else{
                $('#tempout1').html(wyntemp);
            }
        }
    });
}
function drawwilout(){
    $.get('include/handlers.php?id=5&name=get&value=wil', function(result) {
        var wynhumi = parseInt(result);
        console.log("resulthumi: " + result);
        console.log("humi: " + wynhumi);
        if(isNaN(wynhumi)){
            //setTimeout(function() { drawtempin(); }, 1000);
        }else{
            if(wynhumi>100 && wynhumi<0){
                //setTimeout(function() { drawwilin(); }, 1000);
            }else{
                $('#wilout1').html(wynhumi);
            }
        }
    });
}

drawtempin();
drawwilin();
drawtempout();
drawwilout();
setInterval(function(){ drawtempin(); }, 10000);
setInterval(function(){ drawwilin(); }, 10000);
setInterval(function(){ drawtempout(); }, 10000);
setInterval(function(){ drawwilout(); }, 10000);
