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
import { langState } from "./menu";

export default function Proceed() {
  const cartList = useRecoilValue(cartListState);
  const toggle = useRecoilValue(toggleState);
  const [route, setRoute] = useState(true);
  const [dots, setDots] = useState(false);
  const [total, setTotal] = useState(0);
  const [delivery, setDelivery] = useState(3000);
  const [discount, setDiscount] = useState();
  const [productList, setProductList] = useState([]);
  const [proceedProducts, setProceedProducts] = useState([]);
  const [payment, setPayment] = useState("عند الإستلام");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [hasAddress, setHasAddress] = useState(false);
  const [snak, setSnak] = useState("");
  const [user, setUser] = useState("");
  const fire = (message) => {
    setSnak({ message, show: true });
    setTimeout(() => setSnak(""), 4000);
  };
  const lang = useRecoilValue(langState);
  const dictionary = {
    proceed: { en: "Proceed", ar: "المرحلة النهائية" },
    invoice: { en: "Invoice", ar: "فاتورة الطلبية" },
    total: { en: "Total", ar: "إجمالي الطلب بـ" },
    delivery: { en: "Delivery", ar: "أجرة التوصيل" },
    discount: { en: "Discount", ar: "خصم" },
    final: { en: "Final Total", ar: "الإجمالي النهائي" },
    LBP: { en: "LBP", ar: "ل.ل" },
    payment: { en: "Payment Method", ar: "طريقة الدفع" },
    receipt: { en: "Upon receipt", ar: "عند الإستلام" },
    creditCard: { en: "Credit Card", ar: "بطاقة الإئتمان" },
    online: { en: "Online", ar: "عبر الإنترنت" },
    credit: { en: "Pay from credit", ar: "الدفع من الرصيد" },
    required: { en: "Required", ar: "المطلوب" },
    order: { en: "Order", ar: "الموافقة النهائية" },
    addAddress: {
      en: "Add address to continue",
      ar: "اضف عنوان للتمكن من الإرسال"
    },
    chooseAddress: {
      en: "Choose an address from your list",
      ar: "اختر العنوان المطلوب الإرسال إليه"
    }
  };

  useEffect(() => {
    cartList[0] &&
      axios
        .post(
          "/api/products/ids",
          { ids: cartList.map((item) => item.id) },
          { "content-type": "application/json" }
        )
        .then((res) => {
          const { data } = res;
          setProductList(data);
        });
  }, [cartList]);

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
    total > 80000 && setDelivery(0);
  }, [total]);

  return (
    <>
      {route ? (
        <Loader />
      ) : (
        <>
          <TopBar title={dictionary.proceed[lang]} page={true} cart={false} />
          <div className="container">
            <div className="invoice">
              <div className="invoice-title">{dictionary.invoice[lang]}</div>
              <OrderEnd proceedProducts={proceedProducts} />
              <div className="invoice-content">
                <div>
                  <span>{dictionary.total[lang]}</span>{" "}
                  <span className="price">
                    {total}
                    <span className="currency">{dictionary.LBP[lang]}</span>
                  </span>
                </div>
                <div>
                  <span>{dictionary.delivery[lang]}</span>{" "}
                  <span className="price">
                    {delivery}
                    <span className="currency">{dictionary.LBP[lang]}</span>
                  </span>
                </div>
                {discount && (
                  <div>
                    <span>{dictionary.discount[lang]}</span>{" "}
                    <span className="price">- </span>{" "}
                  </div>
                )}
                <div className="invoice-total">
                  <span>{dictionary.final[lang]}</span>
                  <span className="price">
                    {total + delivery}
                    <span className="currency">{dictionary.LBP[lang]}</span>
                  </span>
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
                <span className="label">{dictionary.payment[lang]}: </span>
                <select
                  className="select"
                  onChange={(e) => setPayment(e.target.value)}
                >
                  <option value={dictionary.receipt[lang]}>
                    {dictionary.receipt[lang]}
                  </option>
                  <option disabled value={dictionary.creditCard[lang]}>
                    {dictionary.creditCard[lang]}
                  </option>
                  <option disabled value={dictionary.online[lang]}>
                    {dictionary.online[lang]}
                  </option>
                </select>
              </div>
              <div>
                <span className="label">
                  {dictionary.credit[lang]}:{" "}
                  <span className="amount">
                    {user.amount - (toggle && total + delivery) > 0
                      ? user.amount - (toggle && total + delivery)
                      : 0}
                    <span className="currency">{dictionary.LBP[lang]}</span>
                  </span>
                </span>
                <Switch />
              </div>
              <div>
                <span className="label">
                  {dictionary.required[lang]}:
                  <span className="amount">
                    {total + delivery - (toggle && user.amount) > 0
                      ? total + delivery - (toggle && user.amount)
                      : 0}
                    <span className="currency">{dictionary.LBP[lang]}</span>
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
                        ? fire(dictionary.addAddress[lang])
                        : fire(dictionary.chooseAddress[lang]);
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
                            delivery
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
                  {dictionary.order[lang]}
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
        .invoice {
          padding: 0.8rem;
        }
        .invoice-title {
          color: ${styles.primaryColor};
        }
        .invoice-content {
          padding: 0.5rem;
          font-size: 1rem;
        }
        .invoice-content div {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
        }
        .invoice-total {
          font-size: 1.2rem;
          border-top: 1px solid ${styles.primaryColor};
          margin-top: 0.2rem;
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
        .currency {
          padding: 0.2rem;
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
      `}</style>
    </>
  );
}
