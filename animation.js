$(document).ready( function() {
	var current_frame = 0;
	var current_index = 0;
	var display;
	setTimeout(function() {
		if (current_frame % 2) {
			display = (current_index % 2) + 2
			current_index++;
		} else {
			display = 1;
		}
		
		current_frame++;
		$("#walking-frame").html("<img src='icons/frame" + display + ".PNG' style='padding-top: " + 17 + "px'></img>");
		console.log((($("#bs-example-navbar-collapse-1").innerHeight() / 2) - 8));
	}, 200);
});