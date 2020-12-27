import { styles } from "../../../public/js/styles";
import { FaStore, FaBan, FaEdit } from "react-icons/fa";
import { FiAlertOctagon } from "react-icons/fi";
import { useState } from "react";
import Dots from "../../Loaders/Dots";

export default function ProductCard({ product, setActionById }) {
  const [newproduct, setproduct] = useState(product);
  const [appearDots, setAppearDots] = useState(false);
  const [existDots, setExistDots] = useState(false);

  return (
    <>
      <div className="productCard">
        <div className="productCard-ImgName">
          {product.img ? (
            <img
              className="productCard-img"
              src={`https://storage.googleapis.com/za-market/Products/${newproduct.category}/${newproduct._id}.png`}
              alt=""
            />
          ) : (
            <img className="productCard-img" src="/img/png/noImg.png" alt="" />
          )}
          <div className="productCard-content">
            <div className="productCard-name">{newproduct.name}</div>
            {newproduct.brand && (
              <div className="productCard-brand">
                الماركة: {newproduct.brand}
              </div>
            )}
            <div className="productCard-brand">
              <span>{newproduct.category}</span>
              {newproduct.subCategory && <>\</>}
              <span>{newproduct.subCategory}</span>
            </div>
          </div>

          <div className="productCard-options">
            <li
              onClick={() => {
                setAppearDots(true);
                setActionById(
                  newproduct._id,
                  "appear",
                  newproduct.appear,
                  (appear) => {
                    setproduct({ ...newproduct, appear });
                    setAppearDots(false);
                  }
                );
              }}
            >
              {appearDots ? (
                <div className="clkdots">
                  <Dots />
                </div>
              ) : (
                <>{newproduct.appear ? <>&#128064;</> : <FaBan />}</>
              )}
            </li>

            <li
              onClick={() => {
                setExistDots(true);
                setActionById(
                  newproduct._id,
                  "exist",
                  newproduct.exist,
                  (exist) => {
                    setproduct({ ...newproduct, exist });
                    setExistDots(false);
                  }
                );
              }}
            >
              {existDots ? (
                <div className="clkdots">
                  <Dots />
                </div>
              ) : (
                <>{newproduct.exist ? <FaStore /> : <FiAlertOctagon />}</>
              )}
            </li>
            <li>
              <FaEdit
                onClick={() => {
                  setActionById(newproduct._id, "edit", newproduct);
                }}
              />
            </li>
          </div>
        </div>
        <div className="productCard-footer">
          {newproduct.initprice && (
            <div className="productCard-price">
              السعر الأولي: {newproduct.initprice}
            </div>
          )}

          <div className="productCard-price">
            السعر النهائي: {newproduct.price}
          </div>
        </div>
      </div>
      <style jsx>{`
        .productCard {
          display: flex;

          justify-content: space-evenly;

          height: fit-content;

          align-items: center;

          border: 1px solid ${styles.primaryColorLight};

          border-radius: 0.5rem;

          flex: 1 1 100%;

          margin: 0.3rem;

          flex-wrap: wrap;
        }

        .productCard-img {
          width: 6rem;

          height: 6rem;
        }

        .productCard-ImgName {
          display: flex;

          justify-content: space-evenly;

          align-items: center;

          width: 100%;

          padding: 0.5rem 1rem;
        }

        .productCard-price:after {
          padding-right: 0.3rem;

          content: "ل.ل";
        }

        .productCard-content {
          display: flex;

          flex-direction: column;

          justify-content: space-between;

          align-items: center;

          flex: 1 1 100%;
        }

        .productCard-name {
          font-size: 1.5rem;

          padding-bottom: 0.5rem;

          color: ${styles.secondaryColor};
        }

        .productCard-brand {
          font-size: 0.8rem;

          padding: 0.2rem;
        }

        .productCard-footer {
          display: flex;

          justify-content: space-evenly;

          align-items: center;

          color: grey;

          padding: 0.2rem 0.8rem;

          width: 100%;

          border-top: 1px solid ${styles.primaryColorLight};

          border-radius: 0rem 0rem 0.5rem 0.5rem;
        }

        .productCard-total {
          flex: 1 1 70%;

          text-align: center;

          color: ${styles.primaryColor};
        }

        .productCard-total:after {
          padding-right: 0.3rem;

          content: "ل.ل";
        }

        .productCard-options {
          display: flex;

          flex-direction: column;

          align-items: center;
        }

        li {
          font-size: 1.2rem;

          padding: 0.5rem;

          list-style: none;
        }
        .clkdots {
          width: 1.8rem;
        }
      `}</style>
    </>
  );
}
