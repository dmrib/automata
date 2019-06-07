WINDOW_WIDTH = 800;
WINDOW_HEIGHT = 800;

class GameOfLife {
	constructor() {
		this.resolution = 25;
		this.columns = WINDOW_WIDTH / this.resolution;
		this.rows = WINDOW_HEIGHT / this.resolution;
		this.cells = []
		this.start();
	}

	start() {
		for (let i=0; i<this.rows; i++) {
			let row = [];
			for (let j=0; j<this.columns; j++) {
				row.push(random() > 0.5 ? true : false);
			}
			this.cells.push(row);
		}
	}

	draw() {
		for (let i=0; i<this.rows; i++) {
			for (let j=0; j<this.columns; j++) {
				this.cells[i][j] ? fill(0) : fill(255);
				rect(i*this.resolution, j*this.resolution, this.resolution, this.resolution);
			}
		}
	}
}

let game;
let debug = false;
let selected;
let cell;

function setup() {
	createCanvas(WINDOW_HEIGHT + 1, WINDOW_WIDTH + 1);
	game = new GameOfLife()
}

function draw() {
	background(255);
	game.draw();

	if (debug) {
		cell = p5.Vector.mult(selected, 25);
		fill(0, 255, 0);
		rect(cell.x, cell.y, 25, 25);
	}
}

function keyPressed() {
	if (key === 'T') {
		debug = !debug;
		selected = createVector(int(mouseX/25), int(mouseY/25));
	}
}