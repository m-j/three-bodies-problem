import '../styles/base.scss';
import * as PIXI from 'pixi.js';

const bombaPath = 'assets/kapitan-bomba-popiersie.png';
const rockPath = 'assets/skala.png';

PIXI.loader
    .add(bombaPath)
    .add(rockPath)
    .load(setup);

let renderer = PIXI.autoDetectRenderer(512, 512, {transparent: true});

let rendererHolder = document.getElementById('renderer');
rendererHolder.appendChild(renderer.view);

(renderer as any).backgroundColor = 0x000000;
let stage = new PIXI.Container();

renderer.render(stage);

function setup(){
    let bombaSprite = new PIXI.Sprite(PIXI.loader.resources[bombaPath].texture);
    let rockSprite = new PIXI.Sprite(PIXI.loader.resources[rockPath].texture);

    bombaSprite.position.set(210, 160);
    bombaSprite.scale.x = .5;
    bombaSprite.scale.y = .5;
    bombaSprite.rotation = Math.PI * 0.2;
    bombaSprite.anchor.x = 0.5;
    bombaSprite.anchor.y = 1;

    rockSprite.x = 100;
    rockSprite.y = 100;

    stage.addChild(bombaSprite);
    stage.addChild(rockSprite);
    renderer.render(stage);

    let bombaRotationAxis = 0;

    function gameLoop(timestamp : number){
        bombaSprite.rotation = Math.PI * Math.sin(timestamp/1000) * 0.25;
        renderer.render(stage);

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
}