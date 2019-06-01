GRID_WIDTH = 800;
GRID_HEIGHT = 800;

class WolframAutomata {
	constructor () {
		this.generation = 0;
		this.resolution = 10;
		this.numCells = GRID_WIDTH / this.resolution;
		this.generations = [];
		this.current = [];
		this.start();
		this.drawGeneration(0, this.current);
	}

	start () {
		this.current = this.randomGeneration();
		this.generations.push(this.current);
	}

	tick () {
		let next = this.randomGeneration();
		if (this.generations.length > GRID_HEIGHT / this.resolution) {
			this.generations.shift();
		}
		this.generations.push(next);
		this.current = next;
		this.generation += 1;
	}

	randomGeneration() {
		let generation = [];
		for (let i=0; i<this.numCells; i++) {
			generation.push(Math.random() > 0.5 ? true : false);
		}
		return generation;
	}

	drawGeneration(genPosition, generation) {
		for (let i=0; i<this.numCells; i++) {
			generation[i] ? fill(0) : fill(255);
			rect(i*this.resolution, (genPosition + 1) * 10, this.resolution, this.resolution);
		}
	}

	draw () {
		for (let i=0; i<this.generations.length; i++) {
			this.drawGeneration(i, this.generations[i]);
		}
	}
}

let automata;

function setup() {
	createCanvas(GRID_WIDTH + 1, GRID_HEIGHT + 1);
	automata = new WolframAutomata();
}

function draw() {
	automata.tick();
	automata.draw();
}

