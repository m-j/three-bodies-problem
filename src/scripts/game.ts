import * as PIXI from 'pixi.js';
import Graphics = PIXI.Graphics;
import Vector from "./vector";
import Planet from "./planet";

let planets : Planet[];

let centerOfMassSprite : PIXI.Graphics;

function createCrosshairSprite() {
    let size = 50;

    let centerOfMassSprite = new Graphics();
    // centerOfMassSprite.beginFill(0xFFFFFF);
    // centerOfMassSprite.drawRect(0, 0, 5, 5);
    // centerOfMassSprite.endFill();
    centerOfMassSprite.lineStyle(1,0xFFFFFF,0.5);
    centerOfMassSprite.moveTo(-size/2, 0);
    centerOfMassSprite.lineTo(size/2, 0);
    centerOfMassSprite.moveTo(0, -size/2);
    centerOfMassSprite.lineTo(0, size/2);
    centerOfMassSprite.drawCircle(0,0,size/4);

    return centerOfMassSprite;
}

function setup(stage: PIXI.Container){
    let planet1 = new Planet(new Vector(250, 250),new Vector(0,0), 100, 0xFF0000);
    let planet2 = new Planet(new Vector(300, 200),new Vector(0.001,0.01), 1, 0x00FF00);

    stage.addChild(planet1.sprite);
    stage.addChild(planet2.sprite);

    planets = [planet1, planet2];

    centerOfMassSprite = createCrosshairSprite();

    stage.addChild(centerOfMassSprite);
}

function startGameLoop(stage: PIXI.Container, renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer){
    setup(stage);

    let lastTimestamp : number = undefined;

    function gameLoop(timestamp : number){
        let timestampDelta = lastTimestamp == undefined ? 0 : (timestamp - lastTimestamp);
        let scaledTimestampDelta = timestampDelta * 50;

        planets.forEach(p => p.update(scaledTimestampDelta, planets.filter(fp => fp != p)));

        let sumOfMassPositions = planets.reduce((acc, current) => {
            let positionScaledByMass = current.position.multiply(current.mass);
            return positionScaledByMass.add(acc);
        }, new Vector(0,0));

        let sumOfMasses = planets.reduce((acc, current) => {
            return acc + current.mass;
        },0);

        let centerOfMass = sumOfMassPositions.multiply(1/sumOfMasses);
        centerOfMassSprite.position = centerOfMass.toPoint();

        renderer.render(stage);

        lastTimestamp = timestamp;

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
}

export default startGameLoop;