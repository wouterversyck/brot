import { create, colors } from "../drawer.js";

const colorsMap = {
    0: colors.BLACK,
    1: colors.WHITE,
}

export const draw = create(colorsMap);
