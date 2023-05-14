import React from "react";

const coinFlipSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      viewBox="0 0 100 100"
      y="0"
      x="0"
      xmlns="http://www.w3.org/2000/svg"
      id="coin-flip"
      version="1.1"
      className="coin-flip-svg"
      {...props}
    >
      <g className="ldl-scale">
        <g className="ldl-ani">
          <g className="ldl-layer">
            <g className="ldl-ani">
              <circle fill="#f8b26a" r="40" cy="50" cx="50"></circle>
            </g>
          </g>
          <g className="ldl-layer">
            <g className="ldl-ani">
              <circle fill="#f5e6c8" r="32.5" cy="50" cx="50"></circle>
            </g>
          </g>
          <g className="ldl-layer">
            <g className="ldl-ani">
              <g>
                <g className="ldl-layer">
                  <g className="ldl-ani">
                    <path
                      className="sen-icon"
                      fill="#f8b26a"
                      d="M129.6,62.3c-13.4-7.2-24.5,0-27.9,6.5c-3,5.6-2.6,12.8-1.4,18.4c-19.7,2.8-35.5,6.6-38.4,19.2
								c-5.6,24.2,14.5,33.5,14.5,33.5c14.7,7.7,28.1,2.3,35-4c2-1.8,3.5-3.8,4.6-5.9c3-5.3,4-11.4,3.2-17.4
								c-0.7-5.4-3.1-12.4-7.6-22.3c-0.5-1.1-0.9-2.1-1.3-3.1c13.4-1,20.8-0.6,26.5-8.8C138.9,75.5,140,67.8,129.6,62.3L129.6,62.3z
								 M104.3,126c-7.2,8.8-20.1,4.1-23.1,2.4c-0.5-0.3-1-0.5-1.5-0.8c-2.8-1.3-11-9-6.5-20.9c3.5-9.3,19.2-15.9,27.9-17.7
								c1.5,5.1,4.3,10.9,5.7,15.2C111.4,118.8,104.3,126,104.3,126L104.3,126z M109.3,85c0-14.8,11.8-22.8,17.2-16.6
								C135.3,78.6,114.1,85.1,109.3,85z"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>

          <g className="ldl-layer">
            <g className="ldl-ani">
              <path
                fill="#FFDB2C"
                opacity="0.6"
                d="M50 10c.07 0 .139.005.208.005v79.99c-.069 0-.138.005-.208.005-22.091 0-40-17.909-40-40s17.909-40 40-40z"
                //style="fill: rgb(245, 225, 105);"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default coinFlipSVG;
