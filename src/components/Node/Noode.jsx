import React, {Component} from "react";
import './Node.css'


export default class Node extends Component {
    render() {
        const {
            row,
            col,
            isFinish,
            isStart,
            isWall,
            isVisited,
            onMouseDown,
            onMouseUp,
            onMouseEnter,

        } = this.props;
        const additionalClassName = isFinish
            ? 'node-finish'
            : isStart
            ? 'node-start'
            : isWall
            ? 'node-wall'
            : isVisited
            ? 'node-visited'
            : ""


        return (
            <div
                id={`node-${row}-${col}`}
                className={`node ${additionalClassName}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp(row, col)}

            ></div>

        );

    }
}