/* Snake object */
function Snake(x, y) {
	this.x = SNAKE_SIZE * x;
	this.y = SNAKE_SIZE * y;
	this.direction = new Vector(0, 0);
	this.len = 1;
	this.history = [];

	this.history.push(new Vector(this.x, this.y));

	this.update =  function() {
		var canvas = document.getElementById("Snake");
		this.x += SNAKE_SIZE * this.direction.x;
		this.y += SNAKE_SIZE * this.direction.y;

		// if the next position is out of bounds, the game is over.
		if ((this.x > (canvas.width - SNAKE_SIZE)) || (this.y > (canvas.height - SNAKE_SIZE)) ||
			(this.x < 0) || (this.y < 0)) {
			GAME_OVER = true;
			return;
		}

		// pop tail, push new vector
		this.history.splice(0, 1);
		this.history.push(new Vector(this.x, this.y));
		
	};

	this.direction_set = function(x, y) {
		// applying opposite vectors are not allowed.
		var temp_v = new Vector(this.direction.x, this.direction.y);
		temp_v.apply(x, y);
		if ((temp_v.x == 0) && (temp_v.y == 0)) {
			return;
		}
		this.direction.set(x, y);
	};

	this.grow = function() {
		/* for the grow function, all we need to do is ensure the last element isn't spliced off next update
		 * to do that, we just put a dummy vector off screen and allow the draw function to handle extension */
		this.history.splice(0, 0, new Vector(9999, 9999));
	};

	this.is_dead = function() {
		/* Since snake's history is unconflicting, otherwise it's already game over, then it sufficed to only
		 * check that the head has touched another member. If members besides the head are touched, then the 
		 * game must have been over already. */
		for (var j = 1; j < this.history.length; j++) {
			if (this.history[0].is_equals(this.history[j])) {
				return true;
			}
		}
		return false;
	};

	this.draw = function (context, canvas) {
		// clear canvas and draw snake at it's position
		context.fillStyle = "black";
		context.fillRect(0, 0, canvas.width, canvas.height);

		for (var i = 0; i < player_snake.history.length; i++) {
			context.strokeStyle = "blue";
			context.rect(player_snake.history[i].x, player_snake.history[i].y, SNAKE_SIZE, SNAKE_SIZE);
			context.stroke();
		}
	};
}



/* Name food class */
function SnakeFood(x, y) {
	this.x = SNAKE_SIZE * x;
	this.y = SNAKE_SIZE * y;

	this.eaten = function(x, y) {
		if ((this.x == x) && (this.y == y)) {
			var canvas = document.getElementById("Snake");
				board_positions_x = Math.floor(canvas.width / SNAKE_SIZE);
				board_positions_y = Math.floor(canvas.height / SNAKE_SIZE);  
			this.x = SNAKE_SIZE * Math.floor(rand_range(0, board_positions_x));
			this.y = SNAKE_SIZE * Math.floor(rand_range(0, board_positions_y));
			return 1;
		} else {
			return 0;
		}
	};

	this.draw = function (context, canvas) {
		var r = SNAKE_SIZE >> 1; // radius
		context.strokeStyle = "white"
		context.beginPath();
		context.arc(food_snake.x + r, food_snake.y + r, r, 0, 2 * Math.PI);
		context.stroke();
	};
}


