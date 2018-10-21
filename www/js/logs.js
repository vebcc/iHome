$.get('include/dbhandler.php?from=*&error=*&geterrorlog=1', function(result) {
    var awyn = result;
    //console.log("Errorlog - all - result: "+result);
    $('#errorlog').html(awyn);
});