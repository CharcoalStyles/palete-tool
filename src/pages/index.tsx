import { Button } from "@/components/Button";
import { PaletteAddItem } from "@/components/PaletteAddItem";
import { PaletteItem } from "@/components/PaletteItem";
import chroma, { Color } from "chroma-js";
import { Josefin_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { NewPalette } from "@/components/subPages/NewPalette";
import { ExportPalette } from "@/components/subPages/ExportPalette";
import { NewColor } from "@/components/subPages/NewColor";

const josefin = Josefin_Sans({ subsets: ["latin"] });

type SubPage = {
  menu?: { name: string; onClick: () => void };
  active: boolean;
};

const subPages = [
  {
    title: "New Palette",
    inMenu: true,
  },
  {
    title: "Export Palette",
    inMenu: true,
  },
  {
    title: "New Color",
    inMenu: false,
  },
];

const menuSwitch: (
  thisKey: string,
  force?: boolean
) => (prevState: Record<string, SubPage>) => Record<string, SubPage> = (
  thisKey,
  force
) => {
  return (prevState) => {
    return Object.keys(prevState).reduce((acc, cur) => {
      if (cur === thisKey) {
        return {
          ...acc,
          [cur]: {
            ...prevState[cur],
            active: force ? true : !prevState[cur].active,
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
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>();
  const [animationParent] = useAutoAnimate();
  const [tempInsertColors, setTempInsertColors] = useState<Color[]>();

  const [menuState, setMenuState] = useState<Record<string, SubPage>>(
    subPages.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.title]: {
          menu: cur.inMenu
            ? {
                name: cur.title,
                onClick: () => setMenuState(menuSwitch(cur.title)),
              }
            : undefined,
          active: false,
        },
      };
    }, {} as Record<string, SubPage>)
  );
  
  useEffect(() => {
    setTempInsertColors(undefined);
  }, [menuState]);

  return (
    <main
      className={`bg-stone-900 flex flex-row gap-8 h-screen w-screen pt-8 pb-4 px-4 ${josefin.className}`}
    >
      <div className="flex-grow flex flex-col gap-4">
        <div className="flex flex-row justify-between border-b-2 border-sky-200">
          <h1 className="text-5xl font-bold text-sky-200">Palette Tool</h1>
        </div>
        <div className="flex flex-row flex-wrap gap-2 pb-4 border-b border-sky-200">
          {Object.keys(menuState).map((key) => {
            const item = menuState[key];

            if (!item.menu) return null;

            return (
              <Button
                key={key}
                variant={item.active ? "secondary" : "secondary-outline"}
                onClick={() => {
                  item.menu!.onClick();
                }}
              >
                {item.menu!.name}
              </Button>
            );
          })}
        </div>
        <div ref={animationParent} className="flex-grow">
          {subPages.map((menu) => {
            return menuState[menu.title].active ? (
              <div
                key={menu.title}
                className={"h-full transition-all duration-500 ease-in-out"}
              >
                {menu.title === "New Palette" && (
                  <NewPalette
                    onNewPalette={(newPalette) => {
                      setColors(newPalette);
                      setMenuState(menuSwitch("New Palette"));
                    }}
                    currentPalette={colors}
                  />
                )}
                {menu.title === "Export Palette" && (
                  <ExportPalette currentPalette={colors} />
                )}
                {menu.title === "New Color" &&
                  selectedColorIndex !== undefined && (
                    <NewColor
                      currentPalette={colors}
                      selectedColorIndex={selectedColorIndex}
                      onTempInsertColors={(newColors) => {
                        setTempInsertColors(newColors);
                      }}
                      onInsertColors={(newColors) => {
                        setColors([
                          ...(selectedColorIndex === -1
                            ? []
                            : colors.slice(0, selectedColorIndex)),
                          ...newColors,
                          ...colors.slice(selectedColorIndex + 1),
                        ]);
                        setMenuState(menuSwitch("New Color"));
                      }}
                    />
                  )}
              </div>
            ) : null;
          })}
        </div>
      </div>
      <div className="flex flex-row overflow-auto">
        <div className="max-h-full min-w-40 mt-8">
          <div className="flex-grow flex flex-col flex-wrap gap-1">
            <PaletteAddItem
              tempColors={
                selectedColorIndex === -1 ? tempInsertColors : undefined
              }
              onClick={() => {
                setSelectedColorIndex(-1);
                setMenuState(menuSwitch("New Color", true));
              }}
            />
            {colors.map((color, index) => (
              <>
                <PaletteItem
                  key={color.hex()}
                  color={color}
                  onDelete={() => {
                    setColors(colors.filter((c) => c.hex() !== color.hex()));
                    setMenuState(menuSwitch("New Color"));
                  }}
                  onEdit={() => {
                    const newColor = chroma.random();
                    setColors([
                      ...colors.slice(0, index),
                      newColor,
                      ...colors.slice(index + 1),
                    ]);
                  }}
                />
                {index !== colors.length - 1 && (
                  <PaletteAddItem
                    tempColors={
                      selectedColorIndex === index
                        ? tempInsertColors
                        : undefined
                    }
                    onClick={() => {
                      setSelectedColorIndex(index);
                      setMenuState(menuSwitch("New Color", true));
                    }}
                  />
                )}
              </>
            ))}
            {colors.length > 0 && (
              <PaletteAddItem
                tempColors={
                  selectedColorIndex === colors.length - 1
                    ? tempInsertColors
                    : undefined
                }
                onClick={() => {
                  setSelectedColorIndex(colors.length - 1);
                  setMenuState(menuSwitch("New Color", true));
                }}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
