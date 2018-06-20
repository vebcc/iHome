$(document).ready(function(){
    $('div.light').html('<img src="images/off.png" width="50" height="50">')

    setInterval(function() {
        $('#timeval').load('includes/time.php');
    }, 1000);

    $('#biurkoledchange').click(function() {
        $('#biurkoledstatus').load('include/handlers/biurkoled.php?id=1&name=biurkoled&value=change');
    });
    $('#biurkoledoff').click(function() {
        $('#biurkoledstatus').load('include/handlers/biurkoled.php?id=1&name=biurkoled&value=on');
    });
    $('#biurkoledoff').click(function() {
        $('#biurkoledstatus').load('include/handlers/biurkoled.php?id=1&name=biurkoled&value=off');
    });



});
