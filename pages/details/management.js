import { useState, useEffect } from "react";
import TopBar from "../../components/TopBar";
import { styles } from "../../public/js/styles";
import axios from "axios";
import Loader from "../../components/Loader";
import GeneralMPage from "../../components/Management/GeneralMPage";
import ProductsPage from "../../components/Management/ProductsPage";
import CustomersPage from "../../components/Management/CustomersPage";
import OrdersPage from "../../components/Management/OrdersPage";
import CreditPage from "../../components/Management/CreditPage";
import { useRecoilValue } from "recoil";
import { langState } from "../menu";

export default function Conditions() {
  const lang = useRecoilValue(langState);
  const dictionary = {
    managment: { en: "Management Page", ar: "الصفحة الإدارية" },
    general: { en: "General", ar: "العامة" },
    products: { en: "Products", ar: "المنتجات" },
    users: { en: "Customers", ar: "الزبائن" },
    orders: { en: "Orders", ar: "الطلبيات" },
    account: { en: "Account", ar: "حسابك" }
  };
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
      <TopBar title={dictionary.managment[lang]} page={true} />
      {!loadpage && <Loader />}
      {loadpage && (
        <div className="container">
          <div className="topBar">
            {roles.includes("GM") && (
              <div
                className={`topBar-item ${current === "GM" && "current"}`}
                onClick={() => setCurrent("GM")}
              >
                {dictionary.general[lang]}
              </div>
            )}
            {pages.includes("products") && (
              <div
                className={`topBar-item ${current === "products" && "current"}`}
                onClick={() => setCurrent("products")}
              >
                {dictionary.products[lang]}
              </div>
            )}

            {pages.includes("users") && (
              <div
                className={`topBar-item ${current === "users" && "current"}`}
                onClick={() => setCurrent("users")}
              >
                {dictionary.users[lang]}
              </div>
            )}

            {pages.includes("orders") && (
              <div
                className={`topBar-item ${current === "orders" && "current"}`}
                onClick={() => setCurrent("orders")}
              >
                {dictionary.orders[lang]}
              </div>
            )}

            <div
              className={`topBar-item ${current === "credit" && "current"}`}
              onClick={() => setCurrent("credit")}
            >
              {dictionary.account[lang]}
            </div>
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
          {current === "credit" && <CreditPage page={"credit"} />}
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
