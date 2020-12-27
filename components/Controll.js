import React, { useEffect, useState } from "react";
import { atomFamily, useRecoilState } from "recoil";
import { cartListState } from "../pages/cart";
import { styles } from "../public/js/styles";

export const productQuantityState = atomFamily({
  key: "productQuantity",
  default: { id: "", quantity: 0 }
});

export default function Controll(props) {
  const [{ id, quantity }, setProductQuantity] = useRecoilState(
    productQuantityState(props.id)
  );
  const [cartList, setCartList] = useRecoilState(cartListState);
  const [count, setCount] = useState(quantity);

  const action = (add) => {
    const newCartList = cartList.filter((obj) => obj.id !== props.id);
    var a;
    add ? (a = count + 1) : (a = count - 1);
    setCount(a);
    setProductQuantity({ id, quantity: a });
    if (a > 0) {
      localStorage.setItem(
        "cartList",
        JSON.stringify([...newCartList, { id: props.id, quantity: a }])
      );
      setCartList([...newCartList, { id: props.id, quantity: a }]);
    } else {
      localStorage.setItem("cartList", JSON.stringify(newCartList));
      setCartList(newCartList);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("cartList")) {
      var items = JSON.parse(localStorage.getItem("cartList"));
      var item = items.find((obj) => obj.id === props.id);
      if (item) {
        setCount(item.quantity);
      }
    }
  }, [props.id]);
  return (
    <>
      <div className="controll">
        <div
          className={count <= 0 ? "controll-btn" : "controll-add"}
          onClick={() => action(true)}
        >
          +
        </div>

        <div className={`controll-count ${count <= 0 && "hidden"}`}>
          {count}
        </div>

        <div
          className={`controll-sub ${count <= 0 && "hidden"}`}
          onClick={() => action(false)}
        >
          -
        </div>
      </div>

      <style jsx>{`

      .controll {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        margin: .6rem 0.2rem;
        font-size: 1.5rem;
        direction: ltr; 
      }

      .controll-add,
      .controll-sub {
      width: 2rem;
      height: 2rem;
      border: 1px solid ${styles.primaryColorLight};
      border-radius: 50%;
      color: ${styles.primaryColorLight};
      line-height: 1.9rem;
      text-align: center;
      }


      .hidden {
      display: none;
      }


      .controll-btn {
      width: 8rem;
      height: 2rem;
      background: ${styles.primaryColorLight};
      border-radius: 0.2rem;
      color: white;
      text-align: center;
      }

      .controll-count {
      height: 2rem;
      padding: 0 0.3rem;
      }

      .controll-count:after {
      padding-right:.2rem;
      font-size: 0.7rem;
      content: '${props.measure}';
      }
    `}</style>
    </>
  );
}
