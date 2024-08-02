import { PaletteAddItem } from "@/components/PaletteAddItem";
import { PaletteItem } from "@/components/PaletteItem";
import chroma, { Color } from "chroma-js";
import { Josefin_Sans } from "next/font/google";
import { useState } from "react";

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
      className={`bg-slate-900 flex min-h-screen flex-col justify-between p-8 ${josefin.className}`}>
      <div className="flex flex-row justify-between border-b-2 border-violet-200 mb-4">
        <h1 className="text-5xl font-bold text-violet-200">Palette Tool</h1>
      </div>
      <div className="flex-grow flex flex-row">
        <div className="flex flex-col gap-">
          <h2 className="text-2xl font-bold text-violet-200">
            Current Palette
          </h2>
          <div className="flex flex-col gap-1">
            <PaletteAddItem
              onClick={() => {
                const newColor = chroma.random();
                setColors([newColor, ...colors]);
              }}
            />
            {colors.map((color, index) => (
              <>
                <PaletteItem key={color.hex()} color={color} />
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
              </>
            ))}
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
