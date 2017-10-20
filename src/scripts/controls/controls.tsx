import * as React from 'react';
import * as ReactDOM from "react-dom";
import * as _ from 'lodash';
import {IVector} from "../vector";
import {VectorInput, VectorInputProps} from "./vector-input";

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
        this.setState(oldState => {
            let newPlanets = _.clone(oldState.planets);
            newPlanets.push(oldState.newPlanet);
            return {planets: newPlanets};
        });
    }

    onNewPlanetPositionChanged(newValue:any){
        this.setState((prevState) => {
            return _.merge({}, prevState, {
                newPlanet : {
                    position: newValue
                }
            })
        });
    }

    onNewPlanetVelocityChanged(newValue:any){
        this.setState((prevState) => {
            return _.merge({}, prevState, {
                newPlanet : {
                    velocity: newValue
                }
            })
        });
    }

    onNewPlanetMassChange({target}:any){
        let newMass = parseFloat(target.value);
        this.setState((prevState) => {
            return _.merge({}, prevState, {
                newPlanet : {
                    mass: newMass
                }
            })
        });
    }

    onNewPlanetColorChange({target}:any){
        let newColor = parseInt(target.value);
        this.setState((prevState) => {
            return _.merge({}, prevState, {
                newPlanet : {
                    color: newColor
                }
            })
        });
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
                        <VectorInput value={this.state.newPlanet.position} onValueChanged={this.onNewPlanetPositionChanged.bind(this)}/>
                    </div>
                    <div>
                        velocity:
                        <VectorInput value={this.state.newPlanet.velocity} onValueChanged={this.onNewPlanetVelocityChanged.bind(this)}/>
                    </div>
                    <div>
                        mass: <input value={this.state.newPlanet.mass} onChange={this.onNewPlanetMassChange.bind(this)}/>
                        color: <input value={this.state.newPlanet.color} onChange={this.onNewPlanetColorChange.bind(this)}/>
                    </div>
                    <div>
                        <button onClick={this.addPlanet.bind(this)}>Add planet</button>
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