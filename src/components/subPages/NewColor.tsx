import { Color } from "chroma-js";
import { SubPageProps } from "./props";
import { useEffect, useState } from "react";
import chroma from "chroma-js";
import { Slider } from "../ui/slider";

export const NewColor = ({
  currentPalette,
  selectedColorIndex,
  onInsertColors,
  onTempInsertColors,
}: SubPageProps) => {
  if (!currentPalette) throw new Error("currentPalette is required");
  if (selectedColorIndex === undefined)
    throw new Error("selectedColorIndex is required");
  if (!onInsertColors) throw new Error("onInsertColors is required");
  if (!onTempInsertColors) throw new Error("onTempInsertColors is required");

  const [newColor, setNewColor] = useState(chroma.random());
  const [textColor, setTextColor] = useState(chroma("black"));

  useEffect(() => {
    if (
      selectedColorIndex === -1 ||
      selectedColorIndex === currentPalette.length - 1
    ) {
      setNewColor(chroma.random());
    } else {
      const c = chroma.mix(
        currentPalette[selectedColorIndex],
        currentPalette[selectedColorIndex + 1],
        0.5
      );
      setNewColor(c);
    }
  }, [selectedColorIndex]);

  useEffect(() => {
    setTextColor(
      chroma.contrast(newColor, "white") < 4.5
        ? chroma("black")
        : chroma("white")
    );
  }, [newColor]);

  useEffect(() => {
    onTempInsertColors([newColor]);
  }, [newColor]);

  return (
    <div className="flex flex-col gap-4 mx-4">
      <div className="flex flex-col">
        <p className="text-lg text-sky-200">Add a new single color</p>
        <div className="flex flex-row gap-2">
          <div
            className="px-4 py-2  w-64"
            style={{ background: newColor.hex() }}
          >
            <p className="text-sm" style={{ color: textColor.hex() }}>
              RGB: {newColor.rgb().join(", ")}
            </p>
            <p className="text-sm" style={{ color: textColor.hex() }}>
              HSV: {newColor
                .hsv()
                .map((val, i) => {
                  if (i === 0) return val.toFixed(1);
                  return val.toFixed(3);
                })
                .join(", ")}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {newColor.rgb().map((c, i) => {
              var label = "";
              if (i === 0) label = "R";
              if (i === 1) label = "G";
              if (i === 2) label = "B";

              return (
                <div className="flex flex-row gap-1">
                  <p className="text-sky-200 w-3 mt-2">{label}</p>
                  <input
                    type="number"
                    value={c}
                    className="w-16 h-8 p-2"
                    min={0}
                    max={255}
                    onChange={(e) => {
                      const newColorArr = newColor.rgb();
                      newColorArr[i] = parseInt(e.target.value);
                      setNewColor(chroma(newColorArr));
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-2">
            {newColor.hsv().map((c, i) => {
              var label = "";
              if (i === 0) label = "H";
              if (i === 1) label = "S";
              if (i === 2) label = "L";

              return (
                <div className="flex flex-row gap-1">
                  <p className="text-sky-200 w-3 mt-2">{label}</p>
                  <input
                    type="number"
                    value={c}
                    className="w-24 h-8 p-2"
                    min={0}
                    max={i === 1 ? 360 : 1}
                    step={i === 1 ? 1 : 0.001}
                    onChange={(e) => {
                      const newColorArr = newColor.hsv();
                      newColorArr[i] = parseFloat(e.target.value);
                      setNewColor(chroma.hsv(newColorArr[0], newColorArr[1], newColorArr[2]));
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
