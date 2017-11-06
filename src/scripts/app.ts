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
    let game : Game = null;

    initializeControls((state: ControlsState) => {
        if(state.simulationStarted){
            game.stopGameLoop();
            game = null;
            renderer = null;
            document.getElementById('renderer').innerHTML = '';
        }
        else {
            renderer = PIXI.autoDetectRenderer(512, 512, {transparent: false});

            let rendererHolder = document.getElementById('renderer');
            rendererHolder.appendChild(renderer.view);

            (renderer as any).backgroundColor = 0x000000;
            let stage = new PIXI.Container();
            renderer.render(stage);

            game = new Game(stage, renderer, state);
            game.startGameLoop();
        }

    });


}

// PIXI.loader.load(setup);

setup();