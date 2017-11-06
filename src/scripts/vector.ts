import Point = PIXI.Point;

interface IVector {
    x: number;
    y: number;
}

class Vector implements IVector{
    public x:number;
    public y:number;

    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
    }

    add({x, y}: Vector){
        return new Vector(this.x + x, this.y + y);
    }

    subtract({x, y}: Vector){
        return new Vector(this.x - x, this.y - y);
    }

    multiply(scalar: number){
        return new Vector(this.x * scalar, this.y * scalar);
    }

    length(){
        return Math.sqrt(this.x*this.x + this.y * this.y);
    }

    toPoint(){
        return new Point(this.x, this.y);
    }

    toVersor(){
        return this.multiply(1/this.length());
    }

    public static fromIVector(v : IVector){
        return new Vector(v.x, v.y);
    }
}

export {Vector, IVector};