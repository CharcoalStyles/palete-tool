type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "primary-outline" | "secondary-outline";
  className?: string;
};

export const Button = ({
  children,
  onClick,
  variant = "primary",
  className,
}: ButtonProps) => {
  return (
    <button
      className={(() => {
        let cn = "";
        switch (variant) {
          case "primary":
            cn = "bg-sky-200 text-stone-900 px-4 py-2 ";
            break;
          case "secondary":
            cn = "bg-stone-200 text-stone-900 px-4 py-2 ";
            break;
          case "primary-outline":
            cn = "bg-transparent text-sky-200  border-4 border-sky-200 px-3 py-1 ";
            break;
          case "secondary-outline":
            cn = "bg-transparent text-stone-200  border-4 border-stone-200 px-3 py-1";
            break;
        }
        return `${cn} font-bold rounded-md ${className}`;
      })()}
      onClick={onClick}>
      {children}
    </button>
  );
};
