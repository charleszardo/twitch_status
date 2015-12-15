var usernames = {
	"brunofin": { prev: null, current: false},
	"medrybw": { prev: null, current: false},
	"freecodecamp": { prev: null, current: false},
	"storbeck": { prev: null, current: false},
	"terakilobyte": { prev: null, current: false},
	"habathcx": { prev: null, current: false},
	"RobotCaleb": { prev: null, current: false},
	"thomasballinger": { prev: null, current: false},
	"noobs2ninjas": { prev: null, current: false},
	"beohoff": { prev: null, current: false}
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
	
	function updateStatus() {
		Object.keys(usernames).forEach(function(username) {
			if (usernames[username]) {
				usernames[username] = true;
				
			} else {
				
			}
		});
	}
	
	Object.keys(usernames).forEach(function(username) {
		var userObj = usernames[username];
		usernames[username].status = "offline";
		usernames[username].summary = null;
		usernames[username].icon = '<div class="icon-off">!</div>';
		$.getJSON(baseUrl + "streams/" + username + cb, function(data) {
			return data;
		}).done(function(data){
			if (data.stream) {
				usernames[username].current = true;
				usernames[username].status = "online";
				usernames[username].summary = data.stream.channel.status;
				usernames[username].icon = '<div class="icon-on">&#10003</div>';
			}
			
			$.getJSON(baseUrl + 'users/' + username + cb, function(data) {
				return data;
			}).done(function(data){
				if (!data.logo) {
					data.logo = "http://placehold.it/50x50";
				}
				usernames[username].photo = data.logo;
				usernames[username].display = data.display_name;
			
				$("#channels").prepend('<div id="' + username + '" class="user ' + usernames[username].status + '">' + 
				'<a href="http://www.twitch.tv/' + username +'">' + 
					'<div class="picture"><img class="logo" src="' + usernames[username].photo + '"' + '</div>' +
					'<div class="username">' + usernames[username].display + '</div>' +
					'<div class="current-stream">' + '</div>' +
					usernames[username].icon +
				'</a></div>'
				);
			});
		});
		
		setInterval(checkStatus, 2000);
		//setInterval(updateStatus, 1000);
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
