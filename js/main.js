var usernames = ["brunofin", "medrybw", "freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];
var baseUrl = "https://api.twitch.tv/kraken/";
var cb = "?client_id=566e055ff2217f3607bea86b&callback=?"

$(document).ready(function(){
	usernames.forEach(function(username) {
		userObj = {};
		userObj.status = "offline";
		$.getJSON(baseUrl + "streams/" + username + cb, function(data) {
			if (data.stream) {
				userObj.status = "online";
			}
		});
		
		$.getJSON(baseUrl + 'users/' + username + cb, function(data) {
			console.log(data);
			userObj.photo = data.logo;
		}).done(function(){
			$("#channels").prepend('<div class="user ' + userObj.status + '">' + 
				'<div class="picture"><img class="logo" src="' + userObj.photo + '"' + '</div>' +
				'<div class="username">' + 
				'<a href="http://www.twitch.tv/' + username +'">' + username + '</a></div>' +
				'<div class="current-stream">' + '</div>' +
			'</div>'
			);
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
