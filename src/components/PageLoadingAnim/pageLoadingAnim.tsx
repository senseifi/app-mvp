import React from "react";

const pageLoadingAnim = () => {
  return (
    <div id={"globalLoader"}>
      <svg
        version="1.1"
        id="a"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 1500 500"
        xmlSpace="preserve"
        className=""
      >
        <style type="text/css">
          {`.st0{fill:#70E4CB;stroke:url(#SVGID_1_);stroke-width:6;stroke-linejoin:bevel;stroke-miterlimit:10; }
      .st1{fill:none;stroke:#FFFFFF;stroke-width:35;stroke-linecap:round;stroke-miterlimit:10;}
      .st2{fill:#FFFFFF;}
      .st3{fill:none;stroke:#232423;stroke-width:22;stroke-linecap:round;stroke-miterlimit:10;}
      .st4{fill:#232423;}`}
        </style>
        <linearGradient
          id="SVGID_1_"
          gradientUnits="userSpaceOnUse"
          x1="13.7272"
          y1="239.2992"
          x2="370.7285"
          y2="239.2992"
        >
          <stop offset="5.285000e-02" style={{ stopColor: "#EC9D02" }}></stop>
          <stop offset="0.3" style={{ stopColor: "#F4B602" }}></stop>
          <stop offset="0.4311" style={{ stopColor: "#F8C402" }}></stop>
          <stop offset="0.5156" style={{ stopColor: "#FBCF17" }}></stop>
          <stop offset="0.6011" style={{ stopColor: "#FED826" }}></stop>
          <stop offset="0.6713" style={{ stopColor: "#FFDB2C" }}></stop>
          <stop offset="0.7489" style={{ stopColor: "#FED827" }}></stop>
          <stop offset="0.8308" style={{ stopColor: "#FCD11B" }}></stop>
          <stop offset="0.9143" style={{ stopColor: "#F8C606" }}></stop>
          <stop offset="0.9278" style={{ stopColor: "#F8C402" }}></stop>
        </linearGradient>
        <path
          className="st0 CCKxblem_0"
          d="M328.7,61.5c-61.1-32.6-111.1,0-126.8,29.4c-13.5,25.4-11.7,58.4-6.3,83.5c-89.7,12.9-161.2,29.9-174.4,87.1
	c-25.3,110.1,66,152,66,152c66.7,34.9,127.6,10.3,159.1-18.1c8.9-8,15.8-17.3,21.1-26.6c13.6-23.9,18.4-51.7,14.6-78.9
	c-3.4-24.6-14.1-56.5-34.7-101.5c-2.2-4.8-4.1-9.5-5.7-13.9c60.8-4.6,94.6-2.7,120.3-39.9C370.7,121.8,375.9,86.7,328.7,61.5
	L328.7,61.5z M213.8,351.2c-32.9,39.8-91.1,18.7-104.9,10.9c-2.2-1.3-4.5-2.5-6.8-3.6c-12.6-6.1-50.2-40.9-29.7-95.1
	c16-42.5,87.2-72.2,126.7-80.3c6.7,23.2,19.8,49.5,26,69.2C246,318.3,213.8,351.2,213.8,351.2L213.8,351.2z M236.6,164.9
	c0.2-67.2,53.5-103.7,78.2-75.2C354.7,135.8,258.1,165.2,236.6,164.9z"
        ></path>
        <g>
          <g>
            <path
              className="st1 CCKxblem_1"
              d="M565.1,204.8c0.7-1.8,0.5-3.4-0.2-5.3c-4.6-13.5-13.5-22.9-26.2-28.8c-7.3-3.4-15.2-5.1-23.3-5.6
			c-4.7-0.2-9.4-0.6-14.1-0.5c-13.1,0.5-25.6,3.5-36.7,11c-9.8,6.6-16.4,15.5-18.3,27.4c-1.5,9.4-0.5,18.3,5.2,26.4
			c4.1,5.7,9.6,9.4,15.8,12.3c10.6,5,22,7.7,33.4,10c13.3,2.6,26.8,4.6,39.7,9.3c8.3,3,16.1,6.8,21.8,13.8c4.5,5.5,6.5,12,6.8,19.1
			c0.5,8.8-1.6,16.9-6.9,23.8c-5.6,7.3-13.1,12.3-21.8,15.6c-11.4,4.4-23.3,5.8-35.4,5.5c-11.2-0.3-22.2-2.1-32.6-6.5
			c-13.6-5.7-23.8-14.8-29.1-28.9c-0.8-2-1.4-4.1-1.7-6.3c-0.2-1.4-0.9-1.7-1.8-2"
            ></path>
            <path
              className="st1 CCKxblem_2"
              d="M1010.2,204.8c1.6-4-0.8-7.3-2.3-10.5c-6-12.9-16.1-21.2-29.6-25.6c-8-2.6-16.2-3.7-24.6-4
			c-8.4-0.3-16.7,0.3-24.8,2.5c-13,3.5-24.5,9.6-31.8,21.4c-7.6,12.2-8.6,25-2.1,38.1c3.5,7,9.6,11.1,16.3,14.6
			c8,4,16.5,6.6,25.1,8.5c10.8,2.4,21.8,4.3,32.6,6.6c8.6,1.8,17,4.3,24.9,8.3c7.3,3.7,13.6,8.4,17.2,16.3c3.3,7.5,4,15,2.4,22.9
			c-2.3,11.8-9.6,19.8-19.6,25.6c-9.8,5.7-20.4,8.2-31.6,9.2c-8.1,0.7-16.1,0.4-24.1-0.7c-13-1.8-25.3-5.9-35.6-14.3
			c-8-6.5-13-15.1-15.6-25.1c-0.5-1.8-0.6-3.6,0.5-5.3"
            ></path>
            <path
              className="st1 CCKxblem_3"
              d="M1044.9,273.6c0.9-0.1,1.8-0.2,2.8-0.2c33.9,0,67.8,0,101.7,0c4.5,0,4.4,0,4.3-4.5c-0.2-7.5-1.1-14.9-3-22.1
			c-3.5-13.3-10-24.7-21.6-32.6c-6.7-4.5-14.3-6.9-22.3-7.5c-13.3-1.1-26,0.7-37.4,8.2c-9,5.9-15.2,14-19.3,23.9
			c-3.7,9-5.6,18.4-5.8,28.1c0,2.2-0.5,4.3,0.4,6.6c0.6,1.6-0.4,3.6-0.3,5.5c0.4,12.5,3.1,24.4,9.8,35.1
			c7.9,12.8,19.3,20.7,34.1,23.4c9.8,1.8,19.5,1.9,29.1-0.6c14.9-3.9,26.8-11.8,34.2-25.8c0.3-0.6,1.3-0.9,2-1.3"
            ></path>
            <path
              className="st1 CCKxblem_4"
              d="M599.5,273.4c35.2,0,70.3,0,105.5,0c2.8,0,3.6,0.4,3.5-3.5c-0.2-13.3-2.5-26.1-8.8-37.9
			c-7.6-14.4-19.6-22.7-35.6-25.1c-9.9-1.5-19.7-0.7-29.1,2.6c-11.4,4-20.3,11.2-26.4,21.8c-5.7,9.8-8.6,20.4-9.3,31.6
			c-0.2,3.5,0.4,7.1,0,10.5c-1.2,9.8,0.8,19.2,3.8,28.4c4.9,15,14.3,26.3,29.1,32.6c5.9,2.5,12.1,3.9,18.6,4.1
			c4.5,0.1,9.1,0.4,13.5-0.1c5.7-0.6,11.3-2.1,16.6-4.4c11-4.7,19.5-12.1,25.4-22.6c0.5-0.9,0.8-1.6,0.2-2.5"
            ></path>
            <path
              className="st1 CCKxblem_5"
              d="M850.3,335.6c0-28.8,0.3-57.6-0.1-86.4c-0.2-19-9.5-34.8-29.8-40.6c-14.3-4.1-28.5-3.2-42.2,3.2
			c-12.9,6.1-21.8,15.9-27.2,29.1c-0.5,1.2-1.6,2-2.5,3"
            ></path>
            <path
              className="st1 CCKxblem_6"
              d="M1428,167.1c-35.3,0-70.6,0-106,0c-3.8,0-3.8,0-3.8,3.8c0,25.1,0,50.2,0,75.3c0,29.8,0,59.6,0,89.4"
            ></path>
            <path
              style={{ stroke: "white", strokeWidth: 12 }}
              d="M1192.4,162.4c-10.3,0-16.2,5.4-16.2,14.8c0,9.4,5.8,15.1,16.2,15.1c10.3,0,16-5.6,16-15.1
    C1208.3,167.8,1202.7,162.4,1192.4,162.4L1192.4,162.4z"
            ></path>
            <path
              className="st1 CCKxblem_7"
              d="M1192.3,209.1c0,42.2,0,84.4,0,126.6"
            ></path>
            <path
              style={{ stroke: "white", strokeWidth: 12 }}
              d="M1459.5,162.4c-10.3,0-16.2,5.4-16.2,14.8c0,9.4,5.8,15.1,16.2,15.1c10.3,0,16-5.6,16-15.1
			C1475.5,167.8,1469.9,162.4,1459.5,162.4L1459.5,162.4z"
            ></path>
            <path
              className="st1 CCKxblem_8"
              d="M1459.4,209.1c0,42.2,0,84.4,0,126.6"
            ></path>
            <path
              className="st1 CCKxblem_9"
              d="M747.4,209.1c0,9.9,0,19.8,0,29.6c0,1.6,0.5,3.2,0.7,4.8c0.1,1.1,0.1,2.2,0,3.3c-0.2,3-0.7,6-0.7,9
			c-0.1,26.6,0,53.2,0,79.9"
            ></path>
            <path
              className="st1 CCKxblem_10"
              d="M1406.9,250c-29.3,0-58.6,0-87.9,0"
            ></path>
          </g>
          <g>
            <path
              className="st2 CCKxblem_11"
              d="M1192.4,162.4c-10.3,0-16.2,5.4-16.2,14.8c0,9.4,5.8,15.1,16.2,15.1c10.3,0,16-5.6,16-15.1
			C1208.3,167.8,1202.7,162.4,1192.4,162.4L1192.4,162.4z"
            ></path>
          </g>
          <g>
            <path
              className="st2 CCKxblem_12"
              d="M1459.5,162.4c-10.3,0-16.2,5.4-16.2,14.8c0,9.4,5.8,15.1,16.2,15.1c10.3,0,16-5.6,16-15.1
			C1475.5,167.8,1469.9,162.4,1459.5,162.4L1459.5,162.4z"
            ></path>
          </g>
        </g>
        <g>
          <g>
            <path
              className="st3 CCKxblem_13"
              d="M565.1,204.8c0.7-1.8,0.5-3.4-0.2-5.3c-4.6-13.5-13.5-22.9-26.2-28.8c-7.3-3.4-15.2-5.1-23.3-5.6
			c-4.7-0.2-9.4-0.6-14.1-0.5c-13.1,0.5-25.6,3.5-36.7,11c-9.8,6.6-16.4,15.5-18.3,27.4c-1.5,9.4-0.5,18.3,5.2,26.4
			c4.1,5.7,9.6,9.4,15.8,12.3c10.6,5,22,7.7,33.4,10c13.3,2.6,26.8,4.6,39.7,9.3c8.3,3,16.1,6.8,21.8,13.8c4.5,5.5,6.5,12,6.8,19.1
			c0.5,8.8-1.6,16.9-6.9,23.8c-5.6,7.3-13.1,12.3-21.8,15.6c-11.4,4.4-23.3,5.8-35.4,5.5c-11.2-0.3-22.2-2.1-32.6-6.5
			c-13.6-5.7-23.8-14.8-29.1-28.9c-0.8-2-1.4-4.1-1.7-6.3c-0.2-1.4-0.9-1.7-1.8-2"
            ></path>
            <path
              className="st3 CCKxblem_14"
              d="M1010.2,204.8c1.6-4-0.8-7.3-2.3-10.5c-6-12.9-16.1-21.2-29.6-25.6c-8-2.6-16.2-3.7-24.6-4
			c-8.4-0.3-16.7,0.3-24.8,2.5c-13,3.5-24.5,9.6-31.8,21.4c-7.6,12.2-8.6,25-2.1,38.1c3.5,7,9.6,11.1,16.3,14.6
			c8,4,16.5,6.6,25.1,8.5c10.8,2.4,21.8,4.3,32.6,6.6c8.6,1.8,17,4.3,24.9,8.3c7.3,3.7,13.6,8.4,17.2,16.3c3.3,7.5,4,15,2.4,22.9
			c-2.3,11.8-9.6,19.8-19.6,25.6c-9.8,5.7-20.4,8.2-31.6,9.2c-8.1,0.7-16.1,0.4-24.1-0.7c-13-1.8-25.3-5.9-35.6-14.3
			c-8-6.5-13-15.1-15.6-25.1c-0.5-1.8-0.6-3.6,0.5-5.3"
            ></path>
            <path
              className="st3 CCKxblem_15"
              d="M1044.9,273.6c0.9-0.1,1.8-0.2,2.8-0.2c33.9,0,67.8,0,101.7,0c4.5,0,4.4,0,4.3-4.5c-0.2-7.5-1.1-14.9-3-22.1
			c-3.5-13.3-10-24.7-21.6-32.6c-6.7-4.5-14.3-6.9-22.3-7.5c-13.3-1.1-26,0.7-37.4,8.2c-9,5.9-15.2,14-19.3,23.9
			c-3.7,9-5.6,18.4-5.8,28.1c0,2.2-0.5,4.3,0.4,6.6c0.6,1.6-0.4,3.6-0.3,5.5c0.4,12.5,3.1,24.4,9.8,35.1
			c7.9,12.8,19.3,20.7,34.1,23.4c9.8,1.8,19.5,1.9,29.1-0.6c14.9-3.9,26.8-11.8,34.2-25.8c0.3-0.6,1.3-0.9,2-1.3"
            ></path>
            <path
              className="st3 CCKxblem_16"
              d="M599.5,273.4c35.2,0,70.3,0,105.5,0c2.8,0,3.6,0.4,3.5-3.5c-0.2-13.3-2.5-26.1-8.8-37.9
			c-7.6-14.4-19.6-22.7-35.6-25.1c-9.9-1.5-19.7-0.7-29.1,2.6c-11.4,4-20.3,11.2-26.4,21.8c-5.7,9.8-8.6,20.4-9.3,31.6
			c-0.2,3.5,0.4,7.1,0,10.5c-1.2,9.8,0.8,19.2,3.8,28.4c4.9,15,14.3,26.3,29.1,32.6c5.9,2.5,12.1,3.9,18.6,4.1
			c4.5,0.1,9.1,0.4,13.5-0.1c5.7-0.6,11.3-2.1,16.6-4.4c11-4.7,19.5-12.1,25.4-22.6c0.5-0.9,0.8-1.6,0.2-2.5"
            ></path>
            <path
              className="st3 CCKxblem_17"
              d="M850.3,335.6c0-28.8,0.3-57.6-0.1-86.4c-0.2-19-9.5-34.8-29.8-40.6c-14.3-4.1-28.5-3.2-42.2,3.2
			c-12.9,6.1-21.8,15.9-27.2,29.1c-0.5,1.2-1.6,2-2.5,3"
            ></path>
            <path
              className="st3 CCKxblem_18"
              d="M1428,167.1c-35.3,0-70.6,0-106,0c-3.8,0-3.8,0-3.8,3.8c0,25.1,0,50.2,0,75.3c0,29.8,0,59.6,0,89.4"
            ></path>
            <path
              className="st3 CCKxblem_19"
              d="M1192.3,209.1c0,42.2,0,84.4,0,126.6"
            ></path>
            <path
              className="st3 CCKxblem_20"
              d="M1459.4,209.1c0,42.2,0,84.4,0,126.6"
            ></path>
            <path
              className="st3 CCKxblem_21"
              d="M747.4,209.1c0,9.9,0,19.8,0,29.6c0,1.6,0.5,3.2,0.7,4.8c0.1,1.1,0.1,2.2,0,3.3c-0.2,3-0.7,6-0.7,9
			c-0.1,26.6,0,53.2,0,79.9"
            ></path>
            <path
              className="st3 CCKxblem_22"
              d="M1406.9,250c-29.3,0-58.6,0-87.9,0"
            ></path>
          </g>
          <g>
            <path
              className="st4 CCKxblem_23"
              d="M1192.4,162.4c-10.3,0-16.2,5.4-16.2,14.8c0,9.4,5.8,15.1,16.2,15.1c10.3,0,16-5.6,16-15.1
			C1208.3,167.8,1202.7,162.4,1192.4,162.4L1192.4,162.4z"
            ></path>
          </g>
          <g>
            <path
              className="st4 CCKxblem_24"
              d="M1459.5,162.4c-10.3,0-16.2,5.4-16.2,14.8c0,9.4,5.8,15.1,16.2,15.1c10.3,0,16-5.6,16-15.1
			C1475.5,167.8,1469.9,162.4,1459.5,162.4L1459.5,162.4z"
            ></path>
          </g>
        </g>
        <style>{`.CCKxblem_0{stroke-dasharray:2081 2083;stroke-dashoffset:2082;animation:CCKxblem_draw_0 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_1{stroke-dasharray:501 503;stroke-dashoffset:502;animation:CCKxblem_draw_1 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_2{stroke-dasharray:502 504;stroke-dashoffset:503;animation:CCKxblem_draw_2 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_3{stroke-dasharray:466 468;stroke-dashoffset:467;animation:CCKxblem_draw_3 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_4{stroke-dasharray:466 468;stroke-dashoffset:467;animation:CCKxblem_draw_4 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_5{stroke-dasharray:229 231;stroke-dashoffset:230;animation:CCKxblem_draw_5 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_6{stroke-dasharray:278 280;stroke-dashoffset:279;animation:CCKxblem_draw_6 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_7{stroke-dasharray:127 129;stroke-dashoffset:128;animation:CCKxblem_draw_7 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_8{stroke-dasharray:127 129;stroke-dashoffset:128;animation:CCKxblem_draw_8 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_9{stroke-dasharray:127 129;stroke-dashoffset:128;animation:CCKxblem_draw_9 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_10{stroke-dasharray:88 90;stroke-dashoffset:89;animation:CCKxblem_draw_10 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_11{stroke-dasharray:100 102;stroke-dashoffset:101;animation:CCKxblem_draw_11 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_12{stroke-dasharray:100 102;stroke-dashoffset:101;animation:CCKxblem_draw_12 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_13{stroke-dasharray:501 503;stroke-dashoffset:502;animation:CCKxblem_draw_13 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_14{stroke-dasharray:502 504;stroke-dashoffset:503;animation:CCKxblem_draw_14 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_15{stroke-dasharray:466 468;stroke-dashoffset:467;animation:CCKxblem_draw_15 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_16{stroke-dasharray:466 468;stroke-dashoffset:467;animation:CCKxblem_draw_16 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_17{stroke-dasharray:229 231;stroke-dashoffset:230;animation:CCKxblem_draw_17 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_18{stroke-dasharray:278 280;stroke-dashoffset:279;animation:CCKxblem_draw_18 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_19{stroke-dasharray:127 129;stroke-dashoffset:128;animation:CCKxblem_draw_19 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_20{stroke-dasharray:127 129;stroke-dashoffset:128;animation:CCKxblem_draw_20 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_21{stroke-dasharray:127 129;stroke-dashoffset:128;animation:CCKxblem_draw_21 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_22{stroke-dasharray:88 90;stroke-dashoffset:89;animation:CCKxblem_draw_22 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_23{stroke-dasharray:100 102;stroke-dashoffset:101;animation:CCKxblem_draw_23 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}.CCKxblem_24{stroke-dasharray:100 102;stroke-dashoffset:101;animation:CCKxblem_draw_24 7200ms linear 0ms infinite,CCKxblem_fade 7200ms linear 0ms infinite;}@keyframes CCKxblem_draw{100%{stroke-dashoffset:0;}}@keyframes CCKxblem_fade{0%{stroke-opacity:1;}94.44444444444444%{stroke-opacity:1;}100%{stroke-opacity:0;}}@keyframes CCKxblem_draw_0{11.11111111111111%{stroke-dashoffset: 2082; fill-opacity:0.1}38.88888888888889%{ stroke-dashoffset: 0;fill-opacity:0.8}100%{ stroke-dashoffset: 0; fill-opacity:1;}}@keyframes CCKxblem_draw_1{11.689814814814813%{stroke-dashoffset: 502}39.467592592592595%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_2{12.268518518518519%{stroke-dashoffset: 503}40.0462962962963%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_3{12.847222222222221%{stroke-dashoffset: 467}40.625%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_4{13.425925925925924%{stroke-dashoffset: 467}41.2037037037037%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_5{14.004629629629628%{stroke-dashoffset: 230}41.782407407407405%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_6{14.583333333333334%{stroke-dashoffset: 279}42.36111111111111%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_7{15.162037037037035%{stroke-dashoffset: 128}42.93981481481482%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_8{15.740740740740739%{stroke-dashoffset: 128}43.51851851851851%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_9{16.319444444444446%{stroke-dashoffset: 128}44.09722222222222%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_10{16.898148148148145%{stroke-dashoffset: 89}44.675925925925924%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_11{17.47685185185185%{stroke-dashoffset: 101}45.254629629629626%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_12{18.055555555555554%{stroke-dashoffset: 101}45.83333333333333%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_13{18.634259259259256%{stroke-dashoffset: 502}46.41203703703704%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_14{19.212962962962962%{stroke-dashoffset: 503}46.99074074074074%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_15{19.791666666666664%{stroke-dashoffset: 467}47.56944444444444%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_16{20.37037037037037%{stroke-dashoffset: 467}48.148148148148145%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_17{20.949074074074073%{stroke-dashoffset: 230}48.72685185185185%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_18{21.52777777777778%{stroke-dashoffset: 279}49.30555555555556%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_19{22.10648148148148%{stroke-dashoffset: 128}49.88425925925925%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_20{22.685185185185183%{stroke-dashoffset: 128}50.462962962962955%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_21{23.26388888888889%{stroke-dashoffset: 128}51.041666666666664%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_22{23.84259259259259%{stroke-dashoffset: 89}51.620370370370374%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_23{24.421296296296298%{stroke-dashoffset: 101}52.19907407407407%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}@keyframes CCKxblem_draw_24{25%{stroke-dashoffset: 101}52.77777777777778%{ stroke-dashoffset: 0;}100%{ stroke-dashoffset: 0;}}`}</style>
      </svg>
    </div>
  );
};

export default pageLoadingAnim;
