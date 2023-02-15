import {getUnvisitedNeighbours, getAllNodes} from "../utils/neighbours";
import {unVisitNodes} from "./deepFirstSearch";
import createPath from "../utils/Path";
export default function dijkstra(grid, startNode, endNode) {
    const visitedNodes = []
    startNode.distance = 0
    const unvisitedNodes = getAllNodes(grid)

    // let i =0
    // while (i<10) {
    //     i++
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes)
        let closestNode = unvisitedNodes.shift()

        if(closestNode.distance===Infinity) return visitedNodes
        if (closestNode.isWall) continue;
        closestNode.isVisited = true
        if (closestNode===endNode) {




            createPath(closestNode)


            return unVisitNodes(visitedNodes)
        }
        if(!closestNode.isStart) visitedNodes.push(closestNode)

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




