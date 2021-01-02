import { useState, useEffect } from "react";
import axios from "axios";
import { styles } from "../../public/js/styles";

export default function CriditPage({ page }) {
  const [productsCount, setProductsCount] = useState();

  useEffect(() => {
    axios.get("/api/products/byCreator").then((res) => {
      const { data } = res;
      data !== "invalid" && setProductsCount(data);
    });
  }, [setProductsCount]);

  return (
    <>
      {page === "credit" && (
        <>
          {/* <div>
            <div>حسابك يعادل: </div>
            <div>قمت بإستلام: </div>
            <div className="total">باقي الإستحقاق: </div>
          </div>
          <div>تفاصيل</div> */}
          <div className="container">
            <div>
              قمت بإضافة <span className="bold">{productsCount}</span> منتج
            </div>
            <div>
              المستحقات المترتبة{" "}
              <span className="bold">{productsCount * 600} ل.ل</span>
            </div>
          </div>
        </>
      )}
      <style jsx>{`
        .container {
          padding: 1rem;
        }
        .bold {
          color: ${styles.primaryColor};
        }
      `}</style>
    </>
  );
}
