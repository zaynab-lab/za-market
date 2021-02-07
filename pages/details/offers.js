import axios from "axios";
import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import TopBar from "../../components/TopBar";
import { styles } from "../../public/js/styles";
import Link from "next/link";

export default function Offers() {
  const [user, setUser] = useState(0);
  const [order, setOrder] = useState(0);
  const [code, setCode] = useState("");
  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      const { data } = res;
      if (data !== "noToken" && data !== "invalid") {
        setCode(data.promoCode);
      }
    });
  }, [setCode]);

  return (
    <>
      <TopBar title="حسومات وقسائم شرائية" page={true} />
      <div className="container">
        <div className="title">شارك الرابط وارباح</div>
        <div className="promoBox">
          في حال قمت بمشاركة الرابط وتم تسجيل الدخول من قبل المرسل إليه سوف
          تمنحه 10000 ل.ل وفي حال استعماله للتطبيق سوف تحصل على 10000 ل.ل في
          رصيدك.
          <Link
            href={"https://wa.me/?text=https://www.za-market.com/?code=" + code}
          >
            <span className="icon">
              <FaWhatsapp />
            </span>
          </Link>
          <ul>
            {user ? (
              <li>لقد قمت بمشاركة الرابط لـ {user} عضو</li>
            ) : (
              <li>لم تتم عضوية أحد قمت بمشاركة الرابط له</li>
            )}
            {!order ? (
              user ? (
                <li>لم يتم أي عملية شراء من قبل الأعضاء الذين قمت بدعوتهم</li>
              ) : (
                <></>
              )
            ) : (
              <li>تمت{order}عملية شراء من الأعضاء الذين قمت بمشاركتهم</li>
            )}
            <li>
              لقد حصلت على {order * 10000} ل.ل بمشاركاتك الرابط، وقد أضيفت إلى
              رصيدك
            </li>
          </ul>
        </div>

        <div className="title">جمع نقاط مع ليال</div>
        <div className="promoBox">
          <div>قريبا.....</div>
        </div>
      </div>

      <style jsx>{`
        .container {
          padding: 0.5rem;
          height: calc(100vh - 3rem);
          font-size: 1.1rem;
          overflow: auto;
        }
        .icon {
          background: #25d366;
          border-radius: 5rem;
          width: 1.8rem;
          height: 1.8rem;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          color: white;
          margin: 0 0.2rem;
        }
        .title {
          text-align: center;
          padding: 0.3rem;
          background: ${styles.thirdColor};
          border: 1px solid ${styles.primaryColor};
          border-raduis: 0.5rem;
        }
        .promoBox {
          padding: 0.5rem;
        }
        ul {
          padding: 1rem;
        }
        li {
          font-size: 0.9rem;
        }
      `}</style>
    </>
  );
}
