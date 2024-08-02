import chroma, { Color } from "chroma-js";

export const PaletteItem = ({ color }: { color: Color }) => {
  const textColor = chroma.contrast(color, 'white') < 4.5 ? chroma('black') : chroma('white');

  return (
      <div
        className="p-1 rounded-md text-center"
        style={{ backgroundColor: color.hex() }}>
        <p className="text-lg font-bold"
        style={{ color: textColor.hex() }}>{ color.hex().toUpperCase() }</p>
      </div>
  );
};
