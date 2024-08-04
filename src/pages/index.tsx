import { Button } from "@/components/Button";
import { PaletteAddItem } from "@/components/PaletteAddItem";
import { PaletteItem } from "@/components/PaletteItem";
import chroma, { Color } from "chroma-js";
import { Josefin_Sans } from "next/font/google";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { NewPalette } from "@/components/subPages/NewPalette";
import { ExportPalette } from "@/components/subPages/ExportPalette";

const josefin = Josefin_Sans({ subsets: ["latin"] });

type MenuItem = {
  name: string;
  onClick: () => void;
  active: boolean;
};

const menus = ["New Palette", "Export Palette"];

const menuSwitch: (
  thisKey: string
) => (prevState: Record<string, MenuItem>) => Record<string, MenuItem> = (
  thisKey
) => {
  return (prevState) => {
    return Object.keys(prevState).reduce((acc, cur) => {
      if (cur === thisKey) {
        return {
          ...acc,
          [cur]: {
            ...prevState[cur],
            active: !prevState[cur].active,
          },
        };
      }
      return {
        ...acc,
        [cur]: {
          ...prevState[cur],
          active: false,
        },
      };
    }, prevState);
  };
};

export default function Home() {
  const [colors, setColors] = useState<Color[]>([]);
  const [animationParent] = useAutoAnimate();

  const [menuState, setMenuState] = useState<Record<string, MenuItem>>(
    menus.reduce((acc, cur) => {
      return {
        ...acc,
        [cur]: {
          name: cur,
          onClick: () => {
            setMenuState(menuSwitch(cur));
          },
          active: false,
        },
      };
    }, {})
  );

  return (
    <main
      className={`bg-stone-900 flex flex-row gap-8 h-screen w-screen pt-8 pb-4 px-4 ${josefin.className}`}>
      <div className="flex-grow flex flex-col gap-4">
        <div className="flex flex-row justify-between border-b-2 border-sky-200">
          <h1 className="text-5xl font-bold text-sky-200">Palette Tool</h1>
        </div>
        <div className="flex flex-row flex-wrap gap-2 pb-4 border-b border-sky-200">
          {Object.keys(menuState).map((key) => {
            const item = menuState[key];
            return (
              <Button
                key={key}
                variant={item.active ? "secondary" : "secondary-outline"}
                onClick={item.onClick}>
                {item.name}
              </Button>
            );
          })}
        </div>
        <div ref={animationParent} className="flex-grow">
          {menus.map((menu) => {
            let component: React.ReactNode;

            switch (menu) {
              case "New Palette":
                component = <NewPalette />;
                break;
              case "Export Palette":
                component = <ExportPalette palette={colors} />;
                break;
            }

            return menuState[menu].active ? (
              <div
                key={menu}
                className={`${
                  menuState[menu].active
                    ? "left-0 opacity-100"
                    : "-left-full opacity-0"
                }  h-full transition-all duration-500 ease-in-out`}>
                {component}
              </div>
            ) : null;
          })}
        </div>
      </div>
      <div className="flex flex-row overflow-auto">
        <div className="max-h-full min-w-40 mt-8">
          <div className="flex-grow flex flex-col flex-wrap gap-1">
            <PaletteAddItem
              onClick={() => {
                const newColor = chroma.random();
                setColors([newColor, ...colors]);
              }}
            />
            {colors.map((color, index) => (
              <>
                <PaletteItem key={color.hex()} color={color} onDelete={() => {
                  setColors(colors.filter(c => c.hex() !== color.hex()))
                }} />
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
            {colors.length > 0 && (
              <PaletteAddItem
                onClick={() => {
                  const newColor = chroma.random();
                  setColors([...colors, newColor]);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
