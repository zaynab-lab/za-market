import { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import { styles } from "../../public/js/styles";
import Orders from "../../components/Orders";
import axios from "axios";
import ContactUs from "../../components/ContactUs";

export default function OrdersPage() {
  const [current, setCurrent] = useState(true);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    axios.get("/api/orders/user").then((res) => {
      const { data } = res;
      if (data !== "invalid" && data !== "noToken") {
        setOrderList(data);
      }
    });
  }, [setOrderList]);

  return (
    <>
      <TopBar title="الطلبيات" page={false} />
      <div className="container">
        <div className="topBar">
          <div
            className={`topBar-item ${current && "current"}`}
            onClick={() => {
              setCurrent(true);
            }}
          >
            الحالية
          </div>
          <div
            className={`topBar-item ${!current && "current"}`}
            onClick={() => {
              setCurrent(false);
            }}
          >
            السابقة
          </div>
        </div>
        <Orders current={current} orderList={orderList} />
        <ContactUs />
      </div>
      <style jsx>{`
        .topBar {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          width: 100%;
          overflow: auto;
          border-bottom: 1px solid ${styles.primaryColor};
        }

        .container {
          height: calc(100vh - 3rem);
          overflow: auto;
        }
        .topBar-item {
          text-align: center;
          padding: 0.2rem 2rem;
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

        .current {
          color: ${styles.secondaryColor};
          font-size: 1.4rem;
          -webkit-box-flex: 1;
          -ms-flex: 1 1 100%;
          flex: 1 1 100%;
        }
      `}</style>
    </>
  );
}
