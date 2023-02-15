import React, {Component} from "react";
// import Noode from "./Node/Noode";
import Node from "./Node/Noode";
import './Node/Row.css'
import dijkstra, {getShortestPath} from "../mazeSolvingAlgorythms/dijkstra";
import createPath from "../utils/Path";

import deepFirstSearch from "../mazeSolvingAlgorythms/deepFirstSearch";


const INTERVAL_IN_MILISECONDS = 10
const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 19;
const ROWS_COUNT = 20;
const COLS_COUNT = 20;

export default class Visualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsPressed: false,
            cancel: false,
            currentAlgorithm: null
        }
    }

    componentDidMount() {
        const newGrid = getEmptyGrid();
        this.setState({grid: newGrid})
    }

    handleMouseDown(row, col) {
        console.log(this.state.grid[row][col])
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col)
        this.setState({grid: newGrid, mouseIsPressed: true})
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col)
        this.setState({grid: newGrid})
    }

    handleMouseUp() {
        this.setState({mouseIsPressed: false})
    }


animatePath(path){

    let i = 0;
    const intervalId = setInterval(() => {
        if (this.state.cancel === true) {
            clearInterval(intervalId);
        } else if (i === path.length) {
            clearInterval(intervalId);
        } else {
            const newGrid = this.state.grid.slice();
            const node = path[i];
            node.isVisited = false;
            node.isPath = true;
            newGrid[node.row][node.col] = node;
            this.setState({grid: newGrid});
            i++;

        }

    }, INTERVAL_IN_MILISECONDS);

}

    animate(visitedNodesInOrder,finishNode) {
        console.log(visitedNodesInOrder)

        let i = 0;
        const intervalId = setInterval(() => {
            if (this.state.cancel === true) {
                clearInterval(intervalId);
            } else if (i === visitedNodesInOrder.length) {
                if(this.state.currentAlgorithm==="Dijkstra") {
                    this.animatePath(createPath(finishNode))
                    clearInterval(intervalId);
                }else if(this.state.currentAlgorithm==="DFS"){
                    this.animatePath(visitedNodesInOrder)
                    clearInterval(intervalId);
                }
            } else {
                const newGrid = this.state.grid.slice();
                const node = visitedNodesInOrder[i];
                node.isVisited = true;
                newGrid[node.row][node.col] = node;
                this.setState({grid: newGrid});
                i++;

            }

        }, INTERVAL_IN_MILISECONDS);
    }

    doDijkstra() {

        const {grid} = this.state;
        this.setState({cancel: false, currentAlgorithm:"Dijkstra"}, () => {

            const startNode = grid[START_NODE_ROW][START_NODE_COL]
            const endNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
            const dijkstraPath = dijkstra(grid, startNode, endNode)

            this.animate(dijkstraPath,endNode)
        })

    }

    animateDFS() {
        const {grid} = this.state;
        this.setState({cancel: false,currentAlgorithm:"DFS"})
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const endNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        let maze = deepFirstSearch(grid, startNode, endNode);
        console.log(maze.length)
        console.log(endNode)
        this.animate(maze,endNode)
    }

    render() {
        const {grid, mouseIsPressed} = this.state;
        return (
            <div>
                <button onClick={() => this.animateDFS()}>DFS</button>
                {/*<button onClick={() => this.createRandomMaze()}>labirnee</button>*/}
                <button onClick={() => this.doDijkstra()}>start</button>
                <button onClick={() => {
                    const newGrid = getEmptyGrid()
                    this.setState({cancel: true})
                    this.setState({grid: newGrid, mouseIsPressed: false, currentAlgorithm: null})
                }}> clear
                </button>
                <div className="grid">
                    {grid.map((wholeRow, rowIndex) => {
                        return (
                            <div className="row" key={rowIndex}>
                                {wholeRow.map((node, nodeIndex) => {
                                    const {row, col, isFinish, isStart, isWall, isVisited, isPath} = node;

                                    return (
                                        <Node
                                            key={nodeIndex}
                                            row={row}
                                            col={col}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            isWall={isWall}
                                            isPath={isPath}
                                            isVisited={isVisited}

                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseUp={() => this.handleMouseUp()}
                                            onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                        ></Node>
                                    )
                                })
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        )

    }
}

const getEmptyGrid = () => {
    let grid = []
    for (let row = 0; row < ROWS_COUNT; row++) {
        let currentRow = [];
        for (let col = 0; col < COLS_COUNT; col++) {
            currentRow.push(createNode(row, col))
        }
        grid.push(currentRow)
    }
    return grid;

}

const createNode = (row, col) => {
    return {
        row,
        col,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        isWall: false,
        isVisited: false,
        distance: Infinity,
        isPath: false,
        previousNode: null,
        className: "node"
    }
}
const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    newGrid[row][col] = {
        ...node,
        isWall: !node.isWall,
    };
    return newGrid;
};