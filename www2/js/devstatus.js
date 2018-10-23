function statusall(info){
	//console.log("yoyo");
	$.get('data', function(result) {
		//console.log("yoyo2");
		var dataout_nyn = "<table class='table table-striped'><tr><th></th><th>Włączniki</th><th></th><th></th></tr>";
		var dataout_cz = "<table class='table table-striped'><tr><th></th><th>Czujniki</th><th> </th><th> </th></tr>";
		var dataout_set = "<table class='table table-striped'><tr><th></th><th>Ustawienia sensora</th><th></th><th></th></tr>";
		var data = new Array;
		//console.log("status1: "+result);
		var resspl = result.split("<br>");
		//console.log(resspl);
		var count = resspl.length;
		for(i=1;i<count-1;i++){
			//console.log("tt: " + i);
			var resus = resspl[i].split(":");
			//data[i] = new Array(resus[0], resus[1], resus[2]);
			//console.log(parseInt(resus[3]));
			var wynval = parseInt(resus[2]);
			
			if(parseInt(resus[4])==1){
				//console.log(wynval)
				if(wynval==1){
					wynval=0;
				}else if(wynval==0){
					wynval=1;
				}else{
					//console.log("other: " + wynval);
				}
				//console.log("rev");
				//console.log(wynval);
			}
			
			switch(parseInt(resus[3])){
				case 1:
					if(wynval==1){
						wynval="ON";
					}else if(wynval==0){
						wynval="OFF";	
					}else{
						console.log("other: "+ wynval);
					}
					dataout_nyn += "<tr id='"+resus[0]+"-out"+resus[1]+"-stat'><td>"+resus[0]+"</td><td>"+resus[6]+"</td><td>"+resus[5]+"</td><td><span>"+wynval+"</span></td></tr>";
					break;
				case 2:
					dataout_cz += "<tr id='"+resus[0]+"-out"+resus[1]+"-stat'><td>"+resus[0]+"</td><td>"+resus[6]+"</td><td>"+resus[5]+"</td><td><span>"+resus[2]+"</span></td></tr>";
					break;
				case 3:
					if(wynval==1){
						wynval="Ruch";
					}else if(wynval==0){
						wynval="Brak ruchu";	
					}else{
						console.log("other: "+ wynval);
					}
					dataout_cz += "<tr id='"+resus[0]+"-out"+resus[1]+"-stat'><td>"+resus[0]+"</td><td>"+resus[6]+"</td><td>"+resus[5]+"</td><td><span>"+wynval+"</span></td></tr>";
					break;
				case 4:
					if(wynval==1){
						wynval="ON";
					}else if(wynval==0){
						wynval="OFF";	
					}else{
						console.log("other: "+ wynval);
					}
					//console.log("wynik: "+ wynval);
					dataout_set +="<tr id='"+resus[0]+"-out"+resus[1]+"-stat'><td>"+resus[0]+"</td><td>"+resus[6]+"</td><td>"+resus[5]+"</td><td><span>"+wynval+"</span></td></tr>";
					break;
				case 5:
				dataout_set +="<tr id='"+resus[0]+"-out"+resus[1]+"-stat'><td>"+resus[0]+"</td><td>"+resus[6]+"</td><td>"+resus[5]+"</td><td><span>"+resus[2]+"</span></td></tr>";
					break;
				case 6:
					dataout_cz += "<tr id='"+resus[0]+"-out"+resus[1]+"-stat'><td>"+resus[0]+"</td><td>"+resus[6]+"</td><td>"+resus[5]+"</td><td><span>"+resus[2]+"</span>*C</td></tr>";
					break;
				case 7:
					dataout_cz += "<tr id='"+resus[0]+"-out"+resus[1]+"-stat'><td>"+resus[0]+"</td><td>"+resus[6]+"</td><td>"+resus[5]+"</td><td><span>"+resus[2]+"</span>%</td></tr>";
					break;
				default:
					dataout_nyn += "<tr id='"+resus[0]+"-out"+resus[1]+"-stat'><td>"+resus[0]+"</td><td>"+resus[6]+"</td><td>"+resus[5]+"</td><td><span>"+resus[2]+"</span></td></tr>";
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
		console.log(info);
	});
}

//console.log("problemikff");
statusall("Loader - devstatus");
//setTimeout(function(){ statusall(); }, 100);
setInterval(function(){ statusall("Reloader - devstatus"); }, 5000);

