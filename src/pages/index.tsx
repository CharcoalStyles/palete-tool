import { PaletteAddItem } from "@/components/PaletteAddItem";
import { PaletteItem } from "@/components/PaletteItem";
import chroma, { Color } from "chroma-js";
import { Josefin_Sans } from "next/font/google";
import { Fragment, useState } from "react";

const josefin = Josefin_Sans({ subsets: ["latin"] });

export default function Home() {
  const [colors, setColors] = useState<Color[]>([
    chroma("red"),
    chroma("blue"),
    chroma("green"),
    chroma("yellow"),
    chroma("orange"),
    chroma("purple"),
    chroma("violet"),
  ]);

  return (
    <main
      className={`bg-slate-900 flex flex-row gap-8 h-screen w-screen p-8 ${josefin.className}`}
    >
      <div className="flex-grow">
        <div className="flex flex-row justify-between border-b-2 border-violet-200 mb-4">
          <h1 className="text-5xl font-bold text-violet-200">Palette Tool</h1>
        </div>
      </div>
      <div className="flex flex-row overflow-auto">
        <div className="max-h-full min-w-40 my-10">
          <div className="flex-grow flex flex-col flex-wrap gap-1">
            <PaletteAddItem
              onClick={() => {
                const newColor = chroma.random();
                setColors([newColor, ...colors]);
              }}
            />
            {colors.map((color, index) => {
              console.log(color.hex());
              return (
                <Fragment key={color.hex()}>
                  <PaletteItem color={color} />
                  {index !== colors.length - 1 && (
                    <PaletteAddItem
                      onClick={() => {
                        const newColor = chroma.mix(color, colors[index + 1]);
                        setColors([
                          ...colors.slice(0, index + 1),
                          newColor,
                          ...colors.slice(index + 1),
                        ]);
                      }}
                    />
                  )}
                </Fragment>
              );
            })}
            <PaletteAddItem
              onClick={() => {
                const newColor = chroma.random();
                setColors([...colors, newColor]);
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
