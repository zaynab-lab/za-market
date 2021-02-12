import { FaTruck } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { langState } from "../pages/menu";
import { styles } from "../public/js/styles";
import Dots from "./Loaders/Dots";

export default function OrdersContentLoader() {
  const lang = useRecoilValue(langState);
  return (
    <>
      <div className="loading">
        <div className="loading-title">
          {lang === "en" ? "No Order exist" : "لا يوجد طلبيات"}
        </div>
        <div className="svg">
          <FaTruck />
          <Dots />
        </div>
      </div>

      <style jsx>{`
        .loading {
          width: 100%;
          padding: 6rem 0;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
        }

        .loading-title {
          font-size: 1.2rem;
          color: ${styles.secondaryColor};
          opacity: 100%;
          -webkit-animation-name: title;
          animation-name: title;
          -webkit-animation-duration: 5s;
          animation-duration: 5s;
        }
        @-webkit-keyframes title {
          0 {
            opacity: 0;
          }
          80% {
            opacity: 0;
          }
          100% {
            opacity: 100%;
          }
        }

        @keyframes title {
          0 {
            opacity: 0;
          }
          80% {
            opacity: 0;
          }
          100% {
            opacity: 100%;
          }
        }

        .svg {
          font-size: 5rem;
          color: #666;
          text-align: center;
          width: 100vw;
        }
      `}</style>
    </>
  );
}
