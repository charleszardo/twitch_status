var usernames = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];
var baseUrl = "https://api.twitch.tv/kraken/streams/";
var cb = "?callback=?";

usernames.forEach(function(name) {
	$.getJSON(baseUrl + name + cb, function(data) {
	  console.log(data);
	});
})