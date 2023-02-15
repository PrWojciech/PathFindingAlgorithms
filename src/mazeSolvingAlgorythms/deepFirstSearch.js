import {getUnvisitedNeighbours} from "../utils/neighbours";


export default function deepFirstSearch(grid, startNode, endNode) {

    const toVisitStack = [startNode]
    const visitedNodes = []
    let previousNode = null;

    while (toVisitStack.length > 0) {
        if (visitedNodes.length > 0) {
            previousNode = visitedNodes[visitedNodes.length - 1]
        }
        let currentNode = toVisitStack.shift()
        if (currentNode.isWall === true) continue
        if (currentNode === endNode) return unVisitNodes(visitedNodes)
        currentNode.previousNode = previousNode
        currentNode.isVisited = true;
        updateToVisitStack(currentNode, grid, toVisitStack)
        visitedNodes.push(currentNode)

    }
    return unVisitNodes(visitedNodes)
}

export function unVisitNodes(visitedNodes) {
    visitedNodes.forEach(node => node.isVisited = false)
    return visitedNodes
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateToVisitStack(currentNode, grid, toVisitStack) {
    let closestNeighbours = getUnvisitedNeighbours(currentNode, grid)
    shuffleArray(closestNeighbours)
    closestNeighbours.forEach(node => toVisitStack.unshift(node))
}