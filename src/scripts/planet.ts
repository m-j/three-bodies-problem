import Point = PIXI.Point;
import Graphics = PIXI.Graphics;
import Vector from "./vector";

const G = 6.67 * 0.00001;

class Planet{
    private readonly mass: number;
    readonly sprite : Graphics;
    private position : Vector;
    private velocity : Vector;

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

    update(timestampDelta: number){
        this.position = this.position.add(this.velocity.multiply(timestampDelta/1000));
        this.sprite.position = this.position.toPoint();
    }
}

export default Planet;