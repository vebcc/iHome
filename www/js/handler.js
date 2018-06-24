var how=0;

$('#glosnikiledvalue').val(100);
$('#glosnikiledperc').html(100);

function changeactive(who, forwhat, revers=0){
    if(forwhat==revers){
        $('#'+who+'off').removeClass('active');
        $('#'+who+'on').addClass('active');
    }else{
        $('#'+who+'on').removeClass('active');
        $('#'+who+'off').addClass('active');
    }
}

function firststatloader(){
        console.log("how"+how);
        switch(how){
            case 0:
               $.get('include/handlers.php?id=1&name=biurkoled&value=status&onlycheck=1', function(result) {
                    changeactive("biurkoled", result);
                    console.log(result);
                });
                break;
            case 1:
                $.get('include/handlers.php?id=1&name=biurkoright&value=status&onlycheck=1', function(result) {
                    changeactive("biurkoright", result);
                    console.log(result);
                });
                break;
            case 2:
                $.get('include/handlers.php?id=1&name=glosnikiled&value=status&onlycheck=1', function(result) {
                    changeactive("glosnikiled", result, 1);
                });
                break;
            case 3:
                $.get('include/handlers.php?id=1&name=glosnikiled&value=values&onlycheck=1', function(result) {
                    $('#glosnikiledvalue').val(result);
                    $('#glosnikiledperc').html(result);
                    //console.log("result: "+result);
                });
                break;
            case 4:
                $.get('include/handlers.php?id=2&name=lamp1&value=status&onlycheck=1', function(result) {
                    changeactive("lampazimny", result, 1);
                });
                break;
            case 5:
                $.get('include/handlers.php?id=2&name=lamp2&value=status&onlycheck=1', function(result) {
                    changeactive("lampacieply", result, 1);
                });
                break;
            case 6:
                $.get('include/handlers.php?id=2&name=lamp3&value=status&onlycheck=1', function(result) {
                    changeactive("lampalekka", result, 1);
                });
                break;
            case 7:
                $.get('include/handlers.php?id=3&name=disco&value=status&onlycheck=1', function(result) {
                    changeactive("laserdisco", result, 1);
                });
                break;

        }
        if(how<7){
            how++;
            setTimeout(function(){ firststatloader(); }, 200);
        }
}

$(document).ready(function(){
    //$('div.light').html('<img src="images/off.png" width="50" height="50">')

    setInterval(function() {
        //$('#timeval').load('includes/time.php');
    }, 1000);

    //biurko led
    $('#biurkoledchange').click(function() {
        $.get('include/handlers.php?id=1&name=biurkoled&value=change', function(result) {
            changeactive("biurkoled", result);
        });
    });
    $('#biurkoledoff').click(function() {
        $.get('include/handlers.php?id=1&name=biurkoled&value=on', function(result) {
            changeactive("biurkoled", result);
        });
    });
    $('#biurkoledon').click(function() {
        $.get('include/handlers.php?id=1&name=biurkoled&value=off', function(result) {
            changeactive("biurkoled", result);
        });
    });

    //biurko right
    $('#biurkorightchange').click(function() {
        $.get('include/handlers.php?id=1&name=biurkoright&value=change', function(result) {
            changeactive("biurkoright", result);
        });
    });
    $('#biurkorightoff').click(function() {
        $.get('include/handlers.php?id=1&name=biurkoright&value=on', function(result) {
            changeactive("biurkoright", result);
        });
    });
    $('#biurkorighton').click(function() {
        $.get('include/handlers.php?id=1&name=biurkoright&value=off', function(result) {
            changeactive("biurkoright", result);
        });
    });

    //glosnikiled
    $('#glosnikiledchange').click(function() {
        $.get('include/handlers.php?id=1&name=glosnikiled&value=change', function(result) {
            changeactive("glosnikiled", result, 1);
        });
    });
    $('#glosnikiledoff').click(function() {
        $.get('include/handlers.php?id=1&name=glosnikiled&value=off', function(result) {
            changeactive("glosnikiled", result, 1);
        });
    });
    $('#glosnikiledon').click(function() {
        $.get('include/handlers.php?id=1&name=glosnikiled&value=on', function(result) {
            changeactive("glosnikiled", result, 1);
        });
    });
    $('#glosnikiledvalue').change(function() {
        newVal = $('#glosnikiledvalue').val();
        //console.log("newVal: "+newVal);
        $.get('include/handlers.php?id=1&name=glosnikiled&value='+newVal, function(result) {
            $('#glosnikiledvalue').val(result);
            $('#glosnikiledperc').html(result);
            //console.log("result: "+result);
        });
    });

    //lampa zimny
    $('#lampazimnychange').click(function() {
        $.get('include/handlers.php?id=2&name=lamp1&value=change', function(result) {
            changeactive("lampazimny", result, 1);
        });
    });
    $('#lampazimnyon').click(function() {
        $.get('include/handlers.php?id=2&name=lamp1&value=on', function(result) {
            changeactive("lampazimny", result, 1);
        });
    });
    $('#lampazimnyoff').click(function() {
        $.get('include/handlers.php?id=2&name=lamp1&value=off', function(result) {
            changeactive("lampazimny", result, 1);
        });
    });



    //lampa cieply
    $('#lampacieplychange').click(function() {
        $.get('include/handlers.php?id=2&name=lamp2&value=change', function(result) {
            changeactive("lampacieply", result, 1);
        });
    });
    $('#lampacieplyon').click(function() {
        $.get('include/handlers.php?id=2&name=lamp2&value=on', function(result) {
            changeactive("lampacieply", result, 1);
        });
    });
    $('#lampacieplyoff').click(function() {
        $.get('include/handlers.php?id=2&name=lamp2&value=off', function(result) {
            changeactive("lampacieply", result, 1);
        });
    });

    //lampalekka
    $('#lampalekkachange').click(function() {
        $.get('include/handlers.php?id=2&name=lamp3&value=change', function(result) {
            changeactive("lampalekka", result, 1);
        });
    });
    $('#lampalekkaon').click(function() {
        $.get('include/handlers.php?id=2&name=lamp3&value=on', function(result) {
            changeactive("lampalekka", result, 1);
        });
    });
    $('#lampalekkaoff').click(function() {
        $.get('include/handlers.php?id=2&name=lamp3&value=off', function(result) {
            changeactive("lampalekka", result, 1);
        });
    });

    //laser disco
    $('#laserdiscochange').click(function() {
        $.get('include/handlers.php?id=3&name=disco&value=change', function(result) {
            changeactive("laserdisco", result, 1);
        });
    });
    $('#laserdiscoon').click(function() {
        $.get('include/handlers.php?id=3&name=disco&value=on', function(result) {
            changeactive("laserdisco", result, 1);
        });
    });
    $('#laserdiscooff').click(function() {
        $.get('include/handlers.php?id=3&name=disco&value=off', function(result) {
            changeactive("laserdisco", result, 1);
        });
    });

    firststatloader();
});


