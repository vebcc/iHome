$.getJSON("https://api.sunrise-sunset.org/json?lat=49.985448&lng=18.559273&date=today", function(result){
    $.each(result, function(i, field){
        if(field.sunrise){
            //console.log("fieldsunrise: " + field.sunrise);
            var sunrise = field.sunrise;
            var sunrisew = sunrise.split(":");
            var sunrisep = sunrisew[2].split(" ");
            var sunrisetime = [parseInt(sunrisew[0])+2, parseInt(sunrisew[1]), parseInt(sunrisep[0])];
            if(sunrisep[1]=="PM"){
                sunrisetime[0]+=12;
            }
            //console.log("sunrise: " +sunrisetime);
            var sunriseout = sunrisetime[0]+ ":" + sunrisetime[1];
            $('#sunrise').html(sunriseout);

			var sunrisemilis = ((sunrisetime[0] * 60 ) + sunrisetime[1]) * 60 * 1000;

			$.get('include/dbhandler.php?settings=sunrise&value='+sunrisemilis, function(result) {
				var awyn = result;
				console.log("sunrisemilis: "+sunrisemilis);
			});
        }
        if(field.sunset){
            //console.log("fieldsunset: " + field.sunset);
            var sunset = field.sunset;
            var sunsetw = sunset.split(":");
            var sunsetp = sunsetw[2].split(" ");
            var sunsettime = [parseInt(sunsetw[0])+2, parseInt(sunsetw[1]), parseInt(sunsetp[0])];
            if(sunsetp[1]=="PM"){
                sunsettime[0]+=12;
            }
            //console.log("sunset: " +sunsettime);
            var sunsetout = sunsettime[0]+ ":" + sunsettime[1];

            $('#sunset').html(sunsetout);

			var sunsetmilis = ((sunsettime[0] * 60) + sunsettime[1]) * 60 * 1000;

			$.get('include/dbhandler.php?settings=sunset&value='+sunsetmilis, function(result) {
				var awyn = result;
				console.log("sunsetmilis: "+sunsetmilis);
			});
        }
    });
});




//3:42:12 AM
