/**
 * State
 */

// create game of life instance container
let game;

/**
 * p5.js setup function.
 */
function setup()
{
    // create drawing canvas
    createCanvas(windowWidth, windowHeight);

    // create game of life instance
	game = new GameOfLife(15);
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