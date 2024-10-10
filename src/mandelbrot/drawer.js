import { create, colors } from "../drawer.js";

const colorsMap = {
    0: colors.BLACK,
    1: colors.GREEN,
    2: colors.BLUE,
    3: colors.YELLOW,
}

export const draw = create(colorsMap);