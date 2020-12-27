import { styles } from "../public/js/styles";

const ProductCard = ({ product }) => (
  <>
    <div className="card">
        <img
          className="card-img"
          src={`https://storage.googleapis.com/za-market/Products/${product.category}/${product._id}.png`}
          alt={product.name}
        />
      <div className="card-content">
        <div className="card-name">{product.name}</div>
        <div>
          {product.quantity} <span className="measure">{product.measure}</span>
        </div>
        <div className="price">{product.quantity * product.price}</div>
      </div>
    </div>

    <style jsx>
      {`
        .card {
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
          height: -webkit-fit-content;
          height: -moz-fit-content;
          height: fit-content;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          border: 1px solid ${styles.primaryColor};
          border-radius: 0.5rem;
          margin: 0.3rem;
          font-size: 1rem;
          text-align: center;
          -webkit-box-shadow: 0px 0px 1px 2px ${styles.thirdColor};
          box-shadow: 0px 0px 1px 2px ${styles.thirdColor};
        }

        .card-img {
          width: 5rem;
          height: 5rem;
        }

        .card-content {
          width: 100%;
        }
        .measure {
          font-size: 0.7rem;
        }

        .price:after {
          font-size: 0.7rem;
          content: " ل.ل";
        }
      `}
    </style>
  </>
);

export default function OrderEnd({ proceedProducts }) {
  return (
    <>
      <div className="orderContainer">
        {proceedProducts.map((obj, index) => (
          <ProductCard key={index} product={obj} />
        ))}
      </div>
      <style jsx>{`
        .orderContainer {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          width: 100%;
          overflow: auto;
          padding: 0.5rem 0rem;
          border: solid ${styles.primaryColor};
          border-width: 1px 0px;
          min-height: -webkit-fit-content;
          min-height: -moz-fit-content;
          min-height: fit-content;
        }
      `}</style>
    </>
  );
}
