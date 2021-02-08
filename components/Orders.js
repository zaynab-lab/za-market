import { styles } from "../public/js/styles";
import OrderEnd from "./OrderEnd";
import { FaCalendarAlt } from "react-icons/fa";
import ArrowBar from "./ArrowBar";
import ContentLoad from "./OrdersContentLoader";
import { useEffect, useState } from "react";
import dateChanger from "../util/dateChanger";
import { useRecoilValue } from "recoil";
import { langState } from "../pages/menu";

const OrderItem = ({ currentList, index }) => {
  const [hidden, setHidden] = useState(index === 0 ? false : true);
  const lang = useRecoilValue(langState);
  const dictionary = {
    orderDate: { en: "Order Date", ar: "تاريخ الطلب" },
    total: { en: "Total", ar: "الإجمالي" },
    delivery: { en: "Delivery", ar: "توصيل" },
    orderCode: { en: "Order Code", ar: "رقم الطلب" },
    required: { en: "Required", ar: "المطلوب" },
    steps: { en: "Steps", ar: "المراحل" },
    LBP: { en: "LBP", ar: "ل.ل" }
  };
  return (
    <>
      <div className="orderContainer">
        <div className="header" onClick={() => setHidden(!hidden)}>
          <div>
            <span className="label">
              <FaCalendarAlt /> {dictionary.orderDate[lang]}:
            </span>{" "}
            {dateChanger(currentList.date)}
          </div>

          <div className="totalbar">
            <span>
              <span className="label">{dictionary.total[lang]}: </span>
              {currentList.total}
              <span className="currency">{dictionary.LBP[lang]}</span>
            </span>
            <span className="label">
              {dictionary.orderCode[lang]}: {currentList.orderCode}
            </span>
          </div>
          <div className="totalbar">
            <span>
              <span className="label">{dictionary.delivery[lang]}: </span>
              {currentList.delivery}
              <span className="currency">{dictionary.LBP[lang]}</span>
            </span>
            <span>
              <span className="label">{dictionary.required[lang]}: </span>
              {currentList.shouldpay}
              <span className="currency">{dictionary.LBP[lang]}</span>
            </span>
          </div>
        </div>

        {!hidden && <OrderEnd proceedProducts={currentList.products} />}
        <div className="footer">
          <span className="label">{dictionary.steps[lang]} : </span>
          <div className="stepContainer">
            <ArrowBar progress={currentList.progress} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .orderContainer {
          margin: 1rem;
          border: 1px solid ${styles.primaryColor};
          border-radius: 0.5rem;
        }

        .header,
        .footer {
          padding: 0.5rem;
          background: ${styles.thirdColor};
          color: ${styles.primaryColor};
          border-radius: 0.5rem;
        }

        .footer {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          overflow: auto;
          width: 100%;
        }
        .footer div {
          -webkit-box-flex: 1;
          -ms-flex: 1 0 46rem;
          flex: 1 0 46rem;
        }
        .footer span {
          -webkit-box-flex: 1;
          -ms-flex: 1 0 5rem;
          flex: 1 0 5rem;
        }
        .stepContainer {
          -webkit-box-flex: 1;
          -ms-flex: 1 0 56rem;
          flex: 1 0 56rem;
        }
        .totalbar {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
        }
        .totalbar span {
          -webkit-box-flex: 1;
          -ms-flex: 1 1 100%;
          flex: 1 1 100%;
        }
        .currency {
          padding: 0.2rem;
        }
        .label {
          color: ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
};

export default function Orders({ current, orderList }) {
  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {
    current
      ? setCurrentList(
          orderList
            .filter(
              (obj) =>
                obj.progress.cancelation.done !== current &&
                obj.progress.arrive.done !== current
            )
            .reverse()
        )
      : setCurrentList(
          orderList
            .filter(
              (obj) =>
                obj.progress.arrive.done !== current ||
                obj.progress.cancelation.done !== current
            )
            .reverse()
        );
  }, [orderList, current]);

  return (
    <>
      {currentList.length === 0 ? (
        <ContentLoad />
      ) : (
        <>
          {currentList.map((obj, index) => (
            <OrderItem key={obj.orderCode} index={index} currentList={obj} />
          ))}
        </>
      )}
    </>
  );
}
