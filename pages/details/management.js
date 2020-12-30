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
  const [pages, setPages] = useState([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    axios
      .get("/api/auth")
      .then((res) => {
        const { data } = res;
        if (data !== "noToken" && data !== "invalid") {
          data && setRoles(data.roles);
          data.pages && setPages(data.pages);
        }
      })
      .then(() => setLoadpage(true));
  }, [setRoles, setPages]);

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
            {pages.includes("products") && (
              <div
                className={`topBar-item ${current === "products" && "current"}`}
                onClick={() => setCurrent("products")}
              >
                المنتجات
              </div>
            )}

            {pages.includes("users") && (
              <div
                className={`topBar-item ${current === "users" && "current"}`}
                onClick={() => setCurrent("users")}
              >
                الزبائن
              </div>
            )}

            {pages.includes("orders") && (
              <div
                className={`topBar-item ${current === "orders" && "current"}`}
                onClick={() => setCurrent("orders")}
              >
                الطلبيات
              </div>
            )}
          </div>

          {roles.includes("GM") && current === "GM" && <GeneralMPage />}
          {pages.includes("products") && current === "products" && (
            <ProductsPage page={"products"} />
          )}
          {pages.includes("users") && current === "users" && (
            <CustomersPage page={"users"} />
          )}
          {pages.includes("orders") && current === "orders" && (
            <OrdersPage page={"orders"} />
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
