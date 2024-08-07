import { Color } from "chroma-js";

export type SubPageProps = {
    currentPalette?: Array<Color>;
    selectedColorIndex?: number;
    onNewPalette?: (NewPalette: Array<Color>) => void;
    onInsertColors?: (colors: Array<Color>) => void;
    onTempInsertColors?: (colors: Array<Color>) => void;
}