import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { useRecoilValue } from "recoil";
import { cartListState } from "../pages/cart";
import { styles } from "../public/js/styles";
import Loader from "./Loader";
import LoadData from "./LoadData";
import { FaArrowRight, FaHome, FaShoppingCart } from "react-icons/fa";

export default function TopBar({ title, page, cart, main }) {
  const cartList = useRecoilValue(cartListState);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cartList.length
      ? setQuantity(cartList.map((obj) => obj.quantity).length)
      : setQuantity(0);
  }, [cartList]);

  return (
    <>
      <div className="topBar">
        {!main ? (
          page ? (
            <div
              className="arrow"
              onClick={() => {
                setLoading(true);
                Router.back();
              }}
            >
              <FaArrowRight />
            </div>
          ) : (
            <div
              className="home"
              onClick={() => {
                setLoading(true);
                Router.push("/") || Router.back();
              }}
            >
              <FaHome />
            </div>
          )
        ) : (
          <div
            className="burger"
            onClick={() => {
              setLoading(true);
              Router.push("/menu");
            }}
          >
            |||
          </div>
        )}

        {title}

        {cart ? (
          <Link href="/cart">
            <div className="cart" onClick={() => setLoading(true)}>
              <span className="point">{quantity}</span>
              <span role="img" aria-label="cart">
                <FaShoppingCart />
              </span>
            </div>
          </Link>
        ) : (
          <div className="empty"></div>
        )}
      </div>
      {loading && <Loader />}
      <style jsx>{`
        .topBar {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          background-color: ${styles.primaryColorLight};
          color: white;
          height: 3rem;
          width: 100%;
          font-size: 1.3rem;
          padding: 0.6rem;
        }

        .burger {
          color: white;
          -webkit-transform: rotate(90deg);
          -ms-transform: rotate(90deg);
          transform: rotate(90deg);
          font-size: 1.6rem;
        }
        .arrow {
          font-size: 1.6rem;
          -webkit-transform: translateX(-0.2rem);
          -ms-transform: translateX(-0.2rem);
          transform: translateX(-0.2rem);
        }
        .home {
          font-size: 1.6rem;
          -webkit-transform: translateX(-0.5rem);
          -ms-transform: translateX(-0.5rem);
          transform: translateX(-0.5rem);
        }
        .cart {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          width: 1.8rem;
          background: white;
          border-radius: 0.2rem;
          padding: 0.2rem;
          padding-bottom: 0;
          font-size: 1.2rem;
          color: ${styles.secondaryColor};
        }

        .point {
          width: 1.4rem;
          height: 1.4rem;
          background: white;
          border: 1px solid ${styles.primaryColorLight};
          position: absolute;
          -webkit-transform: translate(1.2rem, -0.85rem);
          -ms-transform: translate(1.2rem, -0.85rem);
          transform: translate(1.2rem, -0.85rem);
          border-radius: 1rem;
          font-size: 0.9rem;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          color: ${styles.primaryColor};
        }

        .empty {
          padding: 1rem;
        }
      `}</style>
    </>
  );
}
