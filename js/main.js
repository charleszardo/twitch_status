var baseUrl = "https://api.twitch.tv/kraken/";
var cb = "?client_id=566e055ff2217f3607bea86b&callback=?"

var usernames = {
	"brunofin": {status: false, summary: null},
	"medrybw": {status: false, summary: null},
	"freecodecamp": {status: false, summary: null},
	"storbeck": {status: false, summary: null},
	"terakilobyte": {status: false, summary: null},
	"habathcx": {status: false, summary: null},
	"RobotCaleb": {status: false, summary: null},
	"thomasballinger": {status: false, summary: null},
	"noobs2ninjas": {status: false, summary: null},
	"beohoff": {status: false, summary: null}
};

$(document).ready(function(){
	function setup(){
		Object.keys(usernames).forEach(function(username) {
			$.getJSON(baseUrl + 'users/' + username + cb, function(data) {
				return data;
			}).done(function(data){
				if (!data.logo) {
					data.logo = "http://placehold.it/50x50";
				}
				usernames[username].photo = data.logo;
				usernames[username].display = data.display_name;
			
				$("#channels").prepend('<div id="' + username + '" class="user offline">' + 
				'<a href="http://www.twitch.tv/' + username +'">' + 
					'<div class="picture"><img class="logo" src="' + usernames[username].photo + '"' + '</div>' +
					'<div class="username">' + usernames[username].display + '</div>' +
					'<div class="current-stream">' + '</div>' +
					'<div class="icon icon-off">!</div>' +
				'</a></div>'
				);
			});
			
		});
	}
	
	function checkStatus() {
		Object.keys(usernames).forEach(function(username) {
			$.getJSON(baseUrl + "streams/" + username + cb, function(data) {
				return data;
			}).done(function(data){
				if (data.stream && !usernames[username].status) {
					console.log(username);
					// user has signed on
					usernames[username].status = true;
					userOn(username, data);
				} else if (!data.stream && usernames[username].status) {
					// user has signed off
					usernames[username].status = false;
					userOff(username, data);
				}
			});
		})
	}
	
	function userOn(username, data) {
		usernames[username].summary = data.stream.channel.status;
		var $userEl = $("#" + username);
		$userEl.removeClass("offline");
		$userEl.addClass("online");
	}
	
	function userOff(username) {
		usernames[username].summary = null;
		var $userEl = $("#" + username);
		$userEl.removeClass("online");
		$userEl.addClass("offline");
	}
	
	function updateUserEl(username) {
		
	}
	
	function updateStatus(username) {
		Object.keys(usernames).forEach(function(username) {
			if (usernames[username]) {
				usernames[username] = true;
				
			} else {
				
			}
		});
	}
	
	// Object.keys(usernames).forEach(function(username) {
	//
	// 	$.getJSON(baseUrl + "streams/" + username + cb, function(data) {
	// 		return data;
	// 	}).done(function(data){
	// 		if (data.stream) {
	// 			usernames[username].icon = '<div class="icon-on">&#10003</div>';
	// 		}
	// 	});
	//
	//
	// });
	
	setup();
	setInterval(checkStatus, 2000);
	//setInterval(updateStatus, 1000);
	
	$("#all").click(function(){
		$(".online").children().show();
		$(".offline").children().show();
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
