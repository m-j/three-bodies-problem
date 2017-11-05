import * as React from 'react';
import * as ReactDOM from "react-dom";
import {IVector} from "../vector";

function vectorToString(v: IVector){
    return `[${v.x}, ${v.y}]`
}

class Planet extends React.Component<PlanetProps> {
    constructor(){
        super();
    }

    render(){
        let style = {
            backgroundColor : this.props.color
        }

        return (
            <div className="planet-control" style={style}>
                P: {vectorToString(this.props.position)} V: {vectorToString(this.props.position)} m: {this.props.mass} <button>Remove</button>
            </div>
        )
    }
}


interface PlanetProps {
    mass : number,
    position : IVector,
    velocity : IVector,
    color : string
}

export {PlanetProps, Planet}