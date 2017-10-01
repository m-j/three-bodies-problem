import Point = PIXI.Point;
import Graphics = PIXI.Graphics;
import Vector from "./vector";

const G = 6.67 * Math.pow(10, -5);

// dv = G * (m2 / (r * r)) * e_versor * dt

class Planet{
    private readonly mass: number;
    readonly sprite : Graphics;
    protected position : Vector;
    protected velocity : Vector;

    constructor(position: Vector, velocity: Vector, mass: number, color: number){
        this.position = position;
        this.velocity = velocity;
        this.mass = mass;

        var sprite = new Graphics();
        sprite.beginFill(color);
        sprite.drawCircle(0, 0, 12);
        sprite.endFill();
        sprite.position = position.toPoint();
        this.sprite = sprite;
    }

    update(timestampDelta: number, otherPlanets: Planet[]){
        let dvSum = otherPlanets.reduce((acc, p) => {
            let thisToOther = p.position.subtract(this.position);
            let r = thisToOther.length();
            let dv = thisToOther.toVersor().multiply(G * (p.mass / (r * r)) * timestampDelta);
            return dv.add(acc);
        }, new Vector(0,0));


        this.velocity = this.velocity.add(dvSum);

        this.position = this.position.add(this.velocity.multiply(timestampDelta));
        this.sprite.position = this.position.toPoint();
    }
}

export default Planet;