console.log("value: " + value);
if(value=="offall"){
    $.get('handlers.php?id=1&name=off&value=all', function(result) {
        document.write(result);
    });
    $.get('include/handlers.php?id=2&name=off&value=all', function(result) {
        document.write(result);
    });
}else if(value=="onall"){
    $.get('handlers.php?id=1&name=on&value=all', function(result) {
        document.write(result);
    });
    $.get('include/handlers.php?id=2&name=off&value=all', function(result) {
        document.write(result);
    });
}

