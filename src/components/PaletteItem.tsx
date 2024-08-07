import Edit from "@/icons/Edit";
import Trash from "@/icons/Trash";
import chroma, { Color } from "chroma-js";
import { useState } from "react";

type PaletteItemProps = {
  color: Color;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const PaletteItem = ({ color, onDelete, onEdit }: PaletteItemProps) => {
  const textColor =
    chroma.contrast(color, "white") < 4.5 ? chroma("black") : chroma("white");

  const [hover, setHover] = useState(false);

  return (
    <div
      className="p-1 rounded-md flex flex-row"
      style={{ backgroundColor: color.hex(), color: textColor.hex() }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`${
          hover ? "opacity-100" : "opacity-0"
        } transition-opacity hover:cursor-pointer`}
      >
        <Edit onClick={() => onEdit?.()} />
      </div>
      <div className="flex-grow text-center">
        <p className="text-lg font-bold">{color.hex().toUpperCase()}</p>
      </div>
      <div
        className={`${
          hover ? "opacity-100" : "opacity-0"
        } transition-opacity hover:cursor-pointer`}
      >
        <Trash onClick={() => onDelete?.()} />
      </div>
    </div>
  );
};
