import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import { styles } from "../public/js/styles";
import Router from "next/router";
import axios from "axios";
import Dots from "../components/Loaders/Dots";
import Loader from "../components/Loader";
import { cartListState } from "./cart";
import { useRecoilValue } from "recoil";
import OrderEnd from "../components/OrderEnd";
import AddAddress from "../components/AddAdress";
import SnakBar from "../components/SnakBar";
import Switch, { toggleState } from "../components/Switch";
import { orderCode } from "../util/dateChanger";

export default function Proceed() {
  const cartList = useRecoilValue(cartListState);
  const toggle = useRecoilValue(toggleState);
  const [route, setRoute] = useState(true);
  const [dots, setDots] = useState(false);
  const [total, setTotal] = useState(0);
  const [delivery, setDelivery] = useState(3000);
  const [productList, setProductList] = useState([]);
  const [proceedProducts, setProceedProducts] = useState([]);
  const [payment, setPayment] = useState("عند الإستلام");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [hasAddress, setHasAddress] = useState(false);
  const [snak, setSnak] = useState("");
  const [user, setUser] = useState("");
  const fire = (message) => {
    setSnak({ message, show: true });
    setTimeout(() => setSnak(""), 3000);
  };

  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      const { data } = res;
      if (data === "noToken" || data === "invalid") {
        Router.push("/Login?routeTo=cart");
      } else {
        setUser(data);
        cartList.length ? setRoute(false) : Router.push("/cart");
      }
    });
  }, [cartList.length]);

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      const { data } = res;
      setProductList(data);
    });
  }, [setProductList]);
  useEffect(() => {
    setProceedProducts(
      productList
        .filter((obj) => cartList.map((items) => items.id).includes(obj._id))
        .map((obj) => ({
          ...obj,
          ...cartList.find((item) => item.id === obj._id)
        }))
    );
    cartList.length &&
      setTotal(
        cartList
          .map(
            (obj) =>
              productList
                .filter((items) => items._id === obj.id)
                .map((items) => items.price) * obj.quantity
          )
          .reduce((a, b) => a + b)
      );
  }, [setProceedProducts, productList, cartList]);
  useEffect(() => {
    total > 30000 && setDelivery(0);
  }, [total]);

  return (
    <>
      {route ? (
        <Loader />
      ) : (
        <>
          <TopBar title="المرحلة النهائية" page={true} cart={false} />
          <div className="container">
            <div className="bill">
              <div>فاتورة الطلبية</div>
              <OrderEnd proceedProducts={proceedProducts} />
              <div className="bill-content">
                <div>
                  <span>اجمالي الطلب بـ</span>{" "}
                  <span className="price">{total} </span>
                </div>
                <div>
                  <span>اجرة التوصيل</span>{" "}
                  <span className="price">{delivery} </span>{" "}
                </div>
                <div>
                  <span>الخصم</span> <span className="price">- </span>{" "}
                </div>
                <div className="bill-total">
                  <span>الإجمالي النهائي</span>{" "}
                  <span className="price">{total + delivery} </span>{" "}
                </div>
              </div>
            </div>
            {/* ////////////////Address////////////// */}
            <div className="address">
              <AddAddress
                setSelectedAddress={setSelectedAddress}
                setHasAddress={setHasAddress}
              />
            </div>
            {/* ///////////////////////////////// */}
            <div className="pay">
              <div>
                <span className="label">طريقة الدفع: </span>
                <select
                  className="select"
                  onChange={(e) => setPayment(e.target.value)}
                >
                  <option value="عند الإستلام">عند الإستلام</option>
                  <option disabled value="بطاقة الائتمان">
                    بطاقة الائتمان
                  </option>
                  <option
                    onClick={() => alert("الخدمة غير متوفرة حاليا")}
                    disabled
                    value="عبر الإنترنت"
                  >
                    عبر الإنترنت
                  </option>
                </select>
              </div>
              <div>
                <span className="label">
                  الدفع من الرصيد:{" "}
                  <span className="amount">
                    {user.amount - (toggle && total + delivery)}
                  </span>
                </span>
                <Switch />
              </div>
              <div>
                <span className="label">
                  المطلوب:{" "}
                  <span className="amount">
                    {total + delivery - (toggle && user.amount) > 0
                      ? total + delivery - (toggle && user.amount)
                      : 0}
                  </span>
                </span>
              </div>
            </div>
            {/* ///////////////////////////// */}
            <div className="confirmbtn">
              {dots ? (
                <Dots />
              ) : (
                <div
                  onClick={() => {
                    if (selectedAddress === "") {
                      !hasAddress
                        ? fire("اضف عنوان للتمكن من الإرسال")
                        : fire("اختر العنوان المطلوب الإرسال إليه");
                    } else {
                      setDots(true);
                      axios
                        .post(
                          "/api/orders",
                          {
                            proceedProducts,
                            total,
                            payment,
                            selectedAddress,
                            toggle,
                            delivery,
                            orderCode
                          },
                          { "content-type": "application/json" }
                        )
                        .then((res) => {
                          const { data } = res;
                          data === "done" && setDots(false);
                          data === "done" && fire("تم تسجيل الطلبية بنجاح");
                        })
                        .then(() => {
                          localStorage.setItem("cartList", JSON.stringify([]));
                          setTimeout(
                            () => Router.push("/details/orders"),
                            1500
                          );
                        });
                    }
                  }}
                >
                  الموافقة النهائية
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <SnakBar show={snak.show} message={snak.message} />
      <style jsx>{`
        .container {
          height: calc(100vh - 3rem);
          overflow: auto;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          font-size: 1.2rem;
        }

        .label {
          font-size: 1.2rem;
          color: ${styles.secondaryColor};
        }

        .select {
          border-radius: 0.5rem;
          font-size: 1rem;
          padding: 0.2rem 0.8rem;
          background: white;
          height: 2rem;
        }

        .select:focus {
          border: 1px solid ${styles.primaryColor};
        }
        .bill {
          padding: 0.8rem;
        }
        .bill-content {
          padding: 0.5rem;
          font-size: 1rem;
        }
        .bill-content div {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
        }
        .bill-total {
          font-size: 1.2rem;
          border-top: 1px solid ${styles.primaryColor};
        }

        .confirmbtn {
          font-size: 1.2rem;
          border: 1px solid ${styles.primaryColorLight};
          background-color: ${dots ? "white" : styles.primaryColorLight};
          color: white;
          width: 12rem;
          margin: 1rem auto;
          padding: 0.5rem 0.8rem;
          border-radius: 0.5rem;
          line-height: 1.8rem;
          text-align: center;
        }
        .price::after {
          content: " ل.ل";
        }

        .dots {
          height: 7rem;
          padding: 1rem;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
        }
        .pay {
          padding: 0.8rem;
          width: 100%;
        }
        .pay div {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          padding: 0.2rem;
        }
        .amount {
          margin: auto 0.5rem;
          font-size: 0.9rem;
          color: black;
        }
        .amount:after {
          margin: auto 0.5rem;
          content: "ل.ل";
        }
      `}</style>
    </>
  );
}
