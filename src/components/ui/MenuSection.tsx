import { PropsWithChildren } from "react";

type MenuSectionProps = PropsWithChildren<{
  title: string;
}>;

export const MenuSection = ({ title, children }: MenuSectionProps) => (
  <div className="flex flex-col">
    <p className="text-lg text-sky-200">{title}</p>
    {children}
  </div>
);
