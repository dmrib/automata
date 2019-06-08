WINDOW_WIDTH = 500;
WINDOW_HEIGHT = 500;

class GameOfLife {
	constructor() {
		this.resolution = 10;
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
		for (let i=max(0, x-1); i<=min(this.rows-1, x+1); i++) {
			for (let j=max(0, y-1); j<=min(this.columns, y+1); j++) {
				if (!(i===x && j===y) && this.cells[i][j]) {
					around++;
				}
			}
		}
		return around;
	}

	update() {
		let next = [];
		for(let i=0; i<this.rows; i++) {
			let row = [];
			for(let j=0; j<this.columns; j++) {
				const around = this.neighboors(i, j);

				// death
				if(this.cells[i][j] && (around >= 4 || around <= 1)) {
					row.push(false);
				}

				// birth
				else if(!this.cells[i][j] && (around === 3)) {
					row.push(true);
				}

				// stasis
				else {
					row.push(this.cells[i][j]);
				}
			}
			next.push(row);
		}
		this.cells = next;
	}
}

let game;

function setup() {
	createCanvas(WINDOW_HEIGHT + 1, WINDOW_WIDTH + 1);
	game = new GameOfLife()
}

function draw() {
	background(255);
	game.draw();
	game.update();
}