import * as PIXI from 'pixi.js';
import Graphics = PIXI.Graphics;
import Vector from "./vector";
import Planet from "./planet";

let planets : Planet[];

function setup(stage: PIXI.Container){
    let planet1 = new Planet(new Vector(100, 50),new Vector(2,8), 2, 0xFF0000);
    let planet2 = new Planet(new Vector(300, 200),new Vector(10,5), 5, 0x00FF00);

    stage.addChild(planet1.sprite);
    stage.addChild(planet2.sprite);

    planets = [planet1, planet2];
}

function startGameLoop(stage: PIXI.Container, renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer){
    setup(stage);

    let lastTimestamp : number = undefined;

    function gameLoop(timestamp : number){
        let timestampDelta = lastTimestamp == undefined ? 0 : (timestamp - lastTimestamp);

        planets.forEach(p => p.update(timestampDelta));

        renderer.render(stage);

        lastTimestamp = timestamp;

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
}

export default startGameLoop;