
const MAX_ITERATION = 80
function mandelbrot(c) {
    let z = { x: 0, y: 0 }, n = 0, p, d;
    do {
        p = {
            x: Math.pow(z.x, 2) - Math.pow(z.y, 2),
            y: 2 * z.x * z.y
        }
        z = {
            x: p.x + c.x,
            y: p.y + c.y
        }
        d = Math.sqrt(Math.pow(z.x, 2) + Math.pow(z.y, 2))
        n += 1
    } while (d <= 2 && n < MAX_ITERATION)
    return [n, d <= 2]
}

const REAL_SET = { start: -2, end: 1 }
const IMAGINARY_SET = { start: -1, end: 1 }
const HEIGHT = 80;
const WIDTH = 50;
const nrOfColors = 3


export function generate() {
    const result = new Array(WIDTH);
    for (let i = 0; i < WIDTH; i++) {
        result[i] = new Array(HEIGHT);
        for (let j = 0; j < HEIGHT; j++) {
            const complex = {
                x: REAL_SET.start + (i / WIDTH) * (REAL_SET.end - REAL_SET.start),
                y: IMAGINARY_SET.start + (j / HEIGHT) * (IMAGINARY_SET.end - IMAGINARY_SET.start)
            }

            const [m, isMandelbrotSet] = mandelbrot(complex);

            result[i][j] = isMandelbrotSet ? 0 : (m % nrOfColors - 1) + 1;
        }
    }

    return result;
}