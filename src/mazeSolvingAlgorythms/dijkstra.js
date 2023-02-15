import {getUnvisitedNeighbours, getAllNodes} from "../utils/neighbours";
export default function dijkstra(grid, startNode, endNode) {
    const visitedNodes = []
    startNode.distance = 0
    const unvisitedNodes = getAllNodes(grid)

    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes)
        const closestNode = unvisitedNodes.shift()
        if(closestNode.distance===Infinity) return visitedNodes
        if (closestNode.isWall) continue;
        if (closestNode===endNode) return visitedNodes;
        if(!closestNode.isStart) visitedNodes.push(closestNode)

        updateUnvisitedNodes(closestNode, grid)

    }
}
const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((A, B) => A.distance - B.distance)
}

const updateUnvisitedNodes = (currentNode, grid) => {
    const unvisitedNeighbours = getUnvisitedNeighbours(currentNode, grid)
    for (let node of unvisitedNeighbours) {
        node.distance = currentNode.distance + 1
        node.previousNode = currentNode
    }

}



 export function getShortestPath (finishNode) {
    const  shortestPath = []
    let current = finishNode
    while(current.previousNode !== null){
        shortestPath.unshift(current);
        current = current.previousNode;
    }
    return shortestPath
}

