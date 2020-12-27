import { styles } from "../../../public/js/styles";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CategoryList({ selected, select }) {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("/api/categories")
      .then((res) => {
        const { data } = res;
        data && setCategoryList(data);
      })
      .then(() => setLoading(false));
  }, [setCategoryList]);

  return (
    <>
      {!loading && (
        <div className="categoryList-container">
          {categoryList.map((obj) => (
            <div
              className={`categoryList-content ${
                obj.name === selected && "selected"
              }`}
              onClick={() => select(obj.name)}
            >
              <div className="categoryList-content-item">{obj.title}</div>
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        .categoryList-container {
          position: sticky;
          top: 0;
          background: ${styles.primaryColorLight};
          display: flex;
          align-items: center;
          height: 3rem;
          overflow-y: hidden;
          padding: 0.2rem;
        }
        .selected {
          font-size: 1.2rem;
          color: ${styles.secondaryColor};
        }
        .categoryList-content {
          flex: 1 0 12rem;
          display: flex;
          justify-content: center;
          background: white;
          color: #lightgrey;
          padding: 0.2rem 0.8rem;
          margin: 0.2rem;
          border: 1px solid ${styles.primaryColor};
          border-radius: 10rem;
        }

        .categoryList-content-item {
          width: fit-content;
          word-wrap: unset;
          overflow-wrap: unset;
        }
      `}</style>
    </>
  );
}
