import Controll from "./Controll";
import { cartListState } from "../pages/cart";
import { useRecoilValue } from "recoil";
import { styles } from "../public/js/styles";

export default function CartCard({ product }) {
  const cartList = useRecoilValue(cartListState);
  const a = cartList
    .filter((items) => items.id === product._id)
    .map((obj) => obj.quantity);
  return (
    <>
      <div className="cartCard">
        <div className="cartCard-ImgName">
          {product.img ? (
            <img
              className="cartCard-img"
              src={`https://storage.googleapis.com/za-market/Products/${product.category}/${product._id}.png`}
              alt={product.name}
            />
          ) : (
            <img className="cartCard-ImgName" src="/img/png/noImg.png" alt="" />
          )}
          <div className="cartCard-content">
            <div className="cartCard-name">{product.name}</div>
            <Controll id={product._id} measure={product.measure} />
          </div>
        </div>

        <div className="cartCard-footer">
          <div className="cartCard-price">السعر: {product.price}</div>
          <div className="cartCard-total">الإجمالي: {product.price * a}</div>
        </div>
      </div>

      <style jsx>{`
        .cartCard {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: space-evenly;
          -ms-flex-pack: space-evenly;
          justify-content: space-evenly;
          height: -webkit-fit-content;
          height: -moz-fit-content;
          height: fit-content;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          border: 1px solid ${styles.primaryColorLight};
          border-radius: 0.5rem;
          -webkit-box-flex: 1;
          -ms-flex: 1 1 100%;
          flex: 1 1 100%;
          margin: 0.3rem;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
        }

        .cartCard-img {
          width: 6rem;
          height: 6rem;
        }

        .cartCard-ImgName {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: space-evenly;
          -ms-flex-pack: space-evenly;
          justify-content: space-evenly;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          width: 100%;
          padding: 0.5rem 1rem;
        }
        .cartCard-price:after {
          padding-right: 0.3rem;
          content: "ل.ل";
        }
        .cartCard-content {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-flex: 1;
          -ms-flex: 1 1 100%;
          flex: 1 1 100%;
        }
        .cartCard-name {
          font-size: 1.2rem;
          color: ${styles.secondaryColor};
        }

        .cartCard-footer {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: space-evenly;
          -ms-flex-pack: space-evenly;
          justify-content: space-evenly;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          color: lightgray;
          padding: 0.2rem 0.8rem;
          width: 100%;
          border-top: 1px solid ${styles.primaryColorLight};
          border-radius: 0rem 0rem 0.5rem 0.5rem;
        }

        .cartCard-total {
          -webkit-box-flex: 1;
          -ms-flex: 1 1 70%;
          flex: 1 1 70%;
          text-align: center;
          color: ${styles.primaryColor};
        }

        .cartCard-total:after {
          padding-right: 0.3rem;
          content: "ل.ل";
        }
      `}</style>
    </>
  );
}
