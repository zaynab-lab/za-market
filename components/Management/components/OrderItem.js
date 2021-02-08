import { useState } from "react";
import { styles } from "../../../public/js/styles";
import OrderEnd from "../../../components/OrderEnd";
import { FaCalendarAlt, FaMapMarkedAlt } from "react-icons/fa";
import OrderControll from "./OrderControll";
import dateChanger from "../../../util/dateChanger";
import { useRecoilValue } from "recoil";
import { langState } from "../../../pages/menu";

export default function OrderItem({
  order,
  permissions,
  current,
  handleRemove
}) {
  const lang = useRecoilValue(langState);
  const dictionary = {
    orderDate: { en: "Order Date", ar: "تاريخ الطلب" },
    total: { en: "Total", ar: "الإجمالي" },
    delivery: { en: "Delivery", ar: "توصيل" },
    orderCode: { en: "Order Code", ar: "رقم الطلب" },
    required: { en: "Required", ar: "المطلوب" },
    steps: { en: "Steps", ar: "المراحل" },
    address: { en: "Address", ar: "العنوان" },
    customer: { en: "Customer", ar: "اسم الزبون" },
    number: { en: "Phone Number", ar: "الرقم" },
    LBP: { en: "LBP", ar: "ل.ل" }
  };
  const [hidden, setHidden] = useState(true);

  return (
    <>
      <div className="orderContainer">
        <div className="header" onClick={() => setHidden(!hidden)}>
          <div>
            <span className="label">
              <FaCalendarAlt /> {dictionary.orderDate[lang]}:{" "}
            </span>
            {dateChanger(order.date)}
          </div>
          {!hidden && (
            <>
              <div className="totalbar">
                <span>
                  <span className="label">{dictionary.total[lang]}:</span>{" "}
                  {order.total}
                  <span className="currency">{dictionary.LBP[lang]}</span>
                </span>
                <span>
                  <span className="label">{dictionary.orderCode[lang]}:</span>{" "}
                  {order.orderCode}
                </span>
              </div>
              <div className="totalbar">
                <span>
                  <span className="label">{dictionary.delivery[lang]}: </span>
                  {order.delivery}
                  <span className="currency">{dictionary.LBP[lang]}</span>
                </span>
                <span>
                  <span className="label">{dictionary.required[lang]}: </span>
                  {order.shouldpay}
                  <span className="currency">{dictionary.LBP[lang]}</span>
                </span>
              </div>

              <div>
                <span className="label">
                  <FaMapMarkedAlt /> {dictionary.address[lang]}:
                </span>
                {order.address}
              </div>

              <div className="totalbar">
                <span>
                  <span className="label">{dictionary.customer[lang]}:</span>{" "}
                  {order.userName}
                </span>
                <span>
                  <span className="label">{dictionary.number[lang]}:</span>{" "}
                  {order.number}
                </span>
              </div>
            </>
          )}
        </div>

        {!hidden && (
          <>
            <OrderEnd proceedProducts={order.products} />
            <div className="footer">
              <OrderControll
                permissions={permissions}
                id={order._id}
                current={current}
                handleRemove={handleRemove.bind(this)}
              />
            </div>
          </>
        )}
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
          display: flex;
          align-items: center;
          overflow: auto;
          width: 100%;
        }

        .stepContainer {
          flex: 1 0 56rem;
        }

        .footer span {
          flex: 1 0 5rem;
        }
        .currency {
          padding: 0.2rem;
        }

        .totalbar {
          display: flex;
        }

        .totalbar span {
          flex: 1 1 100%;
        }

        .label {
          color: ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
