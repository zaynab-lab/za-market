import { styles } from "../public/js/styles";

export default function SnakBar({ message, show }) {
  return (
    <>
      {show && (
        <div className="mainsnkcontainer">
          <div className="snkcontainer">
            <div className="snkbar"> {message} </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .mainsnkcontainer {
          position: absolute;
          top: 3.3rem;
          width: 100%;
        }

        .snkcontainer {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -ms-flex-line-pack: center;
          align-content: center;
        }

        .snkbar {
          background: ${styles.secondaryColor};
          color: white;
          width: -webkit-fit-content;
          width: -moz-fit-content;
          width: fit-content;
          padding: 0.2rem 1rem;
          font-size: 1rem;
          border-radius: 1.8rem;
          -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
          animation: fadein 0.5s, fadeout 0.5s 2.5s;
        }
        @-webkit-keyframes fadein {
          from {
            bottom: 0;
            opacity: 0;
          }
          to {
            bottom: 6rem;
            opacity: 1;
          }
        }
        @keyframes fadein {
          from {
            bottom: 0;
            opacity: 0;
          }
          to {
            bottom: 6rem;
            opacity: 1;
          }
        }
        @-webkit-keyframes fadeout {
          from {
            bottom: 6rem;
            opacity: 1;
          }
          to {
            bottom: 0;
            opacity: 0;
          }
        }
        @keyframes fadeout {
          from {
            bottom: 6rem;
            opacity: 1;
          }
          to {
            bottom: 0;
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
