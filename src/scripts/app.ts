import '../styles/base.scss';
import * as PIXI from 'pixi.js';
import startGameLoop from './game';
import '../styles/base.scss';

let renderer = PIXI.autoDetectRenderer(512, 512, {transparent: false});

let rendererHolder = document.getElementById('renderer');
rendererHolder.appendChild(renderer.view);

(renderer as any).backgroundColor = 0x000000;
let stage = new PIXI.Container();

renderer.render(stage);

function setup(){
    startGameLoop(stage, renderer);
    // function gameLoop(timestamp : number){
    //   renderer.render(stage);
    //   requestAnimationFrame(gameLoop);
    // }
    //
    // requestAnimationFrame(gameLoop);
}

// PIXI.loader.load(setup);

setup();