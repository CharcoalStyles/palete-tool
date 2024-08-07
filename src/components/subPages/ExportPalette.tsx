import { Color } from "chroma-js";
import { Image } from "image-js";
import { Button } from "../Button";
import { SubPageProps } from "./props";

export const ExportPalette = ({ currentPalette }: SubPageProps) => {
  if (!currentPalette) throw new Error("currentPalette is required");

  if (currentPalette.length === 0)
    return (
      <div className="flex flex-col gap-4 mx-4">
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
          value={currentPalette.map((color) => color.hex()).join(", ")}
        />
      </div>
      <div>
        <p className="text-lg text-sky-200">PNG Image</p>
        <div className="flex flex-row gap-2">
          <Button
            onClick={() => {
              const link = document.createElement("a");
              link.download = "palette1x.png";
              link.href = generateImage(currentPalette, 1);
              link.click();
            }}
          >
            1x
          </Button>
          <Button
            onClick={() => {
              const link = document.createElement("a");
              link.download = "palette1x.png";
              link.href = generateImage(currentPalette, 8);
              link.click();
            }}
          >
            8x
          </Button>
          <Button
            onClick={() => {
              const link = document.createElement("a");
              link.download = "palette1x.png";
              link.href = generateImage(currentPalette, 32);
              link.click();
            }}
          >
            32x
          </Button>
        </div>
      </div>
    </div>
  );
};

const generateImage = (palette: Array<Color>, size: number) => {
  const img = new Image(palette.length * size, size);

  palette.forEach((color, i) => {
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        img.setPixelXY(i * size + x, y, color.rgb());
      }
    }
  });

  return img.toDataURL();
};
