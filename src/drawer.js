import chalk from "chalk";

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
