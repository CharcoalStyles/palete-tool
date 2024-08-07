import chroma, { Color } from "chroma-js";

type PaletteAddItemProps = {
  onClick: () => void;
  tempColors?: Array<Color>;
};

export const PaletteAddItem = ({
  onClick,
  tempColors,
}: PaletteAddItemProps) => {
  if (tempColors) {
    return (
      <>
        {tempColors.map((col) => (
          <div
            className="p-1 rounded-md h-3 border border-white border-dashed"
            style={{
              background: col.hex(),
            }}
          ></div>
        ))}
      </>
    );
  }

  return (
    <div
      className="p-1 rounded-md text-center h-1 hover:h-4 hover:border border-slate-400 hover:border-white border-dashed transition-all hover:cursor-pointer"
      onClick={onClick}
    >
      <p className="text-stone-200 relative bottom-3 opacity-100 hover:opacity-0 transition-opacity">
        +
      </p>
    </div>
  );
};
