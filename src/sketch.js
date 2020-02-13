/**
 * State
 */

// create game of life instance container
let game;

// define colors
const DEAD = [32,26,64];
const ALIVE = [215,224,38];
const BORDER = [120,61,83];

/**
 * p5.js setup function.
 */
function setup()
{
    // create drawing canvas
    createCanvas(windowWidth, windowHeight);

    // create game of life instance
    game = new GameOfLife(15);

    // setup stroke weight and color
    strokeWeight(2);
    stroke(...BORDER);
}

/**
 * p5.js loop.
 */
function draw()
{
    // paint background
    background(255);

    // draw game state
    game.draw();

    // update game state
	game.update();
}