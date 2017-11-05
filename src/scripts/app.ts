import '../styles/base.scss';
import * as PIXI from 'pixi.js';
import Game from './game';
import '../styles/base.scss';
import {initializeControls, ControlsState} from './controls/controls';

window.addEventListener('resize', (e)=> {

});

function setup(){
    // startGameLoop(stage, renderer);
    // function gameLoop(timestamp : number){
    //   renderer.render(stage);
    //   requestAnimationFrame(gameLoop);
    // }
    //
    // requestAnimationFrame(gameLoop);

    let renderer = null;

    initializeControls((state: ControlsState) => {
        renderer = PIXI.autoDetectRenderer(512, 512, {transparent: false});

        let rendererHolder = document.getElementById('renderer');
        rendererHolder.appendChild(renderer.view);

        (renderer as any).backgroundColor = 0x000000;
        let stage = new PIXI.Container();
        renderer.render(stage);

        let game = new Game(stage, renderer, state);
        game.startGameLoop();
    });


}

// PIXI.loader.load(setup);

setup();