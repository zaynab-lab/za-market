import React, { useState, useEffect } from "react";
import { atom, useRecoilValue } from "recoil";
import CartCard from "../components/CartCard";
import LoadData from "../components/LoadData";
import Link from "next/link";
import TopBar from "../components/TopBar";
import { styles } from "../public/js/styles";
import axios from "axios";
import Dots from "../components/Loaders/Dots";
import SnakBar from "../components/SnakBar";
import { useRouter } from "next/router";

export const cartListState = atom({
  key: "cartList",
  default: []
});

export default function CartPage() {
  const cartList = useRecoilValue(cartListState);
  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [productList, setProductList] = useState([]);
  const [dots, setDots] = useState(false);
  const router = useRouter();
  const { msg } = router.query;
  const [snak, setSnak] = useState("");
  const fire = (message) => {
    setSnak({ message, show: true });
    setTimeout(() => setSnak(""), 3000);
  };

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      const { data } = res;
      setProductList(data);
    });
  }, [setProductList]);
  useEffect(() => {
    setCartProducts(
      productList.filter((obj) =>
        cartList.map((items) => items.id).includes(obj._id)
      )
    );
    cartList.length
      ? setTotal(
          cartList
            .map(
              (obj) =>
                productList
                  .filter((items) => items._id === obj.id)
                  .map((items) => items.price) * obj.quantity
            )
            .reduce((a, b) => a + b)
        )
      : setTotal(0);
  }, [productList, cartList]);

  useEffect(() => {
    msg && fire(msg);
    msg && router.push("/");
  }, [msg, router]);

  return (
    <>
      <TopBar title="عربة التسوق" />
      <div className="container">
        <div className="cartItems">
          {cartProducts.map((obj) => (
            <div key={obj._id}>
              <CartCard product={obj} />
            </div>
          ))}
        </div>

        <div className="total">
          <div></div>

          <div className="currency">
            الإجمالي: <span>{total}</span>
          </div>
        </div>

        {total > 0 && (
          <Link href="/proceed">
            <div
              className="proceedbtn"
              onClick={() => {
                setDots(true);
              }}
            >
              {dots ? <Dots /> : <span>تأكيد الطلب</span>}
            </div>
          </Link>
        )}
      </div>

      <SnakBar show={snak.show} message={snak.message} />

      <LoadData />
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

        .currency:after {
          content: " ل.ل";
        }

        .proceedbtn {
          background-color: ${!dots && styles.primaryColorLight};
          font-size: 1.4rem;
          width: 10rem;
          text-align: center;
          padding: 0.2rem 1rem;
          color: white;
          border-radius: 0.3rem;
          margin: 1rem auto;
          border: 1.5px solid ${dots && styles.primaryColorLight};
        }

        .total {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-pack: distribute;
          justify-content: space-around;
          background: ${styles.thirdColor};
          padding: 0.3rem;
          font-size: 1.2rem;
          border: solid ${styles.primaryColor};
          border-width: 1px 0;
        }
      `}</style>
    </>
  );
}
