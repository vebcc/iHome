function buttons(romrom){
    var romero = romrom.split(":");
    var lenrom = romero.length-1;
    //console.log(romero);
    var temper = "include/buttons.php";
    for(x=0;x<lenrom;x++){
        //console.log("x: "+romero[x]);
        temper = "include/buttons.php?roomid="+romero[x];
        $.get(temper, function(result2) {
            //console.log(result2);
            var resspl2 = result2.split("<br>");
            printer = "";
            for(i=1;i<resspl2.length-1;i++){
                //console.log(resspl2);
                //console.log("i: "+i);
                var kuwyn2 = resspl2[i].split(":");
                printer += "<tr><td>"+kuwyn2[4]+"</td><td><button id='"+kuwyn2[1]+"-out"+kuwyn2[2]+"-button-change' type='button' class='btn btn-secondary'>Zmień</button></td></tr>";
                var xor = kuwyn2[0];
            }
            //console.log("xor: "+xor);
            var outtt = "#buttons-"+xor;
            $(outtt).html(printer);
        });
    }

//TODO:// problem z jq petla wykonuje sie szybciej niz jq zapytanie 
console.log("Loader - handler");

$LAB
.script("include/buttons.php?printclicker=1").wait(function(){console.log("Załadowano -buttonclicker")})

}

function handler(){
    $.get('include/rooms.php', function(result){
        var resspl = result.split("<br>");
        //console.log(resspl);
        var printer ="";
        var romero = "";
        for(i=1;i<resspl.length-1;i++){
            var kuwyn = resspl[i].split(":");
            printer += "<div class='col-md-3'><h2>"+kuwyn[1]+"</h2><table class='table table-striped' id='buttons-"+kuwyn[0]+"'></table></div>";
            romero += kuwyn[0]+":";
        }
        $('#handlertime').html(printer);
        buttons(romero);
    });
}

function getclicker(){
    $.get("include/buttons.php?printclicker=1", function(result3) {
       
        $("#buttonscript").html(result3);
    });
    
}

handler();
//getclicker();
