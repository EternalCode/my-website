function Paddle(x, y) {
	this.x = x;
	this.y = y;

	this.direction = new Vector(0, 0);

	this.update = function(canvas) {
		var updarrow = (keys[38] ? -1 : 0) * PADDLE_SPEED;
			downarrow = (keys[40] ? 1 : 0) * PADDLE_SPEED;
		this.direction.y += downarrow + updarrow;
		this.y += this.direction.y;
		// nullify the vector if in bounds
		this.y = constrain(this.y, 2, canvas.height - PADDLE_DIM.y - 2);
		this.direction.y /= 1.1;
	}

	this.update_opponent = function(canvas) {
		/* The AI's algorithm:
		 * 1) Wait for ball to be on my side of court
		 * 2) Move up if ball's position is over mine
		 * 3) Move down if ball's position is under mine 
		*/
		var updarrow = ((this.y > pong_ball.y) ? -1 : 0) * PADDLE_SPEED;
			downarrow = ((this.y < pong_ball.y) ? 1 : 0) * PADDLE_SPEED;
		if (offset(this.x, pong_ball.x) > 400) {
			updarrow = 0;
			downarrow = 0;
		}
		this.direction.y += downarrow + updarrow;
		this.y += this.direction.y;
		// nullify the vector if in bounds
		this.y = constrain(this.y, 2, canvas.height - PADDLE_DIM.y - 2);
		this.direction.y /= 1.1;
	}

	this.draw = function (context) {
		context.beginPath();
		context.strokeStyle = "white";
		context.rect(this.x, this.y, PADDLE_DIM.x, PADDLE_DIM.y);
		context.stroke();
	}
}


function Ball(x, y) {
	this.x = x;
	this.y = y;
	this.r = 10;
	this.direction = new Vector(-(X_SPEED_PONGBALL), 0);

	this.update = function() {
		this.collision_delta();
		this.x += this.direction.x;
		this.y += this.direction.y;
		this.y = constrain(this.y, this.r, height - this.r);
	}

	this.draw = function(context) {
		context.strokeStyle = "white"
		context.beginPath();
		context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
		context.stroke();
	}

	this.collision_delta = function() {
		// if ball hits a wall, dy = -dy, dx remains the same
		if ((this.y == this.r) || (this.y == (height - this.r))) {
			this.direction.y = -(this.direction.y);
			this.direction.y *= 0.9; // speed is lost on wall collision
			return;
		}
		/* The physics for collision is a little selective. There is a force normal vector applied from
		 * the paddle, but to prevent loss of speed, it's double the dx of the ball. Then the acceleration upwards
		 * from the paddle is applied to the ball as well. This creates the angle and depth of the angle, as opposed
		 * to drawing a perpendicular. */
		if (((this.x - this.r) <= (player_paddle.x + PADDLE_DIM.x)) && ((this.y + this.r) >= player_paddle.y) &&
			((this.y - this.r) <= (player_paddle.y + PADDLE_DIM.y))) {
			this.direction.apply(-(this.direction.x * 2), 0);			
			this.direction.apply(0, player_paddle.direction.y); 
		} else if (((this.x + this.r) >= opponent_paddle.x) && ((this.y + this.r) >= opponent_paddle.y) && 
			((this.y - this.r) <= (opponent_paddle.y + PADDLE_DIM.y))) {
			this.direction.apply(-(this.direction.x * 2), 0);
			this.direction.apply(0, opponent_paddle.direction.y); 
		} else {
			return;
		}
		// in extreme cases, the dy of the paddle is high most of the time, so we need to constrain dy
		this.direction.y = constrain(this.direction.y, -20, 20);
	}

	this.ring_out = function() {
		if (this.x < this.r) {
			OPPONENT_SCORE++;
			return 2; // opponent's victory
		} else if (this.x > (width - this.r)) {
			PLAYER_SCORE++;
			return 1; // player's victory
		} else {
			return 0; // ball inbounds
		}
	}
}

