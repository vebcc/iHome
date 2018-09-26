var ress=2;
//console.log("siema");
function changeactive(id, who, forwhat, revers=0){
	if(revers==0){
		if(forwhat==0){
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.off').removeClass('hide');
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.on').addClass('hide');
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.error').addClass('hide');
		}else if(forwhat==1){
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.on').removeClass('hide');
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.off').addClass('hide');
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.error').addClass('hide');
		}else if(forwhat==-1){
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.off').addClass('hide');
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.on').addClass('hide');
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.error').removeClass('hide');
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.error').html("Error: -1");
		}else{
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.off').addClass('hide');
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.on').addClass('hide');
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.error').removeClass('hide');
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.error').html("Error: fu");
		}
	}else{
		if(forwhat==1){
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.off').removeClass('hide');
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.on').addClass('hide');
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.error').addClass('hide');
		}else if(forwhat==0){
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.on').removeClass('hide');
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.off').addClass('hide');
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.error').addClass('hide');
		}else if(forwhat==-1){
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.off').addClass('hide');
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.on').addClass('hide');
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.error').removeClass('hide');
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.error').html("Error: -1");
		}else{
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.off').addClass('hide');
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.on').addClass('hide');
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.error').removeClass('hide');
			$('#'+id+'-'+who+'-stat > td:nth-child(3) > span.error').html("Error: fu");
		}
	}
}

function changesensoractive(id, who, forwhat, opt, revers=0){
	if(revers==0){
		if(forwhat==1){
			$('#'+id+'-'+who+'-stat-sensor > td:nth-child('+opt+') > span').html("ON");
		}else if(forwhat==-1){
			$('#'+id+'-'+who+'-stat-sensor > td:nth-child('+opt+') > span').html("Error: -1");
		}else if(forwhat==0){
			$('#'+id+'-'+who+'-stat-sensor > td:nth-child('+opt+') > span').html("OFF");
		}else{
			$('#'+id+'-'+who+'-stat-sensor > td:nth-child('+opt+') > span').html("Error: "+forwhat);
		}
	}else{
		if(forwhat==0){
			$('#'+id+'-'+who+'-stat-sensor > td:nth-child('+opt+') > span').html("ON");
		}else if(forwhat==-1){
			$('#'+id+'-'+who+'-stat-sensor > td:nth-child('+opt+') > span').html("Error: -1");
		}else if(forwhat==1){
			$('#'+id+'-'+who+'-stat-sensor > td:nth-child('+opt+') > span').html("OFF");
		}else{
			$('#'+id+'-'+who+'-stat-sensor > td:nth-child('+opt+') > span').html("Error: "+forwhat);
		}
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
	$.get('include/handlers.php?id=3&name=status&value=all', function(result) {
		//console.log("status3: "+result);
		var resspl = result.split(",");
		changeactive("3", "out1", resspl[0]);
	});
    $.get('include/handlers.php?id=4&name=status&value=all', function(result) {
        //console.log("status4: "+result);
        var resspl = result.split(",");
        changeactive("4", "out1", resspl[0]);
    });
	//TODO: Dodać do sterownika na zewnatrz w statusall dane lamp type i sensor dec
	$.get('include/handlers.php?id=6&name=status&value=all', function(result) {
		//console.log("status6: "+result);
		var resspl = result.split(",");
		//console.log("status6re: "+resspl);
		changeactive("6", "out1", resspl[0]);
		changesensoractive(6, "out1", resspl[4], 2);
		changesensoractive(6, "out1", resspl[3], 3);
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 3
// Maslo //
///////////

//laser dyskotekowy
$('#6-out1-button-change').click(function() {
	$.get('include/handlers.php?id=6&name=out1&value=change', function(result) {
		changeactive("6", "out1", result);
		//$.get('include/handlers.php?id=6&name=lamptype&value=status', function(result) {
		//	//changesensoractive("6", "lamptype", result); TODO:// funkcja nie mogla by dziala stworzyc nowa lub recznie
		//	changesensoractive(6, "out1", result, 2);
		//	$.get('include/handlers.php?id=6&name=sensordaydec&value=status', function(result) {
		//		changesensoractive(6, "out1", result, 3);
		//	});
		//});
	});
});
$('#6-out1-lamptype-change').click(function() {
	$.get('include/handlers.php?id=6&name=lamptype&value=change', function(result) {
		changesensoractive(6, "out1", result, 2);
	});
});
$('#6-out1-sensordaydec-change').click(function() {
	$.get('include/handlers.php?id=6&name=sensordaydec&value=change', function(result) {
		//console.log("change");
		changesensoractive(6, "out1", result, 3);
		//console.log("sensordaydec=change: " + result);
	});
});

setTimeout(function(){ statusall(); }, 100);
setInterval(function(){ statusall(); }, 2000);
