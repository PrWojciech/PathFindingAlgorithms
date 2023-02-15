export default function createPath(finishNode) {
    let currentNode = finishNode
    const path = []
    let i = 0
    while (currentNode.previousNode !== null) {
        // console.log(currentNode)
        // console.log(currentNode.previousNode)
        // console.log("przerwa")
        // console.log("przerwa")
        // console.log("przerwa")
        // console.log("przerwa")


        path.unshift(currentNode.previousNode)
        currentNode = currentNode.previousNode
        i++
    }

    return path
}