let grid;
let cols;
let rows;
let resolution = 10;

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

// generate initial state
function generateSeed(grid, cols, rows) {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2)); // 1 - living cell; 0 - dead cell
        }
    }
}

function drawGrid(grid, cols, rows, resolution) {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {
                fill(255);
                stroke(0);
                rect(x, y, resolution - 1, resolution - 1);
            }
        }
    }
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            // fix border cells cases
            let col = (x + i + cols) % cols; // (x=0->x=9; x=9->x=0)
            let row = (y + j + rows) % rows; // (y=0->y=9; y=9->y=0)
            // count living cells
            sum += grid[col][row];
        }
    }
    // exclude cell neighbors are beeing checked
    sum -= grid[x][y];
    return sum;
}

function applyTransition(grid, cols, rows) {
    let next = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            // count live neighbors
            let neighbors = countNeighbors(grid, i, j);
            // decide next state
            if (state == 0 && neighbors == 3) {
                next[i][j] = 1;
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }
        }
    }
    return next;
}

function setup() {
    createCanvas(800, 800);
    cols = width / resolution;
    rows = height / resolution;

    grid = make2DArray(cols, rows);
    generateSeed(grid, cols, rows);
}

function draw() {
    background(0);

    drawGrid(grid, cols, rows, resolution);

    grid = applyTransition(grid, cols, rows);
}
