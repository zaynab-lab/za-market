import Link from "next/link";
import { useState } from "react";
import { styles } from "../public/js/styles";
import Loader from "./Loader";
import ContentLoad from "./CategoryContentLoader";

const Cover = ({ name }) => (
  <>
    <svg className="svg" viewBox="0 0 100 96" preserveAspectRatio="none">
      <use xlinkHref={`/img/svg/Categories.svg#${name}`} />
    </svg>
    <style jsx>{`
      .svg {
        fill: none;
        width: 120px;
      }
    `}</style>
  </>
);

const CataItem = ({ title, name }) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Link href={`/${name}`}>
        <div className="container" onClick={() => setLoading(true)}>
          <div className="icon">
            {name ? <Cover name={name} /> : <ContentLoad />}
          </div>
          <div className="title">{title}</div>
        </div>
      </Link>
      {loading && <Loader />}
      <style jsx>{`
        .container {
          border: 1.5px solid ${styles.primaryColor};
          margin: 0.3rem;
          padding: 0.3rem 0.5rem;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          border-radius: 0.5rem;
          -webkit-box-flex: 1;
          -ms-flex: 1 1 150px;
          flex: 1 1 150px;
        }

        .title {
          font-size: 1.2rem;
          color: ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
};
export default function CategoryItems({ categories }) {
  const skelaton = new Array(20).fill(0);
  return (
    <>
      <div className="container">
        {categories.length === 0 &&
          skelaton.map((obj, index) => <CataItem key={index} />)}
        {categories.map((obj, index) => (
          <CataItem key={index} title={obj.title} name={obj.name} />
        ))}
      </div>
      <style jsx>{`
        .container {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
        }
      `}</style>
    </>
  );
}
