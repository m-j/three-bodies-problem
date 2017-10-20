import * as React from 'react';
import * as ReactDOM from "react-dom";
import * as _ from 'lodash';
import {IVector} from "../vector";


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
        let value = parseFloat(target.value);
        let name = target.name;

        let vector = _.extend(this.props.value, {[name]: value});

        this.props.onValueChanged(vector)
    }

    render(){
        return (<span>x:<input name="x" value={this.props.value.x} onChange={this.handleChange.bind(this)} />
        y: <input name="y" value={this.props.value.y} onChange={this.handleChange.bind(this)}/></span>
    )
    }
}

export {VectorInput, VectorInputProps}