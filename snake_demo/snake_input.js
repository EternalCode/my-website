
// movement parser
function movement_parser(event) {
	document.body.removeEventListener("keydown", movement_parser);
	event = event || window.event;
	switch (event.keyCode) {
		case 38:
		case 87:
			//up
			player_snake.direction_set(0, -1);
			break;
		case 40:
		case 83:
			//down
			player_snake.direction_set(0, 1);
			break;
		case 37:
		case 65:
			//left
			player_snake.direction_set(-1, 0);
			break;
		case 39:
		case 68:
			//right
			player_snake.direction_set(1, 0);
			break;
		case 27:
			// quit & pause
			document.getElementById("Snake").tabIndex = 0;
			player_snake.direction_set(0, 0);
			QUIT = true;
			break;
		case 82:
			// Restart or retry
			/* Restarting is tricky. There is am animation request being processed in the background
			 * which handles the gameloop. Simple reinitializing everything while that is running would
			 * create a clone of the gameloop. We must simply use the game over flag to end the loop and
			 * wait a duration equal to one iteration of the loop before reinitializing the game */
			if (RESET_FLAG) { 
				return
			};
			RESET_FLAG = true;
	 		GAME_OVER = true;
			setTimeout(function () {
				RESET_FLAG = false;
				QUIT = false;
		 		GAME_OVER = false;
		 		snake_board_init();
		 		player_snake.direction_set(0, 0);
	 		}, (1000/FPS) + 1);
			break;
		default:
			document.body.addEventListener("keydown", movement_parser);
	}
}

// this is to prevent the arrow keys from scrolling the game as you play snake
function default_cancel(event) {
	if (document.getElementById("Snake").tabIndex) {
		switch (event.keyCode) {
			case 38:
			case 40:
			case 37:
			case 39:
				event.preventDefault();
				break;
		};
		
	}
}

function wait_activity_wrapper() {
	if (event.keyCode == 82) {
		document.body.removeEventListener("keydown", wait_activity_wrapper);
		RESET_FLAG = false;
		QUIT = false;
		GAME_OVER = false;
		snake_board_init();
		player_snake.direction_set(0, 0);
	}
}
