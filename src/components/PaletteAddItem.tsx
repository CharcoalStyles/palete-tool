import chroma, { Color } from "chroma-js";

export const PaletteAddItem = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="p-1 rounded-md text-center h-1 hover:h-4 hover:border border-slate-400 hover:border-white border-dashed transition-all hover:cursor-pointer"
      onClick={onClick}>
        <p className="relative bottom-3 opacity-100 hover:opacity-0 transition-opacity">+</p>
    </div>
  );
};
