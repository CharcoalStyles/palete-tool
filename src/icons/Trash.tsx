import * as React from "react";

type SvgProps = {
  onClick?: React.MouseEventHandler<SVGSVGElement>;
};

const SvgComponent = ({ onClick }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="feather feather-trash-2"
    onClick={(e) => {
      e.stopPropagation();
      onClick?.(e);
    }}>
    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
  </svg>
);
export default SvgComponent;
