import { useState, useEffect } from "react";
import { styles } from "../../public/js/styles";
import axios from "axios";
import OrderItem from "./components/OrderItem";
import {
  FaBackward,
  FaCheckCircle,
  FaSearchPlus,
  FaShoppingBag,
  FaSmileWink,
  FaTimesCircle,
  FaTruck
} from "react-icons/fa";
import OrdersContentLoader from "../OrdersContentLoader";
import { useRecoilValue } from "recoil";
import { langState } from "../../pages/menu";

export default function OrdersPage({ page }) {
  const [roles, setRoles] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [current, setCurrent] = useState("record");
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      const { data } = res;
      if (data !== "noToken" && data !== "invalid") {
        setRoles(data.roles);
      }
    });
  }, [setRoles, setOrderList]);
  useEffect(() => {
    if (current === "record") {
      axios.get("/api/orders/record").then((res) => {
        const { data } = res;
        data && setOrderList(data);
      });
    } else {
      setOrderList([]);
      axios.get(`/api/orders/${current}`).then((res) => {
        const { data } = res;
        data && setOrderList(data);
      });
    }
  }, [setCurrent, current]);
  useEffect(() => {
    axios.get("/api/permissions/user").then((res) => setPermissions(res.data));
  }, [setPermissions]);

  const handleRemove = (id) => {
    setOrderList(orderList.filter((obj) => obj._id !== id));
  };

  return (
    <>
      <OrderTopBar setCurrent={setCurrent} current={current} />
      {roles.length > 1 &&
        page === "orders" &&
        permissions.includes("view orders") && (
          <div>
            {orderList.length === 0 ? (
              <OrdersContentLoader />
            ) : (
              orderList.map((obj, index) => (
                <OrderItem
                  key={index}
                  order={obj}
                  permissions={permissions}
                  current={current}
                  handleRemove={handleRemove.bind(this)}
                />
              ))
            )}
          </div>
        )}
    </>
  );
}

const OrderTopBar = ({ setCurrent, current }) => {
  const lang = useRecoilValue(langState);
  const dictionary = {
    orders: { en: "Orders", ar: "الطلبيات" },
    preparation: { en: "Preparation", ar: "تحضير الطلبية" },
    audit: { en: "Audit", ar: "تدقيق الطلبية" },
    dispatch: { en: "Dispatched", ar: "تم إرسالها" },
    delivered: { en: "Delivered", ar: "تم تسليمها" },
    canceled: { en: "Canceled", ar: "ملغاة" },
    returned: { en: "Returned", ar: "تم ارجاعها" }
  };
  return (
    <>
      <div className="orderTopBar">
        <div
          className={`step ${current === "record" && "current"}`}
          onClick={() => setCurrent("record")}
        >
          <span className="icon">
            <FaCheckCircle />
          </span>
          <span>{dictionary.orders[lang]}</span>
        </div>

        <div
          className={`step ${current === "preparation" && "current"}`}
          onClick={() => setCurrent("preparation")}
        >
          <span className="icon">
            <FaShoppingBag />
          </span>
          <span>{dictionary.preparation[lang]}</span>
        </div>

        <div
          className={`step ${current === "audit" && "current"}`}
          onClick={() => setCurrent("audit")}
        >
          <span className="icon">
            <FaSearchPlus />
          </span>
          <span>{dictionary.audit[lang]}</span>
        </div>

        <div
          className={`step ${current === "dispatch" && "current"}`}
          onClick={() => setCurrent("dispatch")}
        >
          <span className="icon">
            <FaTruck />
          </span>
          <span>{dictionary.dispatch[lang]}</span>
        </div>

        <div
          className={`step ${current === "arrive" && "current"}`}
          onClick={() => setCurrent("arrive")}
        >
          <span className="icon">
            <FaSmileWink />
          </span>
          <span>{dictionary.delivered[lang]}</span>
        </div>

        <div
          className={`step ${current === "cancel" && "current"}`}
          onClick={() => setCurrent("cancel")}
        >
          <span className="icon">
            <FaTimesCircle />
          </span>
          <span>{dictionary.canceled[lang]}</span>
        </div>
        <div
          className={`step ${current === "return" && "current"}`}
          onClick={() => setCurrent("return")}
        >
          <span className="icon">
            <FaBackward />
          </span>
          <span>{dictionary.returned[lang]}</span>
        </div>
      </div>

      <style jsx>{`
        .orderTopBar {
          display: flex;
          max-width: 100%;
          overflow: auto;
          padding: 0.5rem;
          border-bottom: 1px solid ${styles.primaryColor};
        }

        .step {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1 0 10rem;
        }

        .icon {
          margin: 0 0.5rem;
        }

        .current {
          font-size: 1.1rem;
          color: ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
};
