var ress=2;
//console.log("siema");
function changeactive(id, who, forwhat, revers=0){
    if(forwhat==revers){
        $('#'+id+'-'+who+'-stat > td:nth-child(3) > span.off').removeClass('hide');
        $('#'+id+'-'+who+'-stat > td:nth-child(3) > span.on').addClass('hide');
    }else{
        $('#'+id+'-'+who+'-stat > td:nth-child(3) > span.on').removeClass('hide');
        $('#'+id+'-'+who+'-stat > td:nth-child(3) > span.off').addClass('hide');
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Status all //
////////////////

function statusall(){
    $.get('include/handlers.php?id=1&name=status&value=all', function(result) {
        //console.log("status1: "+result);
        var resspl = result.split(",");
        changeactive("1", "out1", resspl[0], 1);
        changeactive("1", "out2", resspl[1], 1);
        changeactive("1", "out3", resspl[2]);
        changeactive("1", "out4", resspl[3]);
    });
    $.get('include/handlers.php?id=2&name=status&value=all', function(result) {
        //console.log("status2: "+result);
        var resspl = result.split(",");
        changeactive("2", "out1", resspl[0]);
        changeactive("2", "out2", resspl[1]);
        changeactive("2", "out3", resspl[2]);
    });
    $.get('include/handlers.php?id=4&name=status&value=all', function(result) {
        //console.log("status4: "+result);
        var resspl = result.split(",");
        changeactive("4", "out1", resspl[0]);
    });
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 1
// Maslo //
///////////

//biurko przod cieply
$('#1-out2-button-change').click(function() {
    $.get('include/handlers.php?id=1&name=out2&value=change', function(result) {
        changeactive("1", "out2", result);
        console.log("biurko przod cieply: "+result);
    });
});

//biurko przod zimny
$('#1-out3-button-change').click(function() {
    $.get('include/handlers.php?id=1&name=out3&value=change', function(result) {
        changeactive("1", "out3", result);
        console.log("biurko przod zimny: "+result);
    });
});

//biurko bok
$('#1-out1-button-change').click(function() {
    $.get('include/handlers.php?id=1&name=out1&value=change', function(result) {
        changeactive("1", "out1", result);
        console.log("biurko bok: "+result);
    });
});

//podswietlenie glosnikow
$('#1-out4-button-change').click(function() {
    $.get('include/handlers.php?id=1&name=out4&value=change', function(result) {
        changeactive("1", "out4", result);
        console.log("podswietlenie glosnikow: "+result);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 2
// Maslo //
///////////

//ciepla slaba lampa
$('#2-out1-button-change').click(function() {
    $.get('include/handlers.php?id=2&name=out1&value=change', function(result) {
        changeactive("2", "out1", result, 1);
        console.log("zimna lampa: "+result);
    });
});

//zimna lampa
$('#2-out2-button-change').click(function() {
    $.get('include/handlers.php?id=2&name=out2&value=change', function(result) {
        changeactive("2", "out2", result, 1);
        console.log("ciepla lampa: "+result);
    });
});

//ciepla lampa
$('#2-out3-button-change').click(function() {
    $.get('include/handlers.php?id=2&name=out3&value=change', function(result) {
        changeactive("2", "out3", result);
        console.log("ciepla slaba lampa: "+result);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 3
// Maslo //
///////////

//laser dyskotekowy
$('#3-out1-button-change').click(function() {
    $.get('include/handlers.php?id=3&name=out1&value=change', function(result) {
        changeactive("3", "out1", result);
        console.log("laser dyskotekowy: "+result);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 4
// Szymon //
////////////

//lampa glowna
$('#4-out1-button-change').click(function() {
    $.get('include/handlers.php?id=4&name=out1&value=change', function(result) {
        changeactive("4", "out1", result);
        console.log("szymon-lampa glowna: "+result);
    });
});

statusall();
setInterval(function(){ statusall(); }, 2000);
