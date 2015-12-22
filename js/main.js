$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

var baseUrl = "https://api.twitch.tv/kraken/";
var cb = "?client_id=566e055ff2217f3607bea86b&callback=?";
var currentSelection = "all";
var searchTerm = ""

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
			
				$("#channels").prepend(
					'<div id="' + username + '" class="user-block offline in">' +
					  '<a href="http://www.twitch.tv/' + username +'">' + 
					    '<span class="user">' + 
					      '<span class="picture"><img class="logo" src="' + usernames[username].photo + '">' + '</span>' +
								'<span class="username-stream">' +
									'<div class="username">' + usernames[username].display + '</div>' +
									'<div class="current-stream">' + '</div>' +
								'</span>' +
								'<span class="icon icon-off">!</span>' +
				 '</span></a></div>'
				);
			});
			
			tinysort($(".user-block"));
		})
	}
	
	function checkStatus() {
		Object.keys(usernames).forEach(function(username) {
			$.getJSON(baseUrl + "streams/" + username + cb, function(data) {
				return data;
			}).done(function(data) { 
				if (data.status && data.status >= 400) {
					// user no longer exists
					usernames[username].status = false;
					noUser(username, data);
					updateListDisplay();
				} else if (data.stream && !usernames[username].status) {
					// user has signed on
					usernames[username].status = true;
					userOn(username, data);
					updateListDisplay();
				} else if (!data.stream && usernames[username].status) {
					// user has signed off
					usernames[username].status = false;
					userOff(username, data);
					updateListDisplay();
				}
			});
		})
	}
	
	function userOn(username, data) {
		usernames[username].summary = data.stream.channel.status;
		var $userEl = $("#" + username);
		var summary = usernames[username].summary;
		$userEl.removeClass("offline");
		$userEl.addClass("online");
		$userEl.find(".icon").html("&#10003");
		$userEl.find(".icon").addClass("icon-on");
		$userEl.find(".icon").removeClass("icon-off");
		$userEl.find(".current-stream").html(summary);
	}
	
	function userOff(username, data) {
		usernames[username].summary = null;
		var $userEl = $("#" + username);
		$userEl.removeClass("online");
		$userEl.addClass("offline");
		$userEl.find(".icon").html("!");
		$userEl.find(".icon").addClass("icon-off");
		$userEl.find(".icon").removeClass("icon-on");
		$userEl.find(".current-stream").html("");
	}
	
	function noUser(username, data) {
		usernames[username].summary = null;
		var $userEl = $("#" + username);
		$userEl.removeClass("online");
		$userEl.addClass("offline");
		$userEl.find(".icon").html("x");
		$userEl.find(".icon").addClass("no-icon");
		$userEl.find(".icon").removeClass("icon-on");
		$userEl.find(".current-stream").html("this user no longer exists");
	}
	
	function updateListDisplay(navItem) {
		if (navItem) {
			$(".nav-item").removeClass("nav-active");
			$(navItem).addClass("nav-active");
		}
		
		if (currentSelection === "online") {
			$(".user-block").css("display", "none");
			$(".online.in").css("display", "block");
		} else if (currentSelection === "offline") {
			$(".user-block").css("display", "none");
			$(".offline.in").css("display", "block");
		} else {
			$(".user-block").css("display", "none");
			$(".online.in").css("display", "block");
			$(".offline.in").css("display", "block");
		}
		
		tinysort($(".user-block"));
	}
	
	function filter() {
		var searchString = ".username:contains('" + searchTerm + "')"
		var n = $('.username')[0];
		$(".username").parent().parent().parent().parent().removeClass("in");
		$(".username").parent().parent().parent().parent().addClass("out");
		$(searchString).parent().parent().parent().parent().removeClass("out");
		$(searchString).parent().parent().parent().parent().addClass("in");
	}
	
	setup();
	setInterval(checkStatus, 2000);
	
	$("#all").click(function(){
		currentSelection = "all";
		updateListDisplay(this);
	});
	
	$("#online").click(function(){
		currentSelection = "online";
		updateListDisplay(this);
	});
	
	$("#offline").click(function(){
		currentSelection = "offline";
		updateListDisplay(this);
	});
	
	if ($("#search-box").length > 0 ) {
	  $('#search-box').keyup(function() {
	      searchTerm = $(this).val();
				filter();
				updateListDisplay();
	  });
	}
})
