//var socket;
//var loop_count = 0;
//var prev_loop = -1;
//var basecolor = 8;

var raindrops = [];

$(document).ready( function() {
	//socket = io.connect("http://localhost:3000");
	//socket = io.connect("http://127.0.0.1:3005");
	//socket.on("looped_music", alter_basecolor);
	document.body.innerHTML += '<div id="rainy_sounds"></audio>';
	rain_setup();
	
});

function rain_setup() {
	// set up audio
	var rainy_sound = new Audio("rain.mp3");
	rainy_sound.onloadedmetadata = function() {
		rain_audio_loop(rainy_sound.duration, rainy_sound);
	};
	rainy_sound.play();

	// setup canvas
	var canvas = document.getElementById("rainvas"),
		context = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	for (i = 0; i < canvas.width; i++) {
		var drop = new rain_drop(rand_range(0, canvas.width), rand_range(-100, -200), Math.random());
		raindrops.push(drop);
	}
	// initialize scene loop
	draw_scene(canvas, context);


}

function rain_audio_loop(duration, rainy_sound) {
	/* there is a delay on the audio ended event, and the audio looping property
	setting this timer to play the track again before the previous one had finished
	will ultimately play the track to overlap the silence of the other one, and create
	a looped track illusion */
	setTimeout(function() {
		var rainy_sound2 = new Audio("rain.mp3");
		rainy_sound2.play();
		rain_audio_loop(duration, rainy_sound2);
		//loop_count++;
	}, (duration - 2) * 1000);
}


//var amount = 500;
var n = 0;
function draw_scene(canvas, context) {
	var canvas = document.getElementById("rainvas"),
		context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
	draw_background(canvas, context);
	//something_to_give();
	for (i = 0; i < raindrops.length; i++) {
		raindrops[i].update(canvas);
		raindrops[i].draw(context);
	}
	requestAnimationFrame(draw_scene);

}

function draw_background(canvas, context) {
	context.fillStyle = "rgb(8, 12, 30)";
	//context.fillStyle = "rgb(" + basecolor + ", 12, 30)";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fill();
}

function rain_drop(x, y, a) {
	this.x = x;
	this.y = y;
	
	this.direction = new Vector(Math.random(), rand_range(1, 30));
	this.acc = 0.2;

	this.width = this.direction.magnitude() / 10;
	this.length = this.direction.magnitude() / 2;
	this.delay = rand_range(0, 500);

	this.draw = function(context) {
		context.fillStyle = "rgb(133, 150, 180)";
		context.fillRect(this.x, this.y, this.width, this.length);
		context.fill();
	}

	this.update = function(canvas) {
		if (this.delay > 1) {
			this.delay--;
			return;
		}
		this.y += this.direction.y;
		this.x += this.direction.x;
		this.direction.apply((this.direction.x / this.acc) / 300, this.acc);

		if (this.y > canvas.height) {
			this.y = rand_range(0, -canvas.height);
			this.x = rand_range(-canvas.width, canvas.width);
			this.direction = new Vector(Math.random(), rand_range(1, 30));
			this.width = this.direction.magnitude() / 10;
			this.length = this.direction.magnitude() / 2;
		}
	}
}

/*function something_to_give() {
	var data = {
		music_displayed: loop_count
	};

	if (loop_count > prev_loop) {
		socket.emit("looped_music", data);
		console.log("sent");
		prev_loop++;
	}
}

function alter_basecolor(data) {
	basecolor = data.color;
	console.log("altering: " + basecolor);
}*/


