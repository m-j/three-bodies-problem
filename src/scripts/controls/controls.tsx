import * as React from 'react';
import * as ReactDOM from "react-dom";
import * as _ from 'lodash';
import {IVector} from "../vector";

const dupa = 'dupa';

class Planet extends React.Component {
    render(){
        return (
            <div className="planet-control">
                P: [1,2] V: [5,6] m: 123 <button>Remove</button>
            </div>
        )
    }
}


interface VectorInputProps {
    onValueChanged : any,
    value : IVector
}

class VectorInput extends React.Component<VectorInputProps> {
    constructor(props:any){
        super(props);
        this.setState({x:0, y:0});
    }

    handleChange({target}:any){
        let value = target.value;
        let name = target.name;

        // this.setState({[name] :value});
        this.props.value
    }

    render(){
        return (
            <span>x:<input name="x" value={this.props.value.x} onChange={this.handleChange} /> y: <input name="y" value={this.props.value.y} onChange={this.handleChange}/></span>
        )
    }
}

interface PlanetState {
    mass : number,
    position : IVector,
    velocity : IVector,
    color : number
}

interface ControlsState {
    speed: number,
    newPlanet?: PlanetState
    planets : [PlanetState]
}

class Controls extends React.Component<any,ControlsState> {
    constructor(){
        super();
        this.state = {
            speed: 1,
            newPlanet : {
                position: {x: 50, y: 50},
                velocity: {x: 1, y: 2},
                color: 0x00FFFF,
                mass: 50
            },
            planets: [
                {
                    position : {x:50, y:50},
                    velocity : {x:1,y:2},
                    color: 0x00FFFF,
                    mass : 50,
                },
                {
                    position : {x:50,y:50},
                    velocity : {x:1,y:2},
                    color: 0x00FFFF,
                    mass : 50,
                }
            ]
        } as ControlsState;
    }

    componentDidMount(){

    }

    addPlanet(){

    }

    onNewPlanetPositionChanged(){

    }

    onNewPlanetVelocityChanged(){

    }

    render(){
        return (
            <div>
                <h1>Three bodies problem</h1>
                <button>Start simulation</button>
                Speed: <input/>
                <div>
                    <h2>Add planet</h2>
                    <div>
                        position:
                        <VectorInput value={this.state.newPlanet.position} onValueChanged={this.onNewPlanetPositionChanged}/>
                    </div>
                    <div>
                        velocity:
                        <VectorInput value={this.state.newPlanet.velocity} onValueChanged={this.onNewPlanetVelocityChanged}/>
                    </div>
                    <div>
                        mass: <input/> color: <input/>
                    </div>
                    <div>
                        <button onClick={this.addPlanet}>Add planet</button>
                    </div>
                </div>
                <div>
                    <h2>Planets</h2>
                    <div>
                        {this.state.planets.map((p) => {
                            return (<div>{p.mass}</div>)
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

function initializeControls(){
    ReactDOM.render(<Controls/>,
        document.getElementById('controls'));
}

export {initializeControls};