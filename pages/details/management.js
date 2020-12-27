import { useState, useEffect } from "react";
import TopBar from "../../components/TopBar";
import { styles } from "../../public/js/styles";
import axios from "axios";
import Loader from "../../components/Loader";
import GeneralMPage from "../../components/Management/GeneralMPage";
import ProductsPage from "../../components/Management/ProductsPage";
import CustomersPage from "../../components/Management/CustomersPage";
import OrdersPage from "../../components/Management/OrdersPage";

export default function Conditions() {
  const [loadpage, setLoadpage] = useState(false);
  const [roles, setRoles] = useState([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    axios
      .get("/api/auth")
      .then((res) => {
        const { data } = res;
        if (data !== "noToken" && data !== "invalid") {
          setRoles(data.roles);
        }
      })
      .then(() => setLoadpage(true));
  }, [setRoles]);

  return (
    <>
      <TopBar title="الصفحة الإدارية" page={true} />
      {!loadpage && <Loader />}
      {loadpage && (
        <div className="container">
          <div className="topBar">
            {roles.includes("GM") && (
              <div
                className={`topBar-item ${current === "GM" && "current"}`}
                onClick={() => setCurrent("GM")}
              >
                العامة
              </div>
            )}

            {roles.includes("productsManager") && (
              <div
                className={`topBar-item ${current === "products" && "current"}`}
                onClick={() => setCurrent("products")}
              >
                المنتجات
              </div>
            )}

            {roles.includes("customersManager") && (
              <div
                className={`topBar-item ${
                  current === "customers" && "current"
                }`}
                onClick={() => setCurrent("customers")}
              >
                الزبائن
              </div>
            )}

            {roles.includes("ordersManager") && (
              <div
                className={`topBar-item ${current === "orders" && "current"}`}
                onClick={() => setCurrent("orders")}
              >
                الطلبيات
              </div>
            )}
          </div>

          {roles.includes("GM") && current === "GM" && <GeneralMPage />}

          {roles.includes("productsManager") && current === "products" && (
            <ProductsPage />
          )}

          {roles.includes("customersManager") && current === "customers" && (
            <CustomersPage />
          )}

          {roles.includes("ordersManager") && current === "orders" && (
            <OrdersPage />
          )}
        </div>
      )}
      <style jsx>{`
        .container {
          height: calc(100vh - 3rem);
          overflow: auto;
        }

        .topBar {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          width: 100%;
          border-bottom: 1px solid ${styles.primaryColor};
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
