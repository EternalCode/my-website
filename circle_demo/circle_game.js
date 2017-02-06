var canvas, context, player;
var enemies = [];
var enemies_max = Math.min(window.innerWidth, window.innerHeight) >> 2;
var GAME_STATUS = "INACTIVE";

$(document).ready( function() {
	circle_game_init();
	
});


function circle_game_init() {

	canvas = document.getElementById("CircleGame"),
	context = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// create the player
	player = new Circle(10, "orange");
	player.color = "orange";
	mouse_x = player.coords.x = -5000;
	mouse_y = player.coords.y = -5000;
	/* TODO: Use click to generate player event position */

	for (var i = 0; i < enemies_max; i++) {
		enemies.push(new Circle(rand_range(player.r - 5, player.r + 15)));
	}



	document.body.addEventListener("keydown", ekey_down);
	document.body.addEventListener("keyup", ekey_up);
	document.body.addEventListener("mousedown", emouse_down);
	document.body.addEventListener("mouseup", emouse_up)
	document.body.addEventListener("mousemove", emouse_move);

	GAME_STATUS = "ACTIVE";
	requestAnimationFrame(game_loop);
}



function game_loop() {
	player.update_player();
	// draw
	circle_game_draw_board();
	player.draw();

	for (var i = 0; i < enemies_max; i++) {
		// update
		enemies[i].update_ai();
		enemies[i].draw();
	}

	// loop
	if (GAME_STATUS == "ACTIVE") {
		requestAnimationFrame(game_loop);
	} else {
		show_score();
		circle_game_init();
	}
}


function show_score() {
	context.fillStyle = "white";
	context.font =  80 + "px Roboto Mono";
	context.fillText(15, (canvas.width / 4) - 20, 40);
	//context.fillText(OPPONENT_SCORE, ((3 * width) / 4) - 20, 40);
	context.fill();
}


function circle_game_draw_board() {
	context.globalAlpha = 1;
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);
}


function Circle(radius, color) {
	this.r = radius;
	this.coords = new Vector(rand_range(0, canvas.width), rand_range(0, canvas.height));
	this.velocity = rand_range(3, canvas.width >> 8)
	this.direction = new Vector(rand_range(0, 360));

	this.color;
	if (color == null) { 
		this.color = (this.r > player.r) ? "red" : "white";
	} else {
		this.color = color;
	}

	this.draw = function() {
		context.globalAlpha = 0.8;
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.coords.x, this.coords.y, this.r, 0, 2 * Math.PI);
		context.fill();
	}

	this.update_ai = function() {
		
		if ((this.coords.x > (canvas.width + this.r)) || (this.coords.x < -this.r) || (this.coords.y < -this.r) || (this.coords.y > (canvas.height + this.r))) {
			this.reset();
		}
		this.coords.x += this.direction.x * this.velocity;
		this.coords.y += this.direction.y * this.velocity;
		this.color = (this.r > player.r) ? "red" : "white";

	}

	this.update_player = function() {
		this.coords.x = mouse_x;
		this.coords.y = mouse_y;

		// check collisions and update player radius
		for (var i = 0; i < enemies_max; i++) {
			if (dist(this.coords.x, this.coords.y, enemies[i].coords.x, enemies[i].coords.y) <= (this.r + enemies[i].r)) {
				if (enemies[i].r > this.r) {
					// game over
					GAME_STATUS = "INACTIVE";
					enemies_max = Math.min(window.innerWidth, window.innerHeight) >> 2;
					break;
				} else {
					// decrement all visible enemy radiuses
					this.r++;
					//for (var j = 0; j < enemies_max; j++) {
					//	enemies[j].r -= (enemies[j].r) ? 1 : 0;
					//}
					enemies.splice(i, 1);
					enemies_max--;
					break;
				}
			}
			
		}
	}

	this.reset = function() {
		this.r = rand_range(player.r -5, player.r + 15);
		this.coords = offscreen_coords(this.r);
		this.direction = new Vector(rand_range(0, 360));
	}

}

function offscreen_coords(radius) {
	var y = rand_range(-canvas.height * 1.5, canvas.height * 1.5) + radius;
	var x;
	if (y > 0 && y < canvas.height) {
		// restrain x
		x = (rand() >= 0.5) ? rand_range(-radius * 2, -radius) : rand_range(canvas.width + radius, canvas.width + (radius * 2));
	} else {
		x = rand_range(0, canvas.width);
	}
	return new Vector(x, y);
}