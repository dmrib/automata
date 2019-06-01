GRID_WIDTH = 800;
GRID_HEIGHT = 800;

class WolframAutomata {
	constructor() {
		this.generation = 0;
		this.resolution = 10;
		this.numCells = GRID_WIDTH / this.resolution;
		this.generations = [];
		this.current = [];
		this.ruleset = [0, 0, 1, 0, 1, 0, 1, 0];  // 0 to 255
		this.start();
	}

	start() {
		this.current = this.randomGeneration();
		this.generations.push(this.current);
	}

	tick() {
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

	draw() {
		for (let i=0; i<this.generations.length; i++) {
			this.drawGeneration(i, this.generations[i]);
		}
	}

	toInt(bin) {
		let value = 0;

		for(let i=0; i<=bin.length; i++) {
			if(bin[i]) {
				value += Math.pow(2, bin.length - 1 - i);
			}
		}

		return value;
	}

	toBin(value) {
		let bin = [];
		let remainder;

		while(value > 0) {
			remainder = value%2;
			value = Math.floor(value/2);
			bin.unshift(remainder);
		}

		if(bin.length > 0)  {
			while(bin.length < 8) {
				bin.unshift(0);
			}
			return bin;
		}
		else {
			return [0];
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

