export function getUnvisitedNeighbours (currentNode, grid) {
    const neighbours = []
    const {row, col} = currentNode
    if (row > 0) neighbours.push(grid[row - 1][col])
    if (row < grid.length - 1) neighbours.push(grid[row + 1][col])
    if (col > 0) neighbours.push(grid[row][col - 1])
    if (col < grid.length - 1) neighbours.push(grid[row][col + 1])
    // console.log(neighbours)

    return neighbours.filter(node => !node.isVisited);
}
export function  getAllNodes(grid) {
    const nodes = [];
    for (let row of grid) {
        for (let node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}