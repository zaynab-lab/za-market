import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { cartListState } from "../pages/cart";

export default function LoadData() {
  const setCartList = useSetRecoilState(cartListState);

  useEffect(() => {
    localStorage.getItem("cartList") &&
      setCartList(JSON.parse(localStorage.getItem("cartList")));
  }, [setCartList]);

  return <></>;
}
