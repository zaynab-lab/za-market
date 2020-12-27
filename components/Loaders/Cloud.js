import { styles } from "../../public/js/styles";

export default function Cloud() {
  const cloud_speed = "4s";
  const ball_delay = `${cloud_speed}/150`;
  const arrow_repetitions = "1";
  const arrow_speed = `${cloud_speed}/${arrow_repetitions}`;

  return (
    <>
      <svg viewBox="4 2 92 88" className="svg-icon cloud">
        <path
          id="cloud_border"
          fill="#4D5152"
          d="M47.9 82.3l-0.2-7.5c0-0.1-0.5-4.6 2.3-7.7 1.7-1.9 4.3-2.9 7.6-2.9h17.3c3.8 0 14.1-3.5 14.1-14.7 0-12.9-12.2-13.7-12.7-13.7 -0.5 0-1-0.5-1-1 0-0.1 0.2-5.6-3.3-8.9 -2.1-2-5.2-2.9-9.2-2.5 -0.4 0-0.8-0.2-1-0.6 -0.2-0.4-5.2-10.8-18-10.3 -18 0.7-20.5 17.1-20.8 20.4 0 0.5-0.4 0.9-0.9 0.9C21.5 33.9 7 35.3 7 50c0 8.6 8.1 13.5 12.4 14.2 2.6 0.4 16 0.4 19.4 0.2 2.7-0.2 4.8-1.1 6.2-2.9 3.4-4 2.7-10.9 2.6-11l-0.1-1 2-0.2 0.1 1c0 0.3 0.8 7.8-3.1 12.5 -1.9 2.2-4.4 3.4-7.7 3.6 -3.6 0.2-17.1 0.2-19.9-0.2C13.2 65.1 5 59 5 50c0-14.4 12.7-17.5 16.1-18 1.2-9.7 7.8-20.8 22.6-21.5C56.2 10 62 18.8 63.3 21.3c4.3-0.2 7.7 0.8 10.1 3.2 3.2 3.1 3.8 7.5 3.9 9.5C82.5 34.6 91 38.4 91 49.6c0 12.7-11.8 16.7-16.1 16.7H57.6c-2.7 0-4.7 0.8-6.1 2.2 -2.2 2.5-1.8 6.2-1.8 6.2l0.2 7.6L47.9 82.3z"
        />
        <g>
          <circle
            id="ball2"
            className="ball"
            r="3.5"
            cy="87.290741"
            cx="48.762711"
            fill={styles.primaryColor}
          />
        </g>

        <g>
          <polygon
            id="cloud_arrow_top"
            className="arrow"
            fill={styles.primaryColor}
            points="41.7 54.2 48.7 47.6 55.7 54.2 54.2 55.6 48.7 50.3 43.2 55.6 "
          />

          <polygon
            id="cloud_arrow_bottom"
            className="arrow"
            fill={styles.primaryColor}
            points="55.7 76.8 48.7 83.4 41.7 76.8 43.2 75.4 48.7 80.7 54.2 75.4 "
          />
        </g>

        <g>
          <path
            id="cloud_reflection"
            fill={styles.secondaryColor}
            d="m 30.178658,31.155089 c -0.383147,0 -0.766295,-0.306518 -0.766295,-0.766295 0,-0.07663 0,-10.651504 11.417799,-11.494429 0.459777,0 0.766295,0.306518 0.842925,0.689666 0,0.459777 -0.306518,0.766295 -0.689666,0.842925 -9.961838,0.766295 -10.038467,9.57869 -10.038467,9.961838 0,0.383147 -0.306518,0.689665 -0.766296,0.766295 0,0 0,0 0,0 z"
          />
        </g>
      </svg>

      <style jsx>{`
        #arrow {
          -webkit-transform-origin: 50% 50%;
          transform-origin: 50% 50%;
          opacity: 1;
          -webkit-transform: translate(0, 0) scale(1);
          transform: translate(0, 0) scale(1);
        }

        #arrow {
          -webkit-animation: cloud_arrow ${arrow_speed} infinite;
          animation: cloud_arrow ${arrow_speed} infinite;
        }

        #cloud_reflection {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
          -webkit-transform-origin: 41.5px 30.5px;
          transform-origin: 41.5px 30.5px;
        }

        #cloud_reflection {
          -webkit-animation: cloud_reflection ${arrow_speed} / 2 linear infinite;
          animation: cloud_reflection ${arrow_speed} / 2 linear infinite;
        }

        @-webkit-keyframes cloud_reflection {
          0% {
            -webkit-transform: rotate(0deg);
          }

          75% {
            -webkit-transform: rotate(270deg);
          }

          100% {
            -webkit-transform: rotate(360deg);
          }
        }

        @keyframes cloud_reflection {
          0% {
            transform: rotate(0deg);

            opacity: 1;
          }

          75% {
            transform: rotate(270deg);

            opacity: 0.5;
          }

          100% {
            transform: rotate(360deg);

            opacity: 1;
          }
        }

        .ball {
          -webkit-transform-origin: center center;

          transform-origin: center center;

          opacity: 0;

          -webkit-transform: translate(0, 0) scale(0);

          transform: translate(0, 0) scale(0);
        }

        .ball {
          opacity: 1;

          -webkit-animation: cloud_ball ${cloud_speed} ease-in-out infinite;

          animation: cloud_ball ${cloud_speed} ease-in-out infinite;
        }

        #ball2 {
          -webkit-animation: cloud_ball ${cloud_speed} ease-in-out ${ball_delay}
            infinite;

          animation: cloud_ball ${cloud_speed} ease-in-out ${ball_delay}
            infinite;
        }

        #cloud_arrow_bottom {
          -webkit-animation: cloud_arrow_down ${arrow_speed} infinite;

          animation: cloud_arrow_down ${arrow_speed} infinite;
        }

        @-webkit-keyframes cloud_arrow {
          0% {
            -webkit-transform: translate(0, 0) scale(1);
          }

          50% {
            -webkit-transform: translate(0, -2px) scale(1.2);
          }

          100% {
            -webkit-transform: translate(0, 0) scale(1);
          }
        }

        @-webkit-keyframes cloud_arrow_down {
          0% {
            -webkit-transform: translate(0, 0) scale(1);
          }

          50% {
            -webkit-transform: translate(0, 2px) scale(1.2);
          }

          100% {
            -webkit-transform: translate(0, 0) scale(1);
          }
        }

        @-webkit-keyframes cloud_ball {
          0% {
            -webkit-transform: translate(0, 0) scale(0);
          }

          4% {
            -webkit-transform: translate(0px, -17px) scale(1);
          }

          5% {
            -webkit-transform: translate(5px, -22px);
          }

          12% {
            -webkit-transform: translate(29px, -22px);
          }

          14% {
            -webkit-transform: translate(37px, -29px);
          }

          16% {
            -webkit-transform: translate(40px, -37px);
          }

          20% {
            -webkit-transform: translate(37px, -48px);
          }

          24% {
            -webkit-transform: translate(27px, -52px);
          }

          26% {
            -webkit-transform: translate(23px, -62px);
          }

          30% {
            -webkit-transform: translate(14px, -65px);
          }

          32% {
            -webkit-transform: translate(6px, -73px);
          }

          36% {
            -webkit-transform: translate(-4px, -75px);
          }

          40% {
            -webkit-transform: translate(-17px, -72px);
          }

          43% {
            -webkit-transform: translate(-24px, -64px);
          }

          46% {
            -webkit-transform: translate(-27px, -55px);
          }

          50% {
            -webkit-transform: translate(-37px, -49px);
          }

          53% {
            -webkit-transform: translate(-42px, -40px);
          }

          56% {
            -webkit-transform: translate(-39px, -29px);
          }

          59% {
            -webkit-transform: translate(-30px, -23px);
          }

          66% {
            -webkit-transform: translate(-7px, -23px);
          }

          69% {
            -webkit-transform: translate(-2px, -29px) scale(1);
          }

          72% {
            -webkit-transform: translate(0px, -36px) scale(0.2);
          }

          80% {
            -webkit-transform: translate(0px, -52px) scale(0);
          }

          100% {
            -webkit-transform: translate(0px, -52px) scale(0);
          }
        }

        @keyframes cloud_arrow {
          0% {
            transform: translate(0, 0) scale(1);

            opacity: 1;
          }

          50% {
            transform: translate(0, -2px) scale(1.2);

            opacity: 0.75;
          }

          100% {
            transform: translate(0, 0) scale(1);

            opacity: 1;
          }
        }

        @keyframes cloud_arrow_down {
          0% {
            transform: translate(0, 0) scale(1);

            opacity: 1;
          }

          50% {
            transform: translate(0, 2px) scale(1.2);

            opacity: 0.75;
          }

          100% {
            transform: translate(0, 0) scale(1);

            opacity: 1;
          }
        }

        @keyframes cloud_ball {
          0% {
            transform: translate(0, 0) scale(0);

            opacity: 1;
          }

          4% {
            transform: translate(0px, -17px) scale(1);
          }

          5% {
            transform: translate(5px, -22px);
          }

          12% {
            transform: translate(29px, -22px);
          }

          14% {
            transform: translate(37px, -29px);
          }

          16% {
            transform: translate(40px, -37px);
          }

          20% {
            transform: translate(37px, -48px);
          }

          24% {
            transform: translate(27px, -52px);
          }

          26% {
            transform: translate(23px, -62px);
          }

          30% {
            transform: translate(14px, -65px);
          }

          32% {
            transform: translate(6px, -73px);
          }

          36% {
            transform: translate(-4px, -75px);
          }

          40% {
            transform: translate(-17px, -72px);
          }

          43% {
            transform: translate(-24px, -64px);
          }

          46% {
            transform: translate(-27px, -55px);
          }

          50% {
            transform: translate(-37px, -49px);
          }

          53% {
            transform: translate(-42px, -40px);
          }

          56% {
            transform: translate(-39px, -29px);
          }

          59% {
            transform: translate(-30px, -23px);
          }

          66% {
            transform: translate(-7px, -23px);
          }

          69% {
            transform: translate(-2px, -29px) scale(1);

            opacity: 1;
          }

          72% {
            transform: translate(0px, -36px) scale(0.2);

            opacity: 0.5;
          }

          80% {
            transform: translate(0px, -52px) scale(0);
          }

          100% {
            transform: translate(0px, -52px) scale(0);

            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
