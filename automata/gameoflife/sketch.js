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

	neighboors(x, y) {
		let around = 0;
		for (let i=x-1; i<=x+1; i++) {
			for (let j=y-1; j<=y+1; j++) {
				if (!(i===x && j===y)) {
					if(this.cells[i][j]) around++;
					neighborhood.push(createVector(i, j));
				}
			}
		}
		console.log(around);
	}
}

let game;
let debug = false;
let selected;
let cell;
let neighborhood = [];

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
		game.neighboors(selected.x, selected.y);
		neighborhood.forEach(element => {
			game.cells[element.x][element.y] ? fill(255, 0, 0) : fill(0, 0, 255);
			rect(element.x*25, element.y*25, 25, 25);
		});
	}
}

function keyPressed() {
	if (key === 'T') {
		debug = !debug;
		selected = createVector(int(mouseX/25), int(mouseY/25));
		neightborhood = [];
	}
}