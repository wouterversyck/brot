const createGrid = (rows, cols) => {
    const grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols).fill(0); // Initialize all cells as dead (0)
    }
    return grid;
};

// Get the number of alive neighbors for a specific cell
const countAliveNeighbors = (grid, x, y) => {
    const rows = grid.length;
    const cols = grid[0].length;
    let aliveNeighbors = 0;

    // Iterate over neighboring cells
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue; // Skip the current cell itself
            const newRow = x + i;
            const newCol = y + j;

            // Check boundaries
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                aliveNeighbors += grid[newRow][newCol];
            }
        }
    }

    return aliveNeighbors;
};

// The main function that computes the next generation
const nextGeneration = (previousGrid) => {
    const rows = previousGrid.length;
    const cols = previousGrid[0].length;
    const newGrid = createGrid(rows, cols);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const aliveNeighbors = countAliveNeighbors(previousGrid, i, j);
            const cell = previousGrid[i][j];

            // Apply the rules of the Game of Life
            if (cell === 1 && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
                newGrid[i][j] = 1; // Stay alive
            } else if (cell === 0 && aliveNeighbors === 3) {
                newGrid[i][j] = 1; // Become alive
            } else {
                newGrid[i][j] = 0; // Stay dead or die
            }
        }
    }

    return newGrid;
};

const randomize = (grid) => {
    const rows = grid.length;
    const cols = grid[0].length;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = Math.round(Math.random())
        }
    }
}

let actualGrid = createGrid(116, 205);
randomize(actualGrid);
export const generate = () => {
    actualGrid = nextGeneration(actualGrid);

    return actualGrid;
}