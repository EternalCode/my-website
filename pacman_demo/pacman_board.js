var canvas, context;

var field_walls = [
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1,
1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1,
1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
2, 2, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 2, 2,
1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
4, 2, 2, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 2, 2, 4,
1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
1, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 1,
1, 0, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 2, 2, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 0, 1,
1, 0, 1, 1, 1, 1, 0, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 0, 1, 1, 1, 1, 0, 1,
1, 0, 0, 0, 1, 1, 0, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 0, 1, 1, 0, 0, 0, 1,
1, 1, 1, 0, 1, 1, 0, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 0, 1, 1, 0, 1, 1, 1,
1, 1, 1, 0, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 0, 1, 1, 1,
1, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 1,
1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1,
1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1,
1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1,
1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1,
1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1,
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];


var Player_pacman;

function pacman_board_init() {
	canvas = document.getElementById("Pacman");
	context = canvas.getContext("2d");

	canvas.style.display = "block";

	canvas.width = 480;
	canvas.height = 576;

	pacman_board_draw(canvas, context);
}

function pacman_board_draw(canvas, context) {
	// background
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// first three rows are for the status

	// board top row
	for (var j = 0; j < 31; j++) {
		for (var i = 0; i < 28; i++) {
			if (field_walls[(j * 28) + i] == 1) {
				// draw wall
				context.beginPath();
				context.fillStyle = "blue";
				context.fillRect((i + 1) * 16, (j + 1) * 16, 16, 16);
			} else if (!field_walls[(j * 28) + i]) {
				//draw yellow food
				context.beginPath();
				context.fillStyle = "yellow";
				context.arc(((i + 1) * 16) + 8, ((j + 1) * 16) + 8, 4, 0, 2 * Math.PI);
				context.fill();
			} else if (field_walls[(j * 28) + i] == 3) {
				context.beginPath();
				context.fillStyle = "orange";
				context.arc(((i + 1) * 16) + 9, ((j + 1) * 16) + 9, 5, 0, 2 * Math.PI);
				context.fill();
			} 
		}
	}

	Player_pacman = new Pacman();
	requestAnimationFrame(pacman_game_loop);
}

function pacman_game_loop() {
	// update

	// draw
	Player_pacman.draw(canvas, context);
	// loop
	requestAnimationFrame(pacman_game_loop);
}


function Pacman() {
	this.x = 14;
	this.y = 24;

	this.direction = 1; // 0 - none; 1 - up; 2 - down; 3 - left, 4 - right
	this.is_closed = 0; // increment, when at 4 open mouth until 8, then set to 0.

	this.draw = function (canvas, context) {
		context.fillStyle = "yellow";
		context.beginPath();
		context.arc(this.x * 16 + 8, this.y * 16 + 8, 8, 0, 2 * Math.PI);
		context.fill();

		// pac man's mouth
		if (this.is_closed <= 16) {
			this.is_closed++;
			return;
		} else if (this.is_closed < 32) {
			this.is_closed++;
		} else {
			this.is_closed = 0;
		}
		
		context.fillStyle = "black";
		context.beginPath();
		context.moveTo(this.x * 16 + 8, this.y * 16 + 8);
		switch (this.direction) {
			case 0:
				// game started, pacman hasn't moved
				return;
				break;
			case 1:
				// pacman facing up
				context.arc(this.x * 16 + 8, this.y * 16 + 8, 9, Math.PI * 1.25, Math.PI * 1.75);
				break
			case 2:
				// pacman facing down
				context.arc(this.x * 16 + 8, this.y * 16 + 8, 9, Math.PI * 0.25, 0.75 * Math.PI);
				break;
			case 3:
				// pacman facing left
				context.arc(this.x * 16 + 8, this.y * 16 + 8, 9, Math.PI * 0.75, 1.25 * Math.PI);
				break;
			case 4:
				// pacman facing right
				context.arc(this.x * 16 + 8, this.y * 16 + 8, 9, Math.PI * 1.75, 0.25 * Math.PI);
				break;
		};
		context.fill();
	}
}