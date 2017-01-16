function pong_input_logger_kdn(event) {
	keys[event.keyCode] = true;
	switch (event.keyCode) {
			case 38:
			case 40:
			case 37:
			case 39:
				event.preventDefault();
				break;
	};
}

function pong_input_logger_kup(event) {
	delete keys[event.keyCode];
}

function pong_newgame_listener(event) {
	if (event.keyCode == 78) {
		document.body.removeEventListener("keydown", pong_newgame_listener);
		PLAYER_SCORE = 0;
		OPPONENT_SCORE = 0;
		pong_board_init();
	}
}
