var ress=2;
console.log("siema");
function changeactive(who, forwhat, revers=0){
    if(forwhat==revers){
        $('#'+who+'off').removeClass('active');
        $('#'+who+'on').addClass('active');
    }else{
        $('#'+who+'on').removeClass('active');
        $('#'+who+'off').addClass('active');
    }
}


$.get('include/handlers.php?id=1&name=all&value=status&onlycheck=1', function(result) {
    //changeactive("biurkoled", result);
    console.log(result);
    ress = result;
});
