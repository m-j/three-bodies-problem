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
        };

        return (
            <div className="planet-control" style={style}>
                P: {vectorToString(this.props.position)} V: {vectorToString(this.props.velocity)} m: {this.props.mass} <button onClick={this.props.onRemove.bind(this)}>Remove</button>
            </div>
        )
    }
}


interface PlanetProps {
    mass : number,
    position : IVector,
    velocity : IVector,
    color : string,
    onRemove? : (p: PlanetProps) => void
}

export {PlanetProps, Planet}