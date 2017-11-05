import * as React from 'react';
import * as ReactDOM from "react-dom";
import * as _ from 'lodash';
import {IVector} from "../vector";
import {VectorInput, VectorInputProps} from "./vector-input";
import {Planet, PlanetProps} from './planet';

const dupa = 'dupa';



function numberToColor(n: number){
    return '#' + n.toString(16);
}

function parseHexColor(s: string){
    return parseInt(s.replace('#', ''), 16);
}



interface ControlsState {
    speed: number,
    newPlanet?: PlanetProps
    planets : [PlanetProps]
}

type startCallback = (c: ControlsState) => (void);

interface ControlsProps {
    onSimulationStart : startCallback
}

class Controls extends React.Component<ControlsProps, ControlsState> {
    constructor(){
        super();
        this.state = {
            speed: 1,
            newPlanet : {
                position: {x: 50, y: 50},
                velocity: {x: 1, y: 2},
                color: '#FFFFFFFF',
                mass: 50
            },
            planets: [
                {
                    position : {x:50, y:50},
                    velocity : {x:1,y:2},
                    color: '#FFFF00FF',
                    mass : 50,
                },
                {
                    position : {x:50,y:50},
                    velocity : {x:1,y:2},
                    color: '#FF00FFFF',
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

        this.setState((prevState) => {
            return _.merge({}, prevState, {
                newPlanet : {
                    color: target.value
                }
            })
        });
    }

    render(){
        return (
            <div>
                <h1>Three bodies problem</h1>
                <button onClick={this.props.onSimulationStart.bind(this)}>Start simulation</button>
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
                            return (<div><Planet mass={p.mass} position={p.position} velocity={p.velocity} color={p.color}/></div>)
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

function initializeControls(onStart: startCallback){
    ReactDOM.render(<Controls onSimulationStart={onStart}/>,
        document.getElementById('controls'));
}

export {initializeControls, ControlsState};