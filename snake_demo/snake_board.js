var FPS = 15;
var player_snake;
var food_snake;

var SNAKE_SIZE = 20;
var FOOD_SIZE = 20;

var SCORE = 0;
var QUIT = false;
var GAME_OVER = false;
var RESET_FLAG = false;


/* Game loop functions */

// difficulty/fps toggle
function sub_fps() {
	FPS = constrain(FPS - 5, 5, FPS);
}

function add_fps() {
	FPS = constrain(FPS + 5, FPS, 60)
}

function set_fps() {
	FPS = 15;
}

function snake_kill_game() {
	document.body.removeEventListener("keydown", movement_parser);
	document.body.removeEventListener("keydown", wait_activity_wrapper);
	var canvas = document.getElementById("Snake"),
		canvas_s = document.getElementById("score");
	canvas.style.display = "none";
	canvas_s.style.display = "none";
	QUIT = true;

}

// update world and game status
function sgame_update() {
	if (GAME_OVER = player_snake.is_dead()) {
		//return;
	}
	player_snake.update();
	if (food_snake.eaten(player_snake.x, player_snake.y)) {
		player_snake.grow();
	}
	var modifier = player_snake.history.length;
	if (modifier > 1) {
		SCORE = Math.floor((modifier * Math.log2(modifier)) + modifier);
	}

}

// draw onto canvas elements of screen
function sgame_draw() {
	var canvas = document.getElementById("Snake"),
		canvas_s = document.getElementById("score"),
		context_s = canvas_s.getContext("2d"),
		context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
	context_s.clearRect(0, 0, canvas_s.width, canvas_s.height);
	draw_score(context_s, canvas_s);
	player_snake.draw(context, canvas);
	food_snake.draw(context, canvas);

	if (GAME_OVER) {
		draw_postgame(context, canvas);
	}
}

// main loop
function snake_game_loop() {
	
	sgame_update();
	sgame_draw();
	setTimeout( function() {
		if (!QUIT && !GAME_OVER) {
			requestAnimationFrame(snake_game_loop);
			document.body.addEventListener("keydown", movement_parser);
		} else {
			document.body.addEventListener("keydown", wait_activity_wrapper);
		}
	}, 1000/FPS);
}


// game init
function snake_board_init() {
	var canvas = document.getElementById("Snake"),
		canvas_s = document.getElementById("score"),
		context_s = canvas_s.getContext("2d"),
		context = canvas.getContext("2d");

	canvas.style.display = "inline-block";
	canvas_s.style.display = "inline-block";

	canvas.height = 400;
	canvas.width = 600;
	canvas_s.height = 400;
	canvas_s.width = 200;

	/* Repositioning the canvas */
	var total_width = canvas.width + canvas_s.width,
		pos_x = (window.innerWidth - total_width) / 2,
		pos_y = $("#Snake").offset().top;
	$("#Snake").offset({top: pos_y, left: pos_x});
	$("#score").offset({top: pos_y, left: (pos_x + canvas.width)});


	// initialize objects
	var board_positions_x = Math.floor(canvas.width / SNAKE_SIZE);
	var board_positions_y = Math.floor(canvas.height / SNAKE_SIZE);  
	player_snake = new Snake(14, 9);
	food_snake = new SnakeFood(Math.floor(rand_range(0, board_positions_x)), Math.floor(rand_range(0, board_positions_y)));


	// enable keypad interrupts
	document.body.addEventListener("keydown", movement_parser);
	document.body.addEventListener("keydown", default_cancel);
	canvas.tabIndex = 1;
	snake_game_loop();
}

function snake_restart() {
	var canvas = document.getElementById("Snake");
	var board_positions_x = Math.floor(canvas.width / SNAKE_SIZE);
	var board_positions_y = Math.floor(canvas.height / SNAKE_SIZE);
	player_snake = new Snake(14, 9);
	food_snake = new SnakeFood(Math.floor(rand_range(0, board_positions_x)), Math.floor(rand_range(0, board_positions_y)));
	canvas.tabIndex = 1;
	snake_game_loop();

}

/* Score board updating */
function draw_score(context, canvas) {
	// clear canvas
	context.clearRect(0, 0, canvas.width, canvas.height);

	// canvas background draw
	context.fillStyle = "orange";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fill();

	// text score draw
	context.fillStyle = "white";
	context.font =  20 + "px Roboto Mono";
	context.fillText("Score: ", 10, 40);

	// score value draw
	context.fillText(SCORE, 100, 40);

	// controls
	context.font = 20 + "px Roboto Mono";
	context.fillText("Movement:", 10, 110);
	context.fillText("▲ or W", 10, 140);
	context.fillText("◄ or A", 10, 170);
	context.fillText("▼ or S", 10, 200);
	context.fillText("► or D", 10, 230);
	context.fillText("Restart: R", 10, 320);
	context.fillText("Exit: Esc", 10, 350);
	context.fillText("Difficulty: " + Math.floor(FPS / 5), 10, 380);
}

/* Game over screen */
function draw_postgame(context, canvas) {
	context.save();
	context.translate(canvas.width/4, canvas.height/3);//canvas.height/2);
	context.rotate(radians(15));

	context.fillStyle = "red"
	context.font = "50px Roboto Mono";

	context.fillText("Game Over!", 0, 0);
	context.restore();
	context.fillStyle = "white";
	context.font = "30px Roboto Mono";
	context.fillText("Press R to retry!", canvas.width/4, canvas.height - 50);
}
