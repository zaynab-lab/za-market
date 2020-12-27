import { FaTruck } from "react-icons/fa";
import { styles } from "../public/js/styles";

export default function OrdersContentLoader() {
  return (
    <>
      <div className="loading">
        <div className="loading-title">لا يوجد طلبيات</div>

        <div className="svg">
          <FaTruck />
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
