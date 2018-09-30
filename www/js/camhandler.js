//$.get('include/camhandler.php?id=1&getcam=1&camtest=1', function(result) {
//	if(result==1){
//		$('#cam_1_mini').html("<img class='cam_mini_img' src='include/camhandler.php?id=1&getcam=1'>");
//		$('#cam_1').html("<img class='cam_img' src='include/camhandler.php?id=1&getcam=1'>");
//	}else{
//		$('#cam_1_mini').html("<img class='cam_mini_img' src='images/offline.jpg'>");
//		$('#cam_1').html("<img class='cam_img' src='images/offline.jpg'>");
//	}
//});
$.get('include/camhandler.php?id=2&getcam=1&camtest=1', function(result) {
	if(result==1){
		$('#cam_2_mini').html("<img class='cam_mini_img' src='include/camhandler.php?id=2&getcam=1'>");
		$('#cam_2').html("<img class='cam_img' src='include/camhandler.php?id=2&getcam=1'>");
	}else{
		$('#cam_2_mini').html("<img class='cam_mini_img' src='images/offline.jpg'>");
		$('#cam_2').html("<img class='cam_img' src='images/offline.jpg'>");
	}
});
$.get('include/camhandler.php?id=3&getcam=1&camtest=1', function(result) {
	if(result==1){
		console.log("nie kupa");
		$('#cam_3_mini').html("<img class='cam_mini_img' src='include/camhandler.php?id=3&getcam=1'>");
		$('#cam_3').html("<img class='cam_img' src='include/camhandler.php?id=3&getcam=1'>");
	}else{
		$('#cam_3_mini').html("<img class='cam_mini_img' src='images/offline.jpg'>");
		$('#cam_3').html("<img class='cam_img' src='images/offline.jpg'>");
	}
});
