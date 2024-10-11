import chalk from "chalk";
import terminalSize from "terminal-size";

// Use bottom half of char symbol to render 2 pixels per char
const char = '▄';

export const colors = {
    'BLACK': {
        bg: chalk.bgBlack,
        char: chalk.black,
    },
    'GREEN': {
        bg: chalk.bgGreen,
        char: chalk.green,
    },
    'BLUE': {
        bg: chalk.bgBlue,
        char: chalk.blue,
    },
    'YELLOW': {
        bg: chalk.bgYellow,
        char: chalk.yellow,
    },
    'WHITE': {
        bg: chalk.bgWhite,
        char: chalk.white,
    }
}

export const getTerminalSize = () => {
    let size = terminalSize();

    // We draw 2 pixels per row so multiply by 2, this does not 100% fit for now so we subtract by some pixels
    // For now rows need to be an even number (check validate), so by multiplying by 2 and subtracting by an even number the rows will always be even
    let rowsDoubleDrawn = (size.rows * 2) - 4;
    return {
        columns: size.columns,
        rows: rowsDoubleDrawn,
    }
};

function validate (img) {
    if (img.length % 2 !== 0) {
        throw Error('Image must have an even number of rows');
    }
}

export function create(colorsMap) {
    return (img) => {
        validate(img);
        let log = "";
        for (let i = 0; i < img.length; i += 2) {
            let line = "";
            for (let j = 0; j < img[i].length; j++) {
                const topValue = img[i][j];
                const bottomValue = img[i + 1][j];
                line += `${colorsMap[topValue].bg(colorsMap[bottomValue].char(char))}`;
            }
            log += line + "\n";
        }
        console.clear();
        console.log(log);
    }
}
