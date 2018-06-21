$(document).ready(function(){
    $('div.light').html('<img src="images/off.png" width="50" height="50">')

    setInterval(function() {
        $('#timeval').load('includes/time.php');
    }, 1000);

    //biurko led
    $('#biurkoledchange').click(function() {
        $('#biurkoledstatus').load('include/handlers.php?id=1&name=biurkoled&value=change');
    });
    $('#biurkoledoff').click(function() {
        $('#biurkoledstatus').load('include/handlers.php?id=1&name=biurkoled&value=on');
    });
    $('#biurkoledoff').click(function() {
        $('#biurkoledstatus').load('include/handlers.php?id=1&name=biurkoled&value=off');
    });

    //biurko right
    $('#biurkorightchange').click(function() {
        $('#biurkorightstatus').load('include/handlers.php?id=1&name=biurkoright&value=change');
    });
    $('#biurkorightoff').click(function() {
        $('#biurkorightstatus').load('include/handlers.php?id=1&name=biurkoright&value=on');
    });
    $('#biurkorightoff').click(function() {
        $('#biurkorightstatus').load('include/handlers.php?id=1&name=biurkoright&value=off');
    });

    //glosnikiled
    $('#glosnikiledchange').click(function() {
        $('#glosnikiledstatus').load('include/handlers.php?id=1&name=glosnikiled&value=change');
    });
    $('#glosnikiledoff').click(function() {
        $('#glosnikiledstatus').load('include/handlers.php?id=1&name=glosnikiled&value=on');
    });
    $('#glosnikiledoff').click(function() {
        $('#glosnikiledstatus').load('include/handlers.php?id=1&name=glosnikiled&value=off');
    });
    $('#glosnikiledvalue').change(function() {
        newVal = document.getElementById("glosnikiledvalue").value;
        console.log("newVal: "+newVal);
        $.get('include/handlers.php?id=1&name=glosnikiled&value='+newVal, function(result) {
            $('#glosnikiledvalue').val(result);
            $('#glosnikiledperc').html(result);
            console.log("result: "+result);
        });
    });

    //lampa zimny
    $('#lampazimnychange').click(function() {
        $('#lampazimnystatus').load('include/handlers.php?id=2&name=lamp1&value=change');
    });
    $('#lampazimnyoff').click(function() {
        $('#lampazimnystatus').load('include/handlers.php?id=2&name=lamp1&value=on');
    });
    $('#lampazimnyoff').click(function() {
        $('#lampazimnystatus').load('include/handlers.php?id=2&name=lamp1&value=off');
    });

    //lampa cieply
    $('#lampacieplychange').click(function() {
        $('#lampacieplystatus').load('include/handlers.php?id=2&name=lamp2&value=change');
    });
    $('#lampacieplyoff').click(function() {
        $('#lampacieplystatus').load('include/handlers.php?id=2&name=lamp2&value=on');
    });
    $('#lampacieplyoff').click(function() {
        $('#lampacieplystatus').load('include/handlers.php?id=2&name=lamp2&value=off');
    });

    //lampalekka
    $('#lampalekkachange').click(function() {
        $('#lampalekkastatus').load('include/handlers.php?id=2&name=lamp3&value=change');
    });
    $('#lampalekkaoff').click(function() {
        $('#lampalekkastatus').load('include/handlers.php?id=2&name=lamp3&value=on');
    });
    $('#lampalekkaoff').click(function() {
        $('#lampalekkastatus').load('include/handlers.php?id=2&name=lamp3&value=off');
    });

    //laser disco
    //$('#laserdiscochange').click(function() {
    //    $('#laserdiscostatus').load('include/handlers.php?id=3&name=discot&value=2');
    //});
    //$('#laserdiscooff').click(function() {
    //    $('#laserdiscostatus').load('include/handlers.php?id=3&name=discot&value=0');
    //});
    //$('#laserdiscooff').click(function() {
    //    $('#laserdiscostatus').load('include/handlers.php?id=3&name=discot&value=1');
    //});

});
