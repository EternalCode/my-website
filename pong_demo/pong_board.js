var player_paddle;
var opponent_paddle;
var pong_ball;
var PADDLE_DIM = new Vector(20, 50);
var PADDLE_SPEED = 2;
var height, width;
var keys = [];
var OPPONENT_SCORE = 0;
var PLAYER_SCORE = 0;
var PTS_TO_WIN_PONG = 10;
var X_SPEED_PONGBALL = 8;
var pong_quit = true;


function pong_board_kill() {
	var canvas = document.getElementById("Pong"),
		context = canvas.getContext("2d");

	canvas.style.display = "none";
	document.body.removeEventListener("keydown", pong_input_logger_kdn);
	document.body.removeEventListener("keyup", pong_input_logger_kup);
	pong_quit = false;
	OPPONENT_SCORE = 0;
	PLAYER_SCORE = 0;
}

function pong_board_init() {
	var canvas = document.getElementById("Pong"),
		context = canvas.getContext("2d");

	canvas.style.display = "block";
	pong_quit = true;
	height = canvas.height = 400;
	width = canvas.width = 800;
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fill();

	player_paddle = new Paddle(2, canvas.height / 2);
	opponent_paddle = new Paddle(canvas.width - PADDLE_DIM.x - 2, canvas.height/2);
	pong_ball = new Ball(width / 2, height / 2);

	document.body.addEventListener("keydown", pong_input_logger_kdn);
	document.body.addEventListener("keyup", pong_input_logger_kup);
	pong_game_loop();

}


function pong_game_loop() {
	// game draw
	var canvas = document.getElementById("Pong"),
		context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);

	// game update
	player_paddle.update(canvas);
	opponent_paddle.update_opponent(canvas);
	pong_ball.update();

	// game draw
	pong_game_draw(canvas, context);
	
	// if the game is not over, we can write the next frame
	if (pong_game_status_update(context, canvas) && pong_quit) {
		requestAnimationFrame(pong_game_loop);
	} else {
		document.body.addEventListener("keydown", pong_newgame_listener);
	}
}


function pong_game_draw(canvas, context) {
	// background
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fill();

	// dashed field line
	context.setLineDash([5, 5]);
	context.strokeStyle = "white";
	context.beginPath();
	context.moveTo(canvas.width/2, 0);
	context.lineTo(canvas.width/2, canvas.height);
	context.stroke();
	context.setLineDash([]);

	// score draw
	context.fillStyle = "white";
	context.font =  20 + "px Roboto Mono";
	context.fillText(PLAYER_SCORE, (width / 4) - 20, 40);
	context.fillText(OPPONENT_SCORE, ((3 * width) / 4) - 20, 40);
	context.fill();

	// draw players and ball
	player_paddle.draw(context);
	opponent_paddle.draw(context);
	pong_ball.draw(context);
}

function pong_game_status_update(context, canvas) {	
	// check game is over
	var game_status = pong_ball.ring_out();
	if (game_status == 1) {
		// player's victory
		pong_ball.x = width / 2;
		pong_ball.y = height / 2;
		pong_ball.direction = new Vector(-(X_SPEED_PONGBALL), 0);
	} else if (game_status == 2) {
		// opponent's victory
		pong_ball.x = width / 2;
		pong_ball.y = height / 2;
		pong_ball.direction = new Vector(X_SPEED_PONGBALL, 0);
	}

	if (OPPONENT_SCORE == PTS_TO_WIN_PONG) {
		// game over text with retry options
		context.fillStyle = "white";
		context.font =  60 + "px Roboto Mono";
		context.fillText("YOU LOSE!", ((width / 2) - 130), ((height/2) - 100));
		context.font = 30 + "px Roboto Mono";
		context.fillText("Press N for a New Game!", (width/2) - 200, height - 80);
	} else if (PLAYER_SCORE == PTS_TO_WIN_PONG) {
		context.fillStyle = "white";
		context.font =  60 + "px Roboto Mono";
		context.fillText("YOU WIN!", (width / 2) - 125, (height/2) - 100);
		context.font = 30 + "px Roboto Mono";
		context.fillText("Press N for a New Game!", (width/2) - 200, height - 80);
	} else {
		return 1;
	}
	document.body.removeEventListener("keydown", pong_input_logger_kdn);
	document.body.removeEventListener("keyup", pong_input_logger_kup);
	return 0;
}
