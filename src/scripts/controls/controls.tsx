import * as React from 'react';
import * as ReactDOM from "react-dom";
import * as _ from 'lodash';
import {IVector} from "../vector";
import {VectorInput, VectorInputProps} from "./vector-input";
import {Planet, PlanetProps} from './planet';

interface ControlsState {
    speed: number,
    simulationStarted: boolean,
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
            simulationStarted: false,
            newPlanet : {
                position: {x: 320, y: 300},
                velocity: {x: 0.01, y: 0.001},
                color: '#ff14bde2',
                mass: 0.5
            },
            planets: [
                {
                    position : {x:250, y:250},
                    velocity : {x:0,y:0},
                    color: '#fff4aa42',
                    mass : 100,
                },
                {
                    position : {x:300,y:200},
                    velocity : {x:0.001,y:0.01},
                    color: '#ff87e540',
                    mass : 1,
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

    onStartStop(){
        this.setState(prevState => {
            if(prevState.simulationStarted){
                return {
                    simulationStarted: false
                }
            }
            else {
                return {
                    simulationStarted: true
                }
            }
        });

        this.props.onSimulationStart(this.state);
    }

    onRemovePlanet(planet: PlanetProps){
        this.setState(prevState => {
           return {
               planets: prevState.planets.filter(p => p != planet)
           }
        });
    }

    render(){
        return (
            <div>
                <h1>Three bodies problem</h1>
                <button onClick={this.onStartStop.bind(this)}>{this.state.simulationStarted ? 'Stop' : 'Start'}</button>
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
                            return (<div><Planet mass={p.mass} position={p.position} velocity={p.velocity} color={p.color} onRemove={() => this.onRemovePlanet(p)}/></div>)
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