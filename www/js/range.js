function range(newVal){
    window.location.replace("index.php?name=glosnikiled&value="+newVal);
}


var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
}
