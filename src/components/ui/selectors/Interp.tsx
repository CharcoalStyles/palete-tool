import chroma, { Color } from "chroma-js";
import { useEffect, useState } from "react";
import { Slider } from "../slider";
import { on } from "events";

type InterpProps = {
  startColor: Color;
  endColor: Color;
  onChange: (colors: Array<Color>) => void;
  onSubmit: (colors: Array<Color>) => void;
};

export const Interp = ({ startColor, endColor, onChange, onSubmit }: InterpProps) => {
  const [steps, setSteps] = useState(5);
  const [colors, setColors] = useState<Array<Color>>([]);

  useEffect(() => {
    const newColors = Array.from({ length: steps }, (_, i) => {
      const percent = i / (steps - 1);
      return startColor.mix(endColor, percent);
    });
    setColors(newColors);
    onChange(newColors.slice(1, -1));
  }, [steps, startColor, endColor]);

  return (
    <div>
      <div className="flex flex-row gap-4">
        <p className="text text-white w-20">Steps { steps - 2 }</p>
      <Slider value={[steps]} min={3} max={15} onValueChange={(val) => setSteps(val[0])} />
      </div>
    <div className="flex flex-row gap-2 w-full">
      {colors.map((color, i) => {
        const firstOrLast = i === 0 || i === colors.length - 1;

        const textColor =
          chroma.contrast(color, "white") < 4.5
            ? chroma("black")
            : chroma("white");

        return (
          <div key={i} className={`${firstOrLast ? "w-4" : "flex-grow"}`}>
            <div className={`h-16 rounded-md ${firstOrLast ? "w-4" : "w-full"}`}>
              <div
                className="w-full h-full rounded-md text-center center flex flex-col items-center justify-center"
                style={{ background: color.hex(), color: textColor.hex() }}
              >
              {firstOrLast ? '' : color.hex()}</div>
            </div>
            {/* <div className="flex flex-col">
          <p className="text-lg text-sky-200">
            {color.hex()}
          </p>
          <p className="text-sm text-stone-200">
            {color.rgb().join(", ")}
          </p>
        </div> */}
          </div>
        );
      })}
    </div>
    </div>
  );
};
