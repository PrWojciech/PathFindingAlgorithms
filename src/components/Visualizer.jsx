import React, {Component} from "react";
// import Noode from "./Node/Noode";
import Node from "./Node/Noode";
import './Node/Row.css'
import dijkstra, {getShortestPath} from "../mazeSolvingAlgorythms/dijkstra";

import deepFirstSearch from "../mazeSolvingAlgorythms/deepFirstSearch";


const INTERVAL_IN_MILISECONDS = 10
const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 19;
const ROWS_COUNT = 20;
const COLS_COUNT = 20;

export default class Visualizer extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,
            cancel: false
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

    animate(visitedNodesInOrder) {
        let i = 0;
        const intervalId = setInterval(() => {
            if (this.state.cancel === true) {
                console.log("stop");
                clearInterval(intervalId);
            } else {
                const newGrid = this.state.grid.slice();
                const node = visitedNodesInOrder[i];
                node.isVisited = true;
                newGrid[node.row][node.col] = node;
                this.setState({grid: newGrid});
                i++;

                if (i === visitedNodesInOrder.length) {
                    clearInterval(intervalId);
                }
            }

        }, INTERVAL_IN_MILISECONDS);
    }

    doDijkstra() {
        const {grid} = this.state;
        this.setState({cancel: false}, () => {
            console.log(this.state.cancel)
            const startNode = grid[START_NODE_ROW][START_NODE_COL]
            const endNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
            const dijkstraPath = dijkstra(grid, startNode, endNode)
            console.log(dijkstraPath)
            this.animate(dijkstraPath)
        })

    }

    animateDFS() {
        const {grid} = this.state;
        this.setState({cancel:false})

        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const endNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        let maze = deepFirstSearch(grid, startNode, endNode);


        this.animate(maze)

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
                    this.setState({grid: newGrid, mouseIsPressed: false})
                }}> clear
                </button>
                <div className="grid">
                    {grid.map((row, rowIndex) => {
                        return (
                            <div className="row" key={rowIndex}>
                                {row.map((node, nodeIndex) => {
                                    const {row, col, isFinish, isStart, isWall, isVisited} = node;

                                    return (
                                        <Node
                                            key={nodeIndex}
                                            row={row}
                                            col={col}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            isWall={isWall}
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