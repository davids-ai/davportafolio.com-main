import * as React from "react";
const SVGComponent: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "auto",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 50 50"
    {...props}
  >
    <g>
      <path
        style={{
          opacity: 0.989,
        }}
        fill="#000000"
        d="M23.193 2.197h0.488v45.508a3110.449 3110.449 0 0 1 -16.699 -4.004q-0.049 -18.75 0.098 -37.5a1166.504 1166.504 0 0 0 16.113 -4.004"
      />
    </g>
    <g>
      <path
        style={{
          opacity: 0.98,
        }}
        fill="#000000"
        d="M25.537 2.197a664.551 664.551 0 0 1 15.43 3.711 125.684 125.684 0 0 0 1.904 3.711q0.098 15.332 0 30.664a206.543 206.543 0 0 1 -2.002 3.76 872.949 872.949 0 0 1 -15.332 3.662zm8.301 8.691a59.18 59.18 0 0 0 2.832 0.439q0.648 0.111 0.83 0.732 0.098 12.891 0 25.781 -0.108 0.45 -0.537 0.635a30.176 30.176 0 0 1 -2.93 0.439q-0.722 0.066 -1.025 -0.586a1832.031 1832.031 0 0 1 0 -26.758q0.273 -0.544 0.83 -0.684"
      />
    </g>
  </svg>
);
export default SVGComponent;