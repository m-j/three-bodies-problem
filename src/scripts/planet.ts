import Point = PIXI.Point;
import Graphics = PIXI.Graphics;
import Vector from "./vector";

const G = 6.67 * Math.pow(10, -5);
const maxTimestampDelta = 5;

// dv = G * (m2 / (r * r)) * e_versor * dt

class Planet{
    public readonly mass: number;
    readonly sprite : Graphics;
    public position : Vector;
    public velocity : Vector;

    constructor(position: Vector, velocity: Vector, mass: number, color: number){
        this.position = position;
        this.velocity = velocity;
        this.mass = mass;

        let radius = Math.pow(mass * 10, 1/3);

        var sprite = new Graphics();
        sprite.beginFill(color);
        sprite.drawCircle(0, 0, radius);
        sprite.endFill();
        sprite.position = position.toPoint();
        this.sprite = sprite;
    }

    update(timestampDelta: number, otherPlanets: Planet[]){

        let timestampLeft = timestampDelta;

        while(timestampLeft > 0){
            let timestampDeltaForStep = Math.min(timestampLeft, maxTimestampDelta);
            timestampLeft -= timestampDeltaForStep;

            let dvSum = otherPlanets.reduce((acc, p) => {
                let thisToOther = p.position.subtract(this.position);
                let r = thisToOther.length();
                let dv = thisToOther.toVersor().multiply(G * (p.mass / (r * r)) * timestampDeltaForStep);
                return dv.add(acc);
            }, new Vector(0,0));

            this.velocity = this.velocity.add(dvSum);
            this.position = this.position.add(this.velocity.multiply(timestampDeltaForStep));
        }


        this.sprite.position = this.position.toPoint();
    }
}

export default Planet;