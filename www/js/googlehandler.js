console.log("value: " + value);
if(value=="offall"){
    $.get('handlers.php?id=1&name=off&value=all', function(result) {
        console.log(result);
    });
    $.get('handlers.php?id=2&name=off&value=all', function(result) {
        console.log(result);
    });
}else if(value=="onall"){
    $.get('handlers.php?id=1&name=on&value=all', function(result) {
        console.log(result);
    });
    $.get('handlers.php?id=2&name=on&value=all', function(result) {
        console.log(result);
    });
}

