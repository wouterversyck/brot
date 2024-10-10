import { program } from 'commander';

import * as brot from './mandelbrot/index.js';
import * as life from './game_of_life/index.js';

const modesmap = {
    'brot': brot,
    'mandelbrot': brot,
    'life':  life,
    'game of life': life
}

program.option('-r, --repeat')
    .option('-m, --mode <value>', 'What to draw', 'mandelbrot')
    .parse();
const options = program.opts();

const mode = modesmap[options.mode];
if (!mode) {
    console.log(`Mode ${options.mode} not supported, supported options: ${Object.keys(modesmap).join(", ")}`)
    process.exit();
}

const drawImage = () => mode.draw(mode.generate());
const withInterval = () => {
    drawImage();
    setTimeout(withInterval, 100);
}

options.repeat ? withInterval() : drawImage();
