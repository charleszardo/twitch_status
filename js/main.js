var usernames = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];
var baseUrl = "https://api.twitch.tv/kraken/streams/";
var cb = "?callback=?";

$(document).ready(function(){
	usernames.forEach(function(name) {
		$.getJSON(baseUrl + name + cb, function(data) {
			var status = "offline";
			if (data.stream) {
				status = "online";
			}
		  $("#channels").prepend('<div class="user ' + status + '">' + name + '</div>');
		});
	});
	
	$("#all").click(function(){
		$(".user").show();
	});
	
	$("#online").click(function(){
		$(".online").show();
		$(".offline").hide();
	});
	
	$("#offline").click(function(){
		$(".offline").show();
		$(".online").hide();
	});
})
