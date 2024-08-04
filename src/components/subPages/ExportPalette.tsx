import { Color } from "chroma-js";
import { useEffect, useState } from "react";
import { Image } from "image-js";

type ExportPaletteProps = {
  palette: Array<Color>;
};

export const ExportPalette = ({ palette }: ExportPaletteProps) => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (palette.length === 0) return;
    const img = new Image(palette.length, 1);

    palette.forEach((color, i) => {
      img.setPixel(i, color.rgb());
    });

    setImage(img.toDataURL());
  }, [palette]);

  if (palette.length === 0)
    return (
      <div>
        <p className="text-lg text-sky-200">No colors added yet</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 mx-4">
      <div>
        <p className="text-lg text-sky-200">
          Comma separated list of hex colors
        </p>
        <textarea
          className="w-full h-32 p-2 bg-stone-200 text-stone-900"
          value={palette.map((color) => color.hex()).join(", ")}
        />
      </div>
      <div>
        <p className="text-lg text-sky-200">Image</p>
        <img src={image} alt="Palette image" className="h-4" />
      </div>
    </div>
  );
};
