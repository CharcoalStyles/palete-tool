import chroma, { Color } from "chroma-js";
import { useEffect, useState } from "react";
import { Josefin_Sans } from "next/font/google";
import { Interp } from "@/components/ui/selectors/Interp";

const josefin = Josefin_Sans({ subsets: ["latin"] });

const getTextColor = (color: Color) =>
  chroma.contrast(color, "white") < 4.5 ? chroma("black") : chroma("white");

export default function Home() {
  const [startColor, setStartColor] = useState<Color>(chroma.random());
  const [endColor, setEndColor] = useState<Color>(chroma.random());

  const [startColorText, setStartColorText] = useState<string>(startColor.hex());
  const [endColorText, setEndColorText] = useState<string>(endColor.hex());

  useEffect(() => {
    if (chroma.valid(startColorText)) {
      setStartColor(chroma(startColorText));
    }
  }, [startColorText]);

  useEffect(() => {
    if (chroma.valid(endColorText)) {
      setEndColor(chroma(endColorText));
    }
  }, [endColorText]);

  return (
    <main
      className={`bg-stone-900 flex flex-row gap-8 h-screen w-screen pt-8 pb-4 px-4 ${josefin.className}`}>
      <div className="flex-grow flex flex-col gap-4">
        <div className="flex flex-row justify-between border-b-2 border-sky-200">
          <h1 className="text-5xl font-bold text-sky-200">
            What I really needed
          </h1>
        </div>
        <div className="flex flex-col flex-wrap gap-2 pb-4">
          <div className="flex flex-row gap-2">
            <div className="flex flex-col gap-2">
              <p className="text-sky-200">Start Colour</p>
              <div
                className="w-32 h-16 text-xl font-bold flex flex-col items-center justify-center"
                style={{
                  backgroundColor: startColor.hex(),
                  color: getTextColor(startColor).hex(),
                }}>
                <input
                  className="w-full bg-inherit text-center"
                  type="text"
                  value={startColorText}
                  onChange={(e) => {
                    setStartColorText(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sky-200">End Colour</p>
              <div
                className="w-32 h-16 text-xl font-bold flex flex-col items-center justify-center"
                style={{
                  backgroundColor: endColor.hex(),
                  color: getTextColor(endColor).hex(),
                }}>
                <input
                  className="w-full bg-inherit text-center"
                  type="text"
                  value={endColorText}
                  onChange={(e) => {
                    setEndColorText(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <Interp startColor={startColor} endColor={endColor} onChange={() => {}} onSubmit={() => {}} />
        </div>
      </div>
    </main>
  );
}
