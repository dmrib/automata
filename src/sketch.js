/**
 * p5.js sketch
 */


// create game of life instance container
let game;

// define colors
const DEAD   = [242,147,214];
const ALIVE  = [168,224,182];
const BORDER = [96,133,242];

// define grid dimensions
const HEIGHT     = 900;
const WIDTH      = 900;
const RESOLUTION = 30;


/**
 * p5.js setup function.
 */
function setup()
{
    // create drawing canvas
    createCanvas(WIDTH, HEIGHT);

    // create game of life instance
    game = new GameOfLife(HEIGHT, WIDTH, RESOLUTION);

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
