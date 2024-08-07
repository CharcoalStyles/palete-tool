import { Color } from "chroma-js";
import { Button } from "../Button";
import { useState } from "react";
import chroma from "chroma-js";
import { SubPageProps } from "./props";


export const NewPalette = ({ onNewPalette }: SubPageProps) => {
  if (!onNewPalette) throw new Error("onNewPalette is required");

  const [randomCount, setRandomCount] = useState(5);

  return (
    <div className="flex flex-col gap-4 mx-4">
      <div>
        <p className="text-lg text-sky-200">Generate a random set of colors</p>
        <div className="flex flex-row gap-4">
          <div>
            <input
              type="number"
              className="w-16 rounded-md p-2 bg-stone-200 text-stone-900"
              value={randomCount}
              onChange={(e) => setRandomCount(parseInt(e.target.value))}
            />
          </div>
          <Button
            onClick={() => {
              const newPalette = Array.from({ length: randomCount }, () =>
                chroma.random()
              );
              onNewPalette(newPalette);
            }}
          >
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
};
