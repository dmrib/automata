/**
 * Game of life automata abstraction.
 */


class GameOfLife
{
    /**
     * Constructor.
     *
     * Args:
     *  width(number):      width of game grid in pixels
     *  height(number):     height of the game grid in pixels
     *  resolution(number): grid tile resolution in pixels
     *
     * Returns:
     *  undefined.
     */
    constructor(heigth, width, resolution)
    {
        // store components
        this.resolution = resolution;
        this.rows       = heigth / this.resolution;
        this.columns    = width / this.resolution;
        this.cells      = []

        // start game of life
		this.start();
	}


    /**
     * I setup my initial state.
     *
     * Returns:
     *  undefined.
     */
    start()
    {
        // for each row in grid
        for (let i=0; i<this.rows; i++)
        {
            // initialize new row container
            let row = [];

            // for each column in row
            for (let j=0; j<this.columns; j++)
            {
                // randomize life presence
				row.push(random() > 0.5 ? true : false);
            }

            // insert created row in grid
			this.cells.push(row);
		}
	}


    /**
     * I draw my state representation.
     *
     * Returns:
     *  undefined.
     */
    draw()
    {
        // for each row in grid
        for (let i=0; i<this.rows; i++)
        {
            // for each column in row
            for (let j=0; j<this.columns; j++)
            {
                // set color cell color depending on state
                this.cells[i][j] ? fill(...ALIVE) : fill(...DEAD);

                // draw cell
				rect(j*this.resolution, i*this.resolution, this.resolution, this.resolution);
			}
		}
    }


    /**
     * I compute how many surrounding with life a given position has.
     *
     * Args:
     *  x(number): cell x coordinate
     *  y(number): cell y coordinate
     *
     * Returns:
     *  around(number): number of surrounding cells with life
     */
    neighboors(x, y)
    {
        // start neighboors with life counter
        let around = 0;

        // for each 8-neighborhood of position
        for (let i=max(0, x-1); i<=min(this.rows-1, x+1); i++)
        {
            for (let j=max(0, y-1); j<=min(this.columns, y+1); j++)
            {
                // neighboor position has life: increment counter
                if (!(i===x && j===y) && this.cells[i][j])
                {
					around++;
				}
			}
        }

		return around;
	}


    /**
     * I update my state.
     *
     * Returns:
     *  undefined.
     */
    update()
    {
        // create next state container
        let next = [];

        // for each row in grid
        for (let i=0; i<this.rows; i++)
        {
            // start updated row container
            let row = [];

            // for each column in row
            for (let j=0; j<this.columns; j++)
            {
                // get amount of surrounding cells with life
				const around = this.neighboors(i, j);

				// cell is dead and has exactly three neighboors: create life
                if (!this.cells[i][j] && (around === 3))
                {
					row.push(true);
				}

				// cell is alive and has two or three neighboors: cell survives
                else if (this.cells[i][j] && (around >= 2 && around <= 3))
                {
					row.push(this.cells[i][j]);
				}

				// otherwise: cell dies
                else
                {
					row.push(false);
				}
            }

            // add row to next state
			next.push(row);
        }

        // update state
		this.cells = next;
	}
}
