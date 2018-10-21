function statusall(){
	$.get('data', function(result) {
		var dataout_nyn = "<table class='table table-striped'><tr><th>Włączniki</th><th></th><th></th></tr>";
		var dataout_cz = "<table class='table table-striped'><tr><th>Czujniki</th><th> </th><th> </th></tr>";
		var dataout_set = "<table class='table table-striped'><tr><th>Ustawienia sensora</th><th></th><th></th></tr>";
		var data = new Array;
		//console.log("status1: "+result);
		var resspl = result.split("<br>");
		//console.log(resspl);
		var count = resspl.length;
		for(i=1;i<count-1;i++){
			var resus = resspl[i].split(":");
			//data[i] = new Array(resus[0], resus[1], resus[2]);
			console.log(parseInt(resus[3]));
			var wynval = parseInt(resus[2]);
			switch(parseInt(resus[3])){
				case 1:
					if(wynval==1){
						wynval=="ON";
					}else if(wynval==0){
						wynval="OFF";	
					}
					dataout_nyn += "<tr id='"+resus[0]+"-out"+resus[1]+"-stat'><td>"+resus[0]+"</td><td>"+resus[4]+"</td><td><span>"+wynval+"</span></td></tr>";
					break;
				case 2:
				case 3:
					dataout_cz += "<tr id='"+resus[0]+"-out"+resus[1]+"-stat'><td>"+resus[0]+"</td><td>"+resus[4]+"</td><td><span>"+resus[2]+"</span>*C</td></tr>";
					break;
				case 4:
					dataout_set +="<tr id='"+resus[0]+"-out"+resus[1]+"-stat'><td>"+resus[0]+"</td><td>"+resus[4]+"</td><td><span>"+resus[2]+"</span></td></tr>";
					break;
				case 5:
					break;
				default:
					dataout_nyn += "<tr id='"+resus[0]+"-out"+resus[1]+"-stat'><td>"+resus[0]+"</td><td>"+resus[4]+"</td><td><span>"+resus[2]+"</span></td></tr>";
					break;
			}
			
		}
		dataout_nyn += "</table>";
		dataout_cz += "</table>";
		dataout_set += "</table>";
		//console.log(data);
		$('#statusall').html(dataout_nyn);
		$('#czuj').html(dataout_cz);
		$('#sett').html(dataout_set);
	});
}

statusall();
//setTimeout(function(){ statusall(); }, 100);
setInterval(function(){ statusall(); }, 3000);

