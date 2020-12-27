import { styles } from "../public/js/styles";

import Cloud from "./Loaders/Cloud";

export default function Loader() {
  return (
    <>
      <div className="loading">
        <div className="loading-title">جاري تحميل البيانات</div>
        <div className="svg">
          <Cloud />
        </div>
      </div>

      <style jsx>{`
        .loading {
          position: absolute;
          background: white;
          height: calc(100vh - 3rem);
          width: 100%;
          top: 3rem;
          z-index: 20;
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
          font-size: 1.3rem;
          color: ${styles.secondaryColor};
        }

        .svg {
          width: 100px;
          height: 100px;
        }
      `}</style>
    </>
  );
}
