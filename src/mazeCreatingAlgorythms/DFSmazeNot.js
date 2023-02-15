const wallProbability = 0.8; // Probability of creating a wall

export default function  createMazeDFS(grid,startNodee, endNodee) {
    const startRow = startNodee.row
    const startCol = startNodee.col
    const startNode = grid[startRow][startCol];
    startNode.isVisited = true;

    // Create a stack to keep track of nodes to visit
    const stack = [startNode];

    // Traverse the graph in DFS order
    while (stack.length > 0) {
        const currNode = stack.pop();
        const neighbors = getUnvisitedNeighbors(currNode, grid);

        // Randomly shuffle the order of the neighbors
        shuffleArray(neighbors);

        for (let neighbor of neighbors) {
            // Mark the neighbor as visited
            neighbor.isVisited = true;

            // Remove the wall between the current node and the neighbor
            removeWall(currNode, neighbor);

            // Add the neighbor to the stack to visit its neighbors later
            stack.push(neighbor);
        }
    }

    // Reset the isVisited flag of each node
    for (let row of grid) {
        for (let node of row) {
            node.isVisited = false;
        }
    }
    console.log(grid)
    return grid
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {row, col} = node;

    // Check the neighbor to the left
    if (col > 0 && !grid[row][col - 1].isVisited) {
        neighbors.push(grid[row][col - 1]);
    }

    // Check the neighbor to the right
    if (col < grid[0].length - 1 && !grid[row][col + 1].isVisited) {
        neighbors.push(grid[row][col + 1]);
    }

    // Check the neighbor above
    if (row > 0 && !grid[row - 1][col].isVisited) {
        neighbors.push(grid[row - 1][col]);
    }

    // Check the neighbor below
    if (row < grid.length - 1 && !grid[row + 1][col].isVisited) {
        neighbors.push(grid[row + 1][col]);
    }

    return neighbors;
}

function removeWall(nodeA, nodeB) {
    const rowDiff = nodeA.row - nodeB.row;
    const colDiff = nodeA.col - nodeB.col;

    if (colDiff === 1) {
        nodeA.leftWall = false;
        nodeB.rightWall = false;
    } else if (colDiff === -1) {
        nodeA.rightWall = false;
        nodeB.leftWall = false;
    } else if (rowDiff === 1) {
        nodeA.topWall = false;
        nodeB.bottomWall = false;
    } else if (rowDiff === -1) {
        nodeA.bottomWall = false;
        nodeB.topWall = false;
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}