import {getUnvisitedNeighbours, getAllNodes} from "../utils/neighbours";
import {unVisitNodes} from "./deepFirstSearch";
export default function dijkstra(grid, startNode, endNode) {
    const visitedNodes = []
    startNode.distance = 0
    const unvisitedNodes = getAllNodes(grid)

    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes)
        let closestNode = unvisitedNodes.shift()
        if(closestNode.distance===Infinity) return visitedNodes
        if (closestNode.isWall) continue;
        if (closestNode===endNode) return unVisitNodes(visitedNodes)
        if(!closestNode.isStart) visitedNodes.push(closestNode)
        closestNode.isVisited = true
        updateUnvisitedNodes(closestNode, grid)
    }
    return  unVisitNodes(visitedNodes)
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




