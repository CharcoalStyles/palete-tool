import { Color } from "chroma-js";
import { useEffect, useState } from "react";

type InterpProps = {
  startColor: Color;
  endColor: Color;
  onSubmit: (colors: Array<Color>) => void;
}

export const Interp = ({ startColor, endColor, onSubmit }: InterpProps) => {
  const [steps, setSteps] = useState(3);
  const [colors, setColors] = useState<Array<Color>>([]);

  useEffect(() => {
    const newColors = Array.from({ length: steps }, (_, i) => {
      const percent = i / (steps - 1);
      return startColor.mix(endColor, percent);
    });
    setColors(newColors);
  }, [steps, startColor, endColor]);

  return <div className="flex flex-col gap-4">
    {colors.map((color, i) => (
      <div key={i} className="flex flex-row gap-2">
        <div className="w-16 h-16 rounded-md border border-slate-400 p-2">
          <div
            className="w-full h-full rounded-md"
            style={{ background: color.hex() }}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-lg text-sky-200">
            {color.hex()}
          </p>
          <p className="text-sm text-stone-200">
            {color.rgb().join(", ")}
          </p>
        </div>
      </div>
    ))}
  </div>
}