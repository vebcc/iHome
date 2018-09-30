function camload(){
	//var offlinelink = "images/offline.jpg";
	//var actuallink = $("#cam_1_mini > img").attr('src');
	console.log("offline: " + offlinelink);
	console.log("actual: " + actuallink);
	if(offlinelink==actuallink){
		$.get('include/camhandler.php?id=1&getcam=1&camtest=1', function(result) {
			if(result==1){
				$('#cam_1_mini').html("<img class='cam_mini_img' src='include/camhandler.php?id=1&getcam=1'>");
				$('#cam_1').html("<img class='cam_img' src='include/camhandler.php?id=1&getcam=1'>");
			}else{
				$('#cam_1_mini').html("<img class='cam_mini_img' src='images/offline.jpg'>");
				$('#cam_1').html("<img class='cam_img' src='images/offline.jpg'>");
			}
		});
	}

	//var offlinelink = "images/offline.jpg";
	//var actuallink = $("#cam_2_mini > img").attr('src');
	console.log("offline: " + offlinelink);
	console.log("actual: " + actuallink);
	if(offlinelink==actuallink){
		$.get('include/camhandler.php?id=2&getcam=1&camtest=1', function(result) {
			if(result==1){
				$('#cam_2_mini').html("<img class='cam_mini_img' src='include/camhandler.php?id=2&getcam=1'>");
				$('#cam_2').html("<img class='cam_img' src='include/camhandler.php?id=2&getcam=1'>");
			}else{
				$('#cam_2_mini').html("<img class='cam_mini_img' src='images/offline.jpg'>");
				$('#cam_2').html("<img class='cam_img' src='images/offline.jpg'>");
			}
		});
	}

	//var offlinelink = "images/offline.jpg";
	//var actuallink = $("#cam_3_mini > img").attr('src');
	console.log("offline: " + offlinelink);
	console.log("actual: " + actuallink);
	if(offlinelink==actuallink){
		$.get('include/camhandler.php?id=3&getcam=1&camtest=1', function(result) {
			if(result==1){
				$('#cam_3_mini').html("<img class='cam_mini_img' src='include/camhandler.php?id=3&getcam=1'>");
				$('#cam_3').html("<img class='cam_img' src='include/camhandler.php?id=3&getcam=1'>");
			}else{
				$('#cam_3_mini').html("<img class='cam_mini_img' src='images/offline.jpg'>");
				$('#cam_3').html("<img class='cam_img' src='images/offline.jpg'>");
			}
		});
	}
}

//TODO: refresh kiedy kamera przestaje przesylac obraz poprawnie

//setTimeout(function(){ zmload("cam"); }, 100);
setTimeout(function(){ camload(); }, 100);
//setInterval(function(){ zmload("cam"); }, 60000);
setInterval(function(){ camload(); }, 10000);
