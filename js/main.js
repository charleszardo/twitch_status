var usernames = ["brunofin", "medrybw", "freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];
var baseUrl = "https://api.twitch.tv/kraken/";
var cb = "?client_id=566e055ff2217f3607bea86b&callback=?"

$(document).ready(function(){
	usernames.forEach(function(username) {
		var userObj = {};
		userObj.status = "offline";
		userObj.summary = null;
		$.getJSON(baseUrl + "streams/" + username + cb, function(data) {
			return data;
		}).done(function(data){
			if (data.stream) {
				userObj.status = "online";
				userObj.summary = data.stream.channel.status;
			}
			
			$.getJSON(baseUrl + 'users/' + username + cb, function(data) {
				return data;
			}).done(function(data){
				if (!data.logo) {
					data.logo = "http://placehold.it/50x50";
				}
				userObj.photo = data.logo;
				userObj.display = data.display_name;
			
				$("#channels").prepend('<div class="user ' + userObj.status + '">' + 
				'<a href="http://www.twitch.tv/' + username +'">' + 
					'<div class="picture"><img class="logo" src="' + userObj.photo + '"' + '</div>' +
					'<div class="username">' + userObj.display + '</div>' +
					'<div class="current-stream">' + '</div>' +
				'</a></div>'
				);
			});
		});
		

		

	});
	
	$("#all").click(function(){
		$(".user").show();
	});
	
	$("#online").click(function(){
		$(".online").children().show();
		$(".offline").children().hide();
	});
	
	$("#offline").click(function(){
		$(".offline").children().show();
		$(".online").children().hide();
	});
})
