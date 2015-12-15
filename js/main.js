var usernames = {
	"brunofin": false,
	"medrybw": false,
	"freecodecamp": false,
	"storbeck": false,
	"terakilobyte": false,
	"habathcx": false,
	"RobotCaleb": false,
	"thomasballinger": false,
	"noobs2ninjas": false,
	"beohoff": false
};

var baseUrl = "https://api.twitch.tv/kraken/";
var cb = "?client_id=566e055ff2217f3607bea86b&callback=?"

$(document).ready(function(){
	function checkStatus() {
		Object.keys(usernames).forEach(function(username) {
			$.getJSON(baseUrl + "streams/" + username + cb, function(data) {
				return data;
			}).done(function(data){
				if (data.stream && !usernames[username]) {
					// user has signed on
					toggleStatus(username, true);
				} else if (!data.stream && usernames[username]) {
					// user has signed off
					toggleStatus(username, false);
				}
			});
		})
	}
	
	function toggleStatus(username, on){
		usernames[username] = on;
	}
	
	Object.keys(usernames).forEach(function(username) {
		var userObj = {};
		userObj.status = "offline";
		userObj.summary = null;
		userObj.icon = '<div class="icon-off">!</div>';
		$.getJSON(baseUrl + "streams/" + username + cb, function(data) {
			return data;
		}).done(function(data){
			if (data.stream) {
				usernames[username] = true;
				userObj.status = "online";
				userObj.summary = data.stream.channel.status;
				userObj.icon = '<div class="icon-on">&#10003</div>';
			}
			
			$.getJSON(baseUrl + 'users/' + username + cb, function(data) {
				return data;
			}).done(function(data){
				if (!data.logo) {
					data.logo = "http://placehold.it/50x50";
				}
				userObj.photo = data.logo;
				userObj.display = data.display_name;
			
				$("#channels").prepend('<div id="' + username + '" class="user ' + userObj.status + '">' + 
				'<a href="http://www.twitch.tv/' + username +'">' + 
					'<div class="picture"><img class="logo" src="' + userObj.photo + '"' + '</div>' +
					'<div class="username">' + userObj.display + '</div>' +
					'<div class="current-stream">' + '</div>' +
					userObj.icon +
				'</a></div>'
				);
			});
		});
		
		setInterval(checkStatus, 1000);
		setInterval(updateStatus, 1000);
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
