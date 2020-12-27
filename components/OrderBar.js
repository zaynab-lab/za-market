import { useEffect, useState } from "react";
import { styles } from "../public/js/styles";
import Link from "next/link";
import Cloud from "./Loaders/Cloud";
import axios from "axios";

export default function OrderBar() {
  const [user, setUser] = useState(false);
  const [inProgress, setInProgress] = useState(true);

  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      const { data } = res;
      if (data !== "noToken" && data !== "invalid") {
        setUser(true);
      }
    });
  }, []);

  return (
    <>
      {user && (
        <>
          {inProgress ? (
            <Link href="/details/orders">
              <div className="currentOrders">
                <div>طلبيات قيد الإنتظار</div>
                <div className="loader">
                  <Cloud />
                </div>
              </div>
            </Link>
          ) : (
            <div className="oldOrders">الطلبيات السابقة</div>
          )}
        </>
      )}

      <style jsx>{`
        .oldOrders {
          margin: 0.3rem;
          padding: 0.3rem;
          color: ${styles.secondaryColor};
          border: 1.5px solid ${styles.primaryColor};
          border-radius: 0.5rem;
          text-align: center;
          font-size: 1.2rem;
        }

        .currentOrders {
          margin: 0.3rem;
          background: white;
          color: ${styles.secondaryColor};
          border: 1.5px solid ${styles.primaryColor};
          border-radius: 0.5rem;
          text-align: center;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: space-evenly;
          -ms-flex-pack: space-evenly;
          justify-content: space-evenly;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          font-size: 1.2rem;
        }

        .loader {
          width: 3.5rem;
        }
      `}</style>
    </>
  );
}
